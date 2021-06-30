import { ISupportPlainTextOutput } from "./isupport-plain-text-output";
import { Product } from "./product";

export class ProductDetails implements ISupportPlainTextOutput {
  product: Product = new Product();
  description: string = "";
  metadata: string = "";

  toPlainText(ignoreKeys: string[] = []): string {
    return (
`
${this.product.toPlainText(ignoreKeys)}

${this.metadata}

${this.description}
`);
  }
}
