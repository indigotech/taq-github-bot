import { readdirSync, readFileSync } from 'fs';
import { resolve } from 'path';

export function read<T = string>(basePath: string, file: string): T {
  const fileContent = readFileSync(resolve(basePath, file), 'utf8');
  return JSON.parse(fileContent) as T;
}

export function readAllFromFolder<T>(folderPath: string): T[] {
  return readdirSync(resolve(folderPath)).map(filename => read<T>(folderPath, filename));
}
