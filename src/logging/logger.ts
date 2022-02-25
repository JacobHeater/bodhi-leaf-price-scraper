import chalk from "chalk";

import { ResourceReader } from "../res/resource-reader";

export class Logger {
  static info(...args: any[]): Logger {
    console.log(chalk.white(...args));

    return this;
  }

  static warn(...args: any[]): Logger {
    console.warn(chalk.yellow(...args));

    return this;
  }

  static error(...args: any[]): Logger {
    console.error(chalk.red(...args));

    return this;
  }

  static async logAsciiAsync(): Promise<Logger> {
    this.info(await ResourceReader.readAsciiAsync());

    return this;
  }

  static async logSearchAsciiAsync(): Promise<Logger> {
    this.info(await ResourceReader.readSearchAsciiAsync());

    return this;
  }
}
