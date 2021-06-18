import {
  REPORT_FORMATS,
  REPORT_FORMAT_CSV,
  REPORT_FORMAT_JSON,
  REPORT_FORMAT_TABLE,
} from "../../data/reports/report-options";
import { StepBase } from "../step-base";
import readline from "readline-sync";
import { TableReporter } from "../../data/reports/table-reporter";
import { JsonReporter } from "../../data/reports/json-reporter";
import { CSVReporter } from "../../data/reports/csv-reporter";
import { Logger } from "../../logging/logger";
import { App } from "../../product-scrape.app";
import { Product } from "../../models/product";

export class GenerateReportStep extends StepBase<App> {
  async executeAsync(): Promise<void> {
    const reportSelection = this.app.argv.format;
    this.generateReportForReportSelection(reportSelection);
  }
  executeInteractive(): void {
    const reportSelectionIndex = readline.keyInSelect(
      REPORT_FORMATS,
      "How do you want the report to be formatted?"
    );
    const reportSelection = REPORT_FORMATS[reportSelectionIndex];

    if (reportSelectionIndex === -1) {
      Logger.warn("Cancelling...");
      process.exit(0);
    }

    this.generateReportForReportSelection(reportSelection);
  }

  private generateReportForReportSelection(reportSelection: string) {
    let generatedReport = "";

    switch (reportSelection) {
      case REPORT_FORMAT_TABLE:
        generatedReport = new TableReporter(Product.headerRow).generateReport(
          this.app.products
        );
        break;
      case REPORT_FORMAT_CSV:
        generatedReport = new CSVReporter().generateReport(
          this.app.products
        );
        break;
      case REPORT_FORMAT_JSON:
      default:
        generatedReport = new JsonReporter(
          this.app.argv.pretty
        ).generateReport(this.app.products);
        break;
    }

    Logger.info(generatedReport);
  }
}
