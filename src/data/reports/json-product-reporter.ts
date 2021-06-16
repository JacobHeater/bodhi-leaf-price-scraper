import { Product } from "../../models/product";
import { IProductReporter } from "./iproduct-reporter";

export class JsonProductReporter implements IProductReporter {
  constructor(private pretty: boolean = false) {}
  generateReport(products: Product[]): string {
    if (this.pretty) {
      return JSON.stringify(products, null, 2);
    }

    return JSON.stringify(products);
  }
}
