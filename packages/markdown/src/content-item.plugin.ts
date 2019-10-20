import * as uslug from 'uslug';
import * as MarkdownIt from 'markdown-it';
import { ContentItem } from '@blog/common/interfaces/articles/content-item';

const level = (tag: string) => Number(tag.slice(1));

/**
 * @desc set pid for headingItems
 * @param headingItems: origin heading data
 */
const collapseHeading = (headingItems: ContentItem[]): ContentItem[] => {
  const ROOT_PID = -1;

  // 1. fill pid
  headingItems.map((headingItem, index): void => {
    if (headingItem.level === 1) {
      headingItem.pid = ROOT_PID;
    } else if (index !== 0 && headingItem.level < headingItems[index - 1].level) {
      for (let i = index - 1; i > 0; i--) {
        if (headingItem.level === headingItems[i].level) {
          headingItem.pid = headingItems[i].pid;
          break;
        }
      }
    } else if (index !== 0 && headingItem.level > headingItems[index - 1].level) {
      headingItem.pid = headingItems[index - 1].position;
    } else {
      headingItem.pid = headingItems[index - 1].pid;
    }
  });

  // 2. fill children
  const newHeadingItems: ContentItem[] = [];
  headingItems.forEach((headingItem): void => {
    const isRoot = headingItem.pid === ROOT_PID;
    const isChild = headingItem.pid !== ROOT_PID;

    if (isRoot) {
      newHeadingItems.push(headingItem);
    }

    if (isChild && headingItem.pid !== undefined) {
      headingItems[headingItem.pid].children.push(headingItem);
    }
  });

  return newHeadingItems;
};

export const ContentItemPlugin = (md: MarkdownIt) => {
  let shadowState;

  md.core.ruler.push('shadow_state', (state) => {
    shadowState = state;
  });

  md.core.ruler.after('shadow_state', 'content_item', (state) => {
    const shadowTokens = shadowState.tokens;

    let headingItems: ContentItem[] = [];
    let headingPosition = 0;
    shadowTokens.map((token, index): void => {
      if (token.type === 'heading_close') {
        const headingContent = shadowTokens[index - 1].content;
        const headingLevel = level(token.tag);
        const headingId = uslug(headingContent);

        headingItems.push({
          label: headingContent,
          level: headingLevel,
          id: headingId,
          position: headingPosition++,
          children: []
        });
      }
    });

    headingItems = collapseHeading(headingItems);

    if (state.env) {
      state.env.toc = headingItems;
    }
  });
};
