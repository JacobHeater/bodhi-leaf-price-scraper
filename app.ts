import yargs from "yargs";
import { IExecute } from "./iexecute";
import { Product } from "./models/product";
import { REPORT_OPTIONS } from "./report-options";
import { SORT_OPTIONS } from "./sort-options";
import { IStep } from "./steps/istep";
import { GenerateReportStep } from "./steps/products/generate-report";
import { RetrieveProductsStep } from "./steps/products/retrieve-products";
import { SortProductsStep } from "./steps/products/sort-products";
import { StartupStep } from "./steps/startup/startup";

const argv = yargs
  .option("sort", {
    default: "price ASC",
    choices: SORT_OPTIONS,
    describe: "How to sort the product results.",
  })
  .option("format", {
    default: "Table Format",
    choices: REPORT_OPTIONS,
    describe: "How to present the report results.",
  })
  .option("interactive", {
    default: false,
    describe: "Run the app in interactive mode?",
  })
  .parseSync();

export class App implements IExecute {
  private _stepQueue: IStep[] = [
      new StartupStep(this),
      new RetrieveProductsStep(this),
      new SortProductsStep(this),
      new GenerateReportStep(this),
  ];

  products: Product[] = [];
  readonly argv = argv;

  async executeAsync(): Promise<void> {
      for (const step of this._stepQueue) {
        if (argv.interactive) {
            step.executeInteractive();
        } else {
            await step.executeAsync();
        }
      }
  }
}
