import MarkdownIt = require('markdown-it');

const DEFAULT_SUMMARY_LENGTH = 100;

export const SummaryPlugin = (md: MarkdownIt, options?) => {
  md.core.ruler.push('detect_summary', (state): void => {
    let summary = '';
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
        if (summary.length < summaryLength) {
          summary += token.content;
        }
      }
    });

    if (state.env) {
      state.env.summary = summary;
    }
  });
};
