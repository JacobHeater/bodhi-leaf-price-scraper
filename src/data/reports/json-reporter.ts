import { IReporter } from "./ireporter";

export class JsonReporter<T> implements IReporter<T> {
  constructor(private pretty: boolean = false) {}
  generateReport(item: T): string {
    if (this.pretty) {
      return JSON.stringify(item, null, 2);
    }

    return JSON.stringify(item);
  }
}
