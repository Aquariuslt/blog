import * as path from 'path';
import { lookupMarkdownFiles } from '../lookup.util';
import { lookupImagesInMarkdownFile, getImageFilename, isImageHosting } from '../lookup.util';

describe('lookup util', () => {
  it('# should scan all markdown file under __fixtures__ dir', () => {
    const BASE_DIR = path.join(__dirname, `__fixtures__`);

    const markdownFileList = lookupMarkdownFiles(BASE_DIR);

    expect(markdownFileList).toHaveLength(2);
  });

  it('# should scan all relative file from sample markdown file', () => {
    const SAMPLE_FILE_PATH = path.join(__dirname, '__fixtures__', 'sample-article-a.md');
    const images = lookupImagesInMarkdownFile(SAMPLE_FILE_PATH);
    expect(images).toHaveLength(4);
  });

  it('# should detect if an image url is not relative', () => {
    const RELATIVE_URL = './image.png';
    const ABSOLUTE_URL = 'https://example.com/image.png';

    expect(isImageHosting(RELATIVE_URL)).toBeFalsy();
    expect(isImageHosting(ABSOLUTE_URL)).toBeTruthy();
  });

  it('# should get image filename from url', () => {
    const IMAGE_URL = 'https://example.com/2019/09/30/image.png';
    const EXPECTED_FILENAME = 'image.png';

    expect(getImageFilename(IMAGE_URL)).toEqual(EXPECTED_FILENAME);
  });
});
