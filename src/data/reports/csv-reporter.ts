import { IArrayReporter } from "./ireporter";
import { parse } from 'json2csv';

export class CSVReporter<T> implements IArrayReporter<T> {
  generateReport(products: T[]): string {
    return parse(products);
  }
}
