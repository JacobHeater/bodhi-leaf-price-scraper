import { ProductController } from "../../controllers/product-controller";
import { Logger } from "../../logging/logger";
import { App } from "../../product-scrape.app";
import { StepBase } from "../step-base";

export class RetrieveProductsStep extends StepBase<App> {
  supportsInteractive = false;
  
  async executeAsync(): Promise<void> {
    Logger.info("Searching Bodhi Leaf for Green Coffee Products...");
    const productController = new ProductController();
    const products = await productController.findCoffeesFromBodhiAsync();
    Logger.info(`Found ${products.length} green coffees from Bodhi Leaf.`);

    this.app.products.length = 0;
    this.app.products.push(...products);
  }
  
  executeInteractive(): void {
    throw new Error("Method not implemented.");
  }
}
