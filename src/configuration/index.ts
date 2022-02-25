import fs from 'fs-extra';
import glob from 'glob';
import { join } from 'path';
import { cwd } from 'process';

export class Configuration {
  debug = {
    logTimestamps: false
  }
}

export const config = Object.assign(new Configuration(), readConfigAsConfiguration());

function readConfigAsConfiguration(): Configuration {
  const globPath = glob.sync(join(cwd(), '**', 'bodhi-config.json'));

  if (!globPath.length) {
    return new Configuration();
  }

  const jsonContents = fs.readFileSync(globPath[0]).toString();

  return JSON.parse(jsonContents) as Configuration;
}
