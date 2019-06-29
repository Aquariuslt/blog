import * as uslug from 'uslug';
import * as MarkdownIt from 'markdown-it';
import * as AnchorPlugin from 'markdown-it-anchor';
import { DetectImagesPlugin, MetadataPlugin, SummaryPlugin, TOCPlugin } from '@utils/markdown-it-plugins';
import * as path from 'path';
import * as fs from 'fs';
import * as logger from 'fancy-log';
import * as hljs from 'highlight.js';
import scanner from './scanner';

const uslugify = (input): string => {
  return uslug(input);
};

function createInstance(): MarkdownIt {
  return MarkdownIt({
    langPrefix: 'hljs ',
    // TODO: consider move to a single handle function
    highlight: function(str, lang): string {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(lang, str).value;
      }
      return '';
    }
  })
    .use(MetadataPlugin)
    .use(SummaryPlugin)
    .use(TOCPlugin)
    .use(DetectImagesPlugin)
    .use(AnchorPlugin, {
      slugify: uslugify
    });
}


function parse(filename: string, md: string): BlogModel.Post {
  const markdownIt = createInstance();

  logger.info('Parsing filename:', filename);
  const context: BlogModel.Post = {
    filename,
    md,
    html: '',
    metadata: {
      title: '',
      created: '',
      updated: '',
      category: ''
    }
  };
  context.html = markdownIt.render(md, context);
  return context;
}

function init(filepath: string): BlogModel.PostFile {
  const filename = path.basename(filepath, '.md');
  const mdContent = fs.readFileSync(filepath).toString();

  return parse(filename, mdContent);
}


export default {
  init,
  parse
};

export {
  scanner
};
