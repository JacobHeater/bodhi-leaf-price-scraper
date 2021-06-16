import { JsonProductReporter } from "../../data/json-product-reporter";
import { TableProductReporter } from "../../data/table-product-reporter";
import { Logger } from "../../logger";
import { REPORT_OPTIONS } from "../../report-options";
import { StepBase } from "../step-base";
import readline from "readline-sync";

export class GenerateReportStep extends StepBase {
  async executeAsync(): Promise<void> {
    const reportSelection = this.app.argv.format;
    this.generateReportForReportSelection(reportSelection);
  }
  executeInteractive(): void {
    const reportSelectionIndex = readline.keyInSelect(
      REPORT_OPTIONS,
      "How do you want the report to be formatted?"
    );
    const reportSelection = REPORT_OPTIONS[reportSelectionIndex];

    if (reportSelectionIndex === -1) {
      Logger.warn("Cancelling...");
      process.exit(0);
    }

    this.generateReportForReportSelection(reportSelection);
  }

  private generateReportForReportSelection(reportSelection: string) {
    let generatedReport = "";

    switch (reportSelection) {
      case "Table Format":
        generatedReport = new TableProductReporter().generateReport(
          this.app.products
        );
        break;
      default:
        generatedReport = new JsonProductReporter().generateReport(
          this.app.products
        );
        break;
    }

    Logger.info(generatedReport);
  }
}
