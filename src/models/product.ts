import { ISupportPlainTextOutput } from "./isupport-plain-text-output";
import { ISupportTableOutput } from "./isupport-table-output";

export class Product implements ISupportTableOutput, ISupportPlainTextOutput {
  id: string = "";
  title: string = "";
  price: number = 0;
  rating: number = 0;

  static get headerRow(): string[] {
    return ["Title", "Price", "Rating", "Id"];
  }

  toTableRow(): string {
    return `${this.title} | $${this.price} | ${this.rating} stars | ${this.id}`;
  }

  toPlainText(ignoreKeys: string[] = []): string {
    const lines: string[] = [
      `Id: ${this.id}`,
      "\n",
      `${"-".repeat(this.id.length + "Id: ".length)}`,
      "\n".repeat(2),
      this.title,
    ];

    if (!ignoreKeys.includes("price")) lines.push(`\n$${this.price}`);
    if (!ignoreKeys.includes("rating")) lines.push(`\n${this.rating} stars`);
    
    lines.push("\n");

    return lines.join("");
  }
}
