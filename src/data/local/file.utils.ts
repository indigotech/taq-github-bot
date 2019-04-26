import { readdirSync, readFileSync, statSync } from 'fs';
import { resolve } from 'path';

export function readFile(basePath: string, file: string): string {
  const filePath = resolve(basePath, file);
  if (statSync(filePath).isDirectory()) {
    throw Error(filePath + ' is a directory!');
  }
  const fileContent = readFileSync(filePath, 'utf8');
  return fileContent;
}

export function readAllFiles(folderPath: string): string[] {
  return readdirSync(resolve(folderPath)).map(filename => readFile(folderPath, filename));
}

export function readFolder(folderPath: string) {
  return readdirSync(resolve(folderPath));
}
