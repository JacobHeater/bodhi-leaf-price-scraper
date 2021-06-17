import { Product } from "../../models/product";
import { IProductReporter } from "./iproduct-reporter";

export class TableProductReporter implements IProductReporter {
  generateReport(products: Product[]): string {
    return this.generateHeaderRow().concat(
      products.map((p) => p.toTableRow()).join("\n")
    );
  }

  private generateHeaderRow(): string {
    return "Title | Price | Rating".concat("\n----------------------------\n");
  }
}
