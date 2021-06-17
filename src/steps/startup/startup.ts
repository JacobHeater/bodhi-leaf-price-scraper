import { StepBase } from "../step-base";
import { version } from '../../../package.json';
import { Logger } from "../../logging/logger";

export class StartupStep extends StepBase {
  supportsInteractive = false;

  async executeAsync(): Promise<void> {
    await Logger.logAsciiAsync();
    Logger.info(version);
  }

  executeInteractive(): void {
    throw new Error("Method not implemented.");
  }
}
