import { ISupportPlainTextOutput } from "./isupport-plain-text-output";
import { Product } from "./product";

export class ProductDetails implements ISupportPlainTextOutput {
  product: Product = new Product();
  description: string = "";
  metadata: string = "";

  toPlainText(): string {
    return (
`
${this.product.toPlainText()}

${this.metadata}

${this.description}
`);
  }
}
