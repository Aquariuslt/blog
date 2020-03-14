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

  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const src = token.attrGet('src');
    const alt = token.attrGet('alt');
    const optimizedWebpSrc = _.replace(src, `.png`, `.webp`);

    return `
        <picture>
          <source srcset="${optimizedWebpSrc}"  data-srcset="${optimizedWebpSrc}" type="image/webp" data-was-processed="false" />
          <img alt="${alt}" class="lazy" src="${src}" data-src="${src}" loading="lazy"/>
        </picture>
    `;
  };
};
