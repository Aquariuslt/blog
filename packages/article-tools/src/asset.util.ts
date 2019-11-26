import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as sharp from 'sharp';
import { metadata } from '@blog/markdown';

/**
 * @param filepath: markdown filepath
 * @param images: the markdown related images
 * @param baseDir: base directory to scan markdown files, suppose to use same prefix
 * @param destination: the dest directory
 * */
export const copyImagesInMarkdown = (filepath: string, images: string[], baseDir: string, destination: string) => {
  const sourceDir = path.dirname(filepath);
  const sourceImagePaths = images.map((imageRelativePath) => path.resolve(sourceDir, imageRelativePath));

  const meta = metadata(fs.readFileSync(filepath).toString());
  const fileId = meta.id;

  sourceImagePaths.forEach((sourceImagePath) => {
    const imageRelativePath = path.relative(baseDir, sourceImagePath);
    const imageDestinationBasePath = path.join(destination, imageRelativePath);
    // join directory from post id
    const imageDestinationBase = path.dirname(imageDestinationBasePath);
    const imageFilename = path.basename(imageDestinationBasePath);
    const imageDestinationDir = path.join(imageDestinationBase, fileId);
    const imageDestinationPath = path.join(imageDestinationDir, imageFilename);

    mkdirp.sync(imageDestinationDir);
    fs.copyFileSync(sourceImagePath, imageDestinationPath);

    // try convert to optimized webp images after
    optimizeImage(imageDestinationPath);
  });
};

export const optimizeImage = async (imagePath) => {
  const imageBuffer = fs.readFileSync(imagePath);

  const imageParsedPath = path.parse(imagePath);
  const webpImageContent = await sharp(imageBuffer)
    .webp()
    .toBuffer();

  const webpImagePath = path.join(imageParsedPath.dir, imageParsedPath.name + '.webp');
  fs.writeFileSync(webpImagePath, webpImageContent);
};
