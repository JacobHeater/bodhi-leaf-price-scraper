import { IApp } from "./iapp";
import { IStep } from "./steps/istep";

export abstract class AppBase implements IApp {
  protected stepQueue: IStep[] = [];
  abstract executeAsync(): Promise<void>;
  protected async runStepsAsync(isInteractive: boolean = false): Promise<void> {
    for (const step of this.stepQueue) {
      if (isInteractive && step.supportsInteractive) {
        step.executeInteractive();
      } else {
        await step.executeAsync();
      }
    }
  }
}
