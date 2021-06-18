import yargs from "yargs";
import { AppBase } from "./app-base";
import {
  REPORT_FORMATS_DETAILS,
  REPORT_FORMAT_TEXT,
} from "./data/reports/report-options";
import { ProductDetails } from "./models/product-details";
import { GenerateReportStep } from "./steps/product-details/generate-report";
import { RetrieveProductDetailsStep } from "./steps/product-details/retrieve-product-details";
import { StartupStep } from "./steps/startup/search-startup";

const argv = yargs
  .option("id", {
    demandOption: true,
    type: "string",
    describe: "The id of the coffee product to get details for.",
  })
  .option("format", {
    type: "string",
    alias: "f",
    default: REPORT_FORMAT_TEXT,
    describe: "The format the report should be generated in.",
    choices: REPORT_FORMATS_DETAILS,
  })
  .option("pretty", {
    alias: "p",
    type: "boolean",
    describe: "Do you want to pretty print the JSON?",
    default: false,
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
    new RetrieveProductDetailsStep(this),
    new GenerateReportStep(this),
  ];
  argv = argv;
  productDetails: ProductDetails = new ProductDetails();

  async executeAsync(): Promise<void> {
    await this.runStepsAsync();
  }
}
