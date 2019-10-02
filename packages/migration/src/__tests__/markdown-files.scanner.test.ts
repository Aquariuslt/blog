import * as path from 'path';
import { scan } from '../markdown-files.scanner';

describe('markdown files scanner', () => {
  it('# should scan all markdown file under __fixtures__ dir', () => {
    const BASE_DIR = path.join(__dirname, `__fixtures__`);

    const markdownFileList = scan(BASE_DIR);

    expect(markdownFileList).toHaveLength(2);
  });
});
