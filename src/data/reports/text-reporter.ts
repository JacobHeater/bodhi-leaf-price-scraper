import { ISupportPlainTextOutput } from "../../models/isupport-plain-text-output";
import { IReporter } from "./ireporter";

export class TextReporter<T extends ISupportPlainTextOutput>
  implements IReporter<T>
{
  generateReport(item: T, ignoreKeys: string[] = []): string {
    return item.toPlainText(ignoreKeys);
  }
}
