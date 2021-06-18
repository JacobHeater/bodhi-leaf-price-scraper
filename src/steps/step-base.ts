import { IApp } from "../iapp";
import { IStep } from "./istep";

export abstract class StepBase<TApp extends IApp> implements IStep {
  constructor(protected app: TApp) {}
  abstract executeAsync(): Promise<void>;
  abstract executeInteractive(): void;
  supportsInteractive: boolean = true;
}
