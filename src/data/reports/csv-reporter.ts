import { parse } from 'json2csv';

import { IArrayReporter } from "./ireporter";

export class CSVReporter<T> implements IArrayReporter<T> {
  generateReport(products: T[]): string {
    return parse(products);
  }
}
