import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { version } from "../package.json";
import { AppBase } from "./app-base";
import {
  REPORT_FORMATS,
  REPORT_FORMAT_TABLE,
} from "./data/reports/report-options";
import { DIR_ASCENDING, KEY_PRICE, SORT_OPTIONS } from "./data/sort-options";
import { Product } from "./models/product";
import { GenerateReportStep } from "./steps/products/generate-report";
import { RetrieveProductsStep } from "./steps/products/retrieve-products";
import { SortProductsStep } from "./steps/products/sort-products";
import { StartupStep } from "./steps/startup/startup";

const argv = yargs(hideBin(process.argv))
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
  .option("noHeader", {
    type: "boolean",
    default: false,
    describe: "Do you want to omit the header from stdout?",
  })
  .parseSync();

export class App extends AppBase {
  stepQueue = [
    new StartupStep(this),
    new RetrieveProductsStep(this),
    new SortProductsStep(this),
    new GenerateReportStep(this),
  ];

  products: Product[] = [];
  readonly argv = argv;

  async executeAsync(): Promise<void> {
    await this.runStepsAsync(this.argv.interactive);
  }
}
