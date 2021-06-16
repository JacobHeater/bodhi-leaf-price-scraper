import { StepBase } from "../step-base";
import readline from "readline-sync";
import { Logger } from "../../logger";
import { SORT_OPTIONS } from "../../sort-options";
import { sortAscending, sortDescending } from "../../data/sort";
import { Product } from "../../models/product";

export class SortProductsStep extends StepBase {
  async executeAsync(...args: any[]): Promise<void> {
    const sortSelection = this.app.argv.sort;
    this.sortProductsBasedOnInput(sortSelection);
  }

  executeInteractive(): void {
    const sortSelectionIndex = readline.keyInSelect(
      SORT_OPTIONS,
      `How do you want to sort the results?`
    );
    const sortSelection = SORT_OPTIONS[sortSelectionIndex];

    if (sortSelectionIndex === -1) {
      Logger.warn("Cancelling...");
      process.exit(0);
    }

    this.sortProductsBasedOnInput(sortSelection);
  }

  private sortProductsBasedOnInput(sortSelection: string) {
    const [key, sortDir] = sortSelection.split(" ");
    const sortFn = sortDir === "ASC" ? sortAscending : sortDescending;
    const sortedProducts = sortFn(this.app.products, key as keyof Product);
    this.app.products = sortedProducts;
  }
}
