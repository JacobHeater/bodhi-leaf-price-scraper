import { ISupportPlainTextOutput } from "./isupport-plain-text-output";
import { ISupportTableOutput } from "./isupport-table-output";

export class Product implements ISupportTableOutput, ISupportPlainTextOutput {
  id: string = "";
  title: string = "";
  price: number = 0;
  rating: number = 0;

  static get headerRow(): string[] {
    return ['Title', 'Price', 'Rating', 'Id'];
  }

  toTableRow(): string {
    return `${this.title} | $${this.price} | ${this.rating} stars | ${this.id}`;
  }

  toPlainText(): string {
    return (
`
Id: ${this.id}
${'-'.repeat(this.id.length + 'Id: '.length)}

${this.title}
$${this.price}
${this.rating} stars
`
    );
  }
}
