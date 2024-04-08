import { Heading as TiptapHeading } from 'tiptap-extensions';
import { ParagraphNodeSpec, getParagraphNodeAttrs, toParagraphDOM } from './Paragraph';

function getAttrs(dom) {
  const attrs = getParagraphNodeAttrs(dom);
  const level = dom.nodeName.match(/[H|h](\d)/)[1];
  attrs.level = Number(level);
  return attrs;
}

function toDOM(node) {
  const dom = toParagraphDOM(node);
  const level = node.attrs.level || 1;

  dom[0] = `h${level}`;
  return dom;
}

export default class Heading extends TiptapHeading {
  get schema() {
    return {
      ...ParagraphNodeSpec,
      attrs: {
        ...ParagraphNodeSpec.attrs,
        level: {
          default: 1,
        },
      },
      defining: true,
      draggable: false,
      parseDOM: this.options.levels.map((level) => ({
        tag: `h${level}`,
        getAttrs,
      })),
      toDOM,
    };
  }
}
