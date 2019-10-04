import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as rimraf from 'rimraf';
import { isImageHosting, lookupImagesInMarkdownFile, lookupMarkdownFiles } from '../lookup.util';
import { copyImagesInMarkdown } from '../asset.util';

describe('asset util', () => {
  const TEST_DIST_DIR = path.join(__dirname, '__dist__');
  const MARKDOWN_DIR = path.join(__dirname, '__fixtures__');

  beforeEach(() => {
    rimraf.sync(TEST_DIST_DIR);
    mkdirp.sync(TEST_DIST_DIR);
  });

  it('# should copy files from `__fixtures__` to `__dist__` ', () => {
    const markdownFiles = lookupMarkdownFiles(MARKDOWN_DIR);

    markdownFiles.forEach((markdownFile) => {
      const relativeImages = lookupImagesInMarkdownFile(markdownFile).filter((imagePath) => !isImageHosting(imagePath));
      copyImagesInMarkdown(markdownFile, relativeImages, MARKDOWN_DIR, TEST_DIST_DIR);
    });

    expect(fs.existsSync(path.join(TEST_DIST_DIR, 'a-image.jpg')));
    expect(fs.existsSync(path.join(TEST_DIST_DIR, 'images', 'a-image.jpg')));
    expect(fs.existsSync(path.join(TEST_DIST_DIR, 'cover.jpg')));
  });
});
