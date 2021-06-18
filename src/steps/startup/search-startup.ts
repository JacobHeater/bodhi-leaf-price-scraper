import { StepBase } from "../step-base";
import { version } from "../../../package.json";
import { Logger } from "../../logging/logger";
import { App } from "../../search-by-id.app";

export class StartupStep extends StepBase<App> {
  supportsInteractive = false;

  async executeAsync(): Promise<void> {
    if (this.app.argv.noHeader) return;

    await Logger.logSearchAsciiAsync();
    Logger.info(version);
  }

  executeInteractive(): void {
    throw new Error("Method not implemented.");
  }
}
