import { readFileSync, readdirSync } from 'fs';
import { resolve } from 'path';

export function read(basePath: string, file: string): string {
  return readFileSync(resolve(basePath, file), 'utf8');
}

export function readAllFromFolder(folderPath: string): string[] {
  return readdirSync(resolve(folderPath)).map(filename => read(folderPath, filename));
}
