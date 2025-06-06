import axios, { AxiosResponse } from "axios";
import htmlToText from "html-to-text";
import { JSDOM } from "jsdom";

import { createTimestamps } from '../debug/timestamps';
import { Base64 } from "../encoding/base64";
import { Logger } from "../logging/logger";
import { Product } from "../models/product";
import { ProductDetails } from "../models/product-details";
import { DescriptionMetadataDefinition } from "../models/product-details-metadata-definitions";


const BASE_URL = "https://www.bodhileafcoffee.com/";

export class ProductController {
  @createTimestamps('Find coffees from Bodhi')
  async findCoffeesFromBodhiAsync(): Promise<Product[]> {
    return this.findAllProductsAsync();
  }

  async findCoffeeFromBodhiByIdAsync(id: string): Promise<ProductDetails> {
    return this.findProductByIdAsync(id);
  }

  private getDescription(elem: Element): string {
    let hasFoundDescription: boolean = false;
    const metadata = elem.innerHTML?.trim();
    const metadataLines = htmlToText.convert(metadata).split("\n");
    const descOutput: string[] = [];

    const descriptionMetadataDef = new DescriptionMetadataDefinition();

    for (const line of metadataLines) {
      if (descriptionMetadataDef.isMatch(line) || hasFoundDescription) {
        hasFoundDescription = true;
        descOutput.push(line);
      }
    }

    return descOutput.join("\n");
  }

  private getMetadata(elem: Element): string {
    const metadata = elem.innerHTML?.trim();
    const metadataLines = htmlToText.convert(metadata).split("\n");
    const metadataOutput: string[] = [];
    const descriptionMetadataDef = new DescriptionMetadataDefinition();

    for (const line of metadataLines) {
      if (!descriptionMetadataDef.isMatch(line)) {
        metadataOutput.push(line);
      } else {
        break;
      }
    }

    return metadataOutput.join("\n");
  }

  private async findProductByIdAsync(id: string): Promise<ProductDetails> {
    const url = BASE_URL + Base64.decode(id);
    let response: AxiosResponse<any>;
    try {
      response = await axios.get(url);
    } catch (e) {
      if ((e as Error).message.includes("404")) {
        Logger.error("Coffee not found. Exiting with non-zero status code.");

        process.exit(1);
      } else {
        throw e;
      }
    }
    const document = new JSDOM(response.data as string).window.document;

    const descriptionContainer = document.querySelector(".description");
    const description = this.getDescription(descriptionContainer!);
    const metadata = this.getMetadata(descriptionContainer!);
    
    const price = parseFloat(
      document
        .querySelector(".current_price")
        ?.textContent?.replace("$", "")
        .trim() as string
    );
    const rating = parseFloat(
      document
        .querySelector(".jdgm-prev-badge__stars")
        ?.getAttribute("data-score") as string
    );
    const title = document
      .querySelector(".product_name")
      ?.textContent?.trim() as string;

    return Object.assign<ProductDetails, Partial<ProductDetails>>(
      new ProductDetails(),
      {
        product: Object.assign<Product, Partial<Product>>(new Product(), {
          id,
          price,
          rating,
          title,
        }),
        description,
        metadata,
      }
    );
  }

  private async findAllProductsAsync(
    page: number = 1,
    items: Product[] = []
  ): Promise<Product[]> {
    const response = await axios.get(
      `https://www.bodhileafcoffee.com/collections/green-coffee?page=${page}`
    );
    const document = new JSDOM(response.data as string).window.document;
    const products = document.querySelectorAll(".product-details");

    products.forEach((product) => {
      if (product.querySelector(".sold_out")) return;

      const productWrapper = product.parentNode?.parentNode;
      const title = product.querySelector(".title")?.textContent?.trim();
      const price = parseFloat(
        product
          .querySelector(".price")
          ?.textContent?.replace(/[^\d]+/, "")
          .trim() as string
      );
      const id = Base64.encode(
        productWrapper
          ?.querySelector(".hidden-product-link")
          ?.getAttribute("href")
          ?.trim() as string
      );
      const rating = parseFloat(
        product
          .querySelector(".jdgm-prev-badge__stars")
          ?.getAttribute("data-score") as string
      );

      items.push(
        Object.assign(new Product(), {
          id,
          title,
          price,
          rating,
        })
      );
    });

    if (products.length > 0) {
      await this.findAllProductsAsync(page + 1, items);
    }

    return items;
  }
}
