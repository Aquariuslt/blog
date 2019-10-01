import * as fs from 'fs';
import * as path from 'path';

const MARKDOWN_FIXTURES_DIR = path.join(__dirname, '__fixtures__');

/**
 * @description a helper function to read markdown file content under `__fixtures__` folder
 * */
export const read = (filename: string) =>
  fs.readFileSync(path.resolve(MARKDOWN_FIXTURES_DIR, filename), {
    encoding: 'utf-8'
  });
