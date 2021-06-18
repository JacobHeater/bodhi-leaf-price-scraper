import { ISupportTableOutput } from "../../models/isupport-table-output";
import { IArrayReporter } from "./ireporter";

export class TableReporter<T extends ISupportTableOutput> implements IArrayReporter<T> {
  constructor(private headerRow: string[]) {

  }
  
  generateReport(items: T[]): string {
    return this.generateHeaderRow().concat(
      items.map((p) => p.toTableRow()).join("\n")
    );
  }

  private generateHeaderRow(): string {
    return this.headerRow
      .join(" | ")
      .concat("\n========================================\n");
  }
}
