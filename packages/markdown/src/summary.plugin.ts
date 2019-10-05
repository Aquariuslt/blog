import * as MarkdownIt from 'markdown-it';
import * as cheerio from 'cheerio';

const DEFAULT_SUMMARY_LENGTH = 200;

export const SummaryPlugin = (md: MarkdownIt, options?) => {
  md.core.ruler.push('detect_summary', (state): void => {
    let summarySourceText = '';
    let summaryLength = DEFAULT_SUMMARY_LENGTH;

    if (options && options.len) {
      summaryLength = options.len;
    }

    const tokens = state.tokens;

    tokens.forEach((token, index): void => {
      if (
        index > 0 &&
        token.type === 'inline' &&
        tokens[index - 1].type === 'paragraph_open' &&
        token.content.charAt(0) != '#'
      ) {
        if (summarySourceText.length < summaryLength) {
          summarySourceText += token.content;
        }
      }
    });

    const summaryHtml = new MarkdownIt().render(summarySourceText);
    const $ = cheerio.load(summaryHtml);
    const summary = $.root().text();

    if (state.env) {
      state.env.summary = summary;
    }
  });
};
