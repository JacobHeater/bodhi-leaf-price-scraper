import { version } from '../../../package.json';
import { Logger } from "../../logging/logger";
import { App } from "../../product-scrape.app";
import { StepBase } from "../step-base";

export class StartupStep extends StepBase<App> {
  supportsInteractive = false;

  async executeAsync(): Promise<void> {
    if (this.app.argv.noHeader) return;

    await Logger.logAsciiAsync();
    Logger.info(version);
  }

  executeInteractive(): void {
    throw new Error("Method not implemented.");
  }
}
