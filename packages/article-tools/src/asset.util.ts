import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';

/**
 * @param filepath: markdown filepath
 * @param images: the markdown related images
 * @param baseDir: base directory to scan markdown files, suppose to use same prefix
 * @param destination: the dest directory
 * */
export const copyImagesInMarkdown = (filepath: string, images: string[], baseDir: string, destination: string) => {
  const sourceDir = path.dirname(filepath);
  const sourceImagePaths = images.map((imageRelativePath) => path.resolve(sourceDir, imageRelativePath));

  sourceImagePaths.forEach((sourceImagePath) => {
    const imageRelativePath = path.relative(baseDir, sourceImagePath);
    const imageDestinationPath = path.join(destination, imageRelativePath);
    const imageDestinationDir = path.dirname(imageDestinationPath);
    mkdirp.sync(imageDestinationDir);
    fs.copyFileSync(sourceImagePath, imageDestinationPath);
  });
};
