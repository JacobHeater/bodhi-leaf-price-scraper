import { StepBase } from "../step-base";
import { App } from "../../search-by-id.app";
import { ProductController } from "../../controllers/product-controller";
import { Logger } from "../../logging/logger";

export class RetrieveProductDetailsStep extends StepBase<App> {
  supportsInteractive = false;

  async executeAsync(): Promise<void> {
    const id = this.app.argv.id;
    const controller = new ProductController();
    Logger.info(`Searching Bodhi Leaf for product with id: ${id}.`);
    const details = await controller.findCoffeeFromBodhiByIdAsync(id);
    Logger.info(`Product ${id} was found!`);

    this.app.productDetails = details;
  }

  executeInteractive(): void {
    throw new Error("Method not implemented.");
  }
}
