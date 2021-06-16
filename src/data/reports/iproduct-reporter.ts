import { Product } from "../../models/product";

export interface IProductReporter {
    generateReport(products: Product[]): string;
}
