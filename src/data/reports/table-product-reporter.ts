import { Product } from "../../models/product";
import { IProductReporter } from "./iproduct-reporter";

export class TableProductReporter implements IProductReporter {
  generateReport(products: Product[]): string {
    let generatedReport = "Title | Price | Rating"
      .concat("\n---------------------------")
      .concat(
        products.reduce(
          (c, n) => `${c}\n${n.title} | $${n.price} | ${n.rating} stars`,
          ""
        )
      );

    return generatedReport;
  }
}
