import { Logger } from "../../logger";
import { StepBase } from "../step-base";

export class StartupStep extends StepBase {
  supportsInteractive = false;

  async executeAsync(): Promise<void> {
    await Logger.logAsciiAsync();
  }

  executeInteractive(): void {
    throw new Error("Method not implemented.");
  }
}
