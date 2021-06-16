import { Product } from "../models/product";
import { IProductReporter } from "./iproduct-reporter";

export class JsonProductReporter implements IProductReporter {
  generateReport(products: Product[]): string {
    return JSON.stringify(products);
  }
}
