import { IExecute } from "../iexecute";
import { IInteractiveStep } from "./iinteractive-step";

export interface IStep extends IExecute, IInteractiveStep {
    supportsInteractive: boolean;
}
