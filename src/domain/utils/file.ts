import { readdirSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { fromJson } from '@domain/utils/json';

export function read(basePath: string, file: string): string {
  return readFileSync(resolve(basePath, file), 'utf8');
}

export function readAllFromFolder(folderPath: string): string[] {
  return readdirSync(resolve(folderPath)).map(filename => read(folderPath, filename));
}

export function readJson<T>(basePath: string, file: string): T {
  const fileContent = read(basePath, file);
  return fromJson<T>(fileContent);
}
