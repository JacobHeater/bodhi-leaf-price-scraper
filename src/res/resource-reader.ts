import fs from "fs-extra";
import { join } from "path";

const BASE_DIR = __dirname;

export class ResourceReader {
  static async readAsciiAsync(): Promise<string> {
    return (await fs.readFile(resourcePath("ascii.txt"))).toString();
  }

  static async readSearchAsciiAsync(): Promise<string> {
    return (await fs.readFile(resourcePath("search-ascii.txt"))).toString();
  }
}

function resourcePath(name: string): string {
  return join(BASE_DIR, name);
}
