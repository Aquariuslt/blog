import * as yaml from 'js-yaml';
import { format } from 'date-fns';

const METADATA_RE = /```metadata\n([\s\S]*?)```/g;

function parse(meta: string): BlogModel.Metadata {
  return yaml.load(meta);
}

function detectMetadata(md): void {
  md.block.ruler.before('fence', 'metadata', (state, startLine, endLine): boolean => {
    const startPos = state.bMarks[startLine] + state.tShift[startLine];
    const maxPos = state.eMarks[endLine];
    const measureBlock = state.src.slice(startPos, maxPos);

    const matches = METADATA_RE.exec(measureBlock);

    if (!matches) {
      return false;
    }


    if (state.env) {
      const matchContent = matches[1];
      const metadata = parse(matchContent);

      metadata.created = format(metadata.created, 'YYYY-MM-DD');
      metadata.updated = format(metadata.updated, 'YYYY-MM-DD');

      state.env.metadata = metadata;
    }

    return false;
  });

  /**
   * override renderer rules
   * */
  const DEFAULT_CODE_BLOCK_RENDERER = md.renderer.rules.fence;

  md.renderer.rules.fence = function(tokens, index, options, env, self): string {
    const token = tokens[index];
    if (token.info === 'metadata') {
      return '';
    }
    return DEFAULT_CODE_BLOCK_RENDERER(tokens, index, options, env, self);
  };
}


export default detectMetadata;
