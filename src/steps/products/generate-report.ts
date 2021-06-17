import { Logger } from "../../logger";
import { REPORT_FORMATS, REPORT_FORMAT_JSON, REPORT_FORMAT_TABLE } from "../../report-options";
import { StepBase } from "../step-base";
import readline from "readline-sync";
import { TableProductReporter } from "../../data/reports/table-product-reporter";
import { JsonProductReporter } from "../../data/reports/json-product-reporter";

export class GenerateReportStep extends StepBase {
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
        generatedReport = new TableProductReporter().generateReport(
          this.app.products
        );
        break;
      case REPORT_FORMAT_JSON:
      default:
        generatedReport = new JsonProductReporter(this.app.argv.pretty).generateReport(
          this.app.products
        );
        break;
    }

    Logger.info(generatedReport);
  }
}
