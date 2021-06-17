export class Product {
  title: string = "";
  price: number = 0;
  rating: number = 0;

  toJSON() {
    return {
      title: this.title,
      price: `$${this.price}`,
      rating: `${this.rating} stars`,
    };
  }

  toTableRow(): string {
    return `${this.title} | $${this.price} | ${this.rating} stars`;
  }
}
