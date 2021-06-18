import { ISupportPlainTextOutput } from "../../models/isupport-plain-text-output";
import { IReporter } from "./ireporter";

export class TextReporter<T extends ISupportPlainTextOutput>
  implements IReporter<T>
{
  generateReport(item: T): string {
    return item.toPlainText();
  }
}
