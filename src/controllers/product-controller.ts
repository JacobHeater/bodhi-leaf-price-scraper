import axios from "axios";
import { JSDOM } from "jsdom";
import { Product } from "../models/product";

export class ProductController {
  async findCoffeesFromBodhiAsync(): Promise<Product[]> {
    return this.findAllProductsAsync();
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

      const title = product.querySelector(".title")?.textContent?.trim();
      const price = parseFloat(
        product
          .querySelector(".price")
          ?.textContent?.replace(/[^\d]+/, "")
          .trim() as string
      );

      const rating = parseFloat(
        product
          .querySelector(".jdgm-prev-badge__stars")
          ?.getAttribute("data-score") as string
      );

      items.push(
        Object.assign(new Product(), {
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
