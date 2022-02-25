// source: https://leefreeman.xyz/2020/05/08/typescript-decorators/

import { config } from '../configuration';
import { Logger } from '../logging/logger';

/**
 * Logs a timestamp to the console indicating the
 * total elapsed time the function took to run.
 * 
 * @param message The message for the function that is being traced.
 * @returns 
 */
export function createTimestamps(message: string) {
  return function (_target: any, _name: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function () {
      const startTime = new Date(Date.now());
      logTimestampInfo(
        `${message} started at: ${startTime.toLocaleString("en-GB")}`
      );
      const outVal = await method.apply(this);
      const endTime = new Date(Date.now());
      logTimestampInfo(
        `${message} completed at: ${endTime.toLocaleString("en-GB")}`
      );
      logTimestampInfo(
        `${message} took ${
          endTime.getTime() - startTime.getTime()
        }ms to complete.`
      );

      return outVal;
    };
  };
}

function logTimestampInfo(...args: any[]): void {
  if(config.debug.logTimestamps) {
    Logger.info(...args);
  }
}
