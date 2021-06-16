import { App } from "../app";
import { IStep } from "./istep";

export abstract class StepBase implements IStep {
  constructor(protected app: App) {}
  abstract executeAsync(): Promise<void>;
  abstract executeInteractive(): void;
  supportsInteractive: boolean = true;
}
