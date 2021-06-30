import { CSVReporter } from "../../data/reports/csv-reporter";
import { JsonReporter } from "../../data/reports/json-reporter";
import {
  REPORT_FORMAT_TABLE,
  REPORT_FORMAT_CSV,
  REPORT_FORMAT_JSON,
  REPORT_FORMAT_TEXT,
} from "../../data/reports/report-options";
import { TableReporter } from "../../data/reports/table-reporter";
import { TextReporter } from "../../data/reports/text-reporter";
import { Logger } from "../../logging/logger";
import { App } from "../../search-by-id.app";
import { StepBase } from "../step-base";

export class GenerateReportStep extends StepBase<App> {
  supportsInteractive = false;

  async executeAsync(): Promise<void> {
    this.generateReportForReportSelection(this.app.argv.format);
  }

  executeInteractive(): void {
    throw new Error("Method not implemented.");
  }

  private generateReportForReportSelection(reportSelection: string) {
    let generatedReport = "";

    switch (reportSelection) {
      case REPORT_FORMAT_TEXT:
          generatedReport = new TextReporter().generateReport(this.app.productDetails, this.app.buildIgnoreKeys());
        break;
      case REPORT_FORMAT_JSON:
      default:
        generatedReport = new JsonReporter(this.app.argv.pretty).generateReport(
          this.app.productDetails
        );
        break;
    }

    Logger.info(generatedReport);
  }
}
