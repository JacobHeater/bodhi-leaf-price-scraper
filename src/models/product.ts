export class Product {
  title: string = "";
  price: number = 0;
  rating: number = 0;

  toTableRow(): string {
    return `${this.title} | $${this.price} | ${this.rating} stars`;
  }
}
