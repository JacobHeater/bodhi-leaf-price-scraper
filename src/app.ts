import yargs from "yargs";
import { IExecute } from "./steps/iexecute";
import { Product } from "./models/product";
import { REPORT_FORMATS, REPORT_FORMAT_TABLE } from "./data/reports/report-options";
import { DIR_ASCENDING, KEY_PRICE, SORT_OPTIONS } from "./data/sort-options";
import { IStep } from "./steps/istep";
import { GenerateReportStep } from "./steps/products/generate-report";
import { RetrieveProductsStep } from "./steps/products/retrieve-products";
import { SortProductsStep } from "./steps/products/sort-products";
import { StartupStep } from "./steps/startup/startup";
import { version } from "../package.json";

const argv = yargs
  .version(`Bodhi Leaf Coffee Traders Price Scraper v${version}`)
  .option("sort", {
    alias: "s",
    type: "string",
    default: `${KEY_PRICE} ${DIR_ASCENDING}`,
    choices: SORT_OPTIONS,
    describe: "How to sort the product results.",
  })
  .option("format", {
    alias: "f",
    type: "string",
    default: REPORT_FORMAT_TABLE,
    choices: REPORT_FORMATS,
    describe: "How to present the report results.",
  })
  .option("pretty", {
    alias: "p",
    default: false,
    type: "boolean",
    describe: "Print JSON in pretty print format?",
  })
  .option("interactive", {
    alias: "i",
    default: false,
    describe: "Run the app in interactive mode?",
    type: "boolean",
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
      if (argv.interactive && step.supportsInteractive) {
        step.executeInteractive();
      } else {
        await step.executeAsync();
      }
    }
  }
}
