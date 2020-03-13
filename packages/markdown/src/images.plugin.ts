import * as _ from 'lodash';
import * as MarkdownIt from 'markdown-it';

export const ImagesDetectionPlugin = (md: MarkdownIt) => {
  md.core.ruler.push('detect_images', (state): void => {
    const tokens = state.tokens;
    const images: string[] = [];

    tokens.map((token): void => {
      if (token.type === 'inline') {
        token.children.map((childToken): void => {
          if (childToken.type === 'image') {
            childToken.attrs.map((imageAttr): void => {
              if (_.isArray(imageAttr) && imageAttr.length > 1 && imageAttr[0] === 'src') {
                const imageUrl = imageAttr[1];
                images.push(imageUrl);
              }
            });
          }
        });
      }
    });

    if (state.env) {
      state.env.images = images;
    }
  });

  // add native lazy loading attribute
  const defaultImageRenderer = md.renderer.rules.image;

  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    token.attrSet('loading', 'lazy');
    return defaultImageRenderer(tokens, idx, options, env, self);
  };
};
