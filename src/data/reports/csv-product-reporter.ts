import { Product } from "../../models/product";
import { IProductReporter } from "./iproduct-reporter";
import { parse } from 'json2csv';

export class CSVProductReporter implements IProductReporter {
  generateReport(products: Product[]): string {
    return parse(products);
  }
}
