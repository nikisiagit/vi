import { Extension } from 'tiptap';
import { CommandFunction } from 'tiptap-commands';
import { setTextAlign, isTextAlignActive } from '../utils/Alignment';
import {ALIGN_PATTERN} from "../constants";

export default class TextAlign extends Extension {
  get name() {
    return 'text_align';
  }

  get defaultOptions() {
    return {
      alignments: [
        'left',
        'center',
        'right',
        'justify',
      ],
    };
  }

  commands() {
    return this.options.alignments.reduce((commands, alignment) => {
      if (!ALIGN_PATTERN.test(alignment)) return commands;

      return {
        ...commands,
        [`align_${alignment}`]: () => (state, dispatch) => {
        const { selection } = state;
        const tr = setTextAlign(
          state.tr.setSelection(selection),
          alignment === 'left' ? null : alignment,
        );

        if (tr.docChanged) {
          dispatch && dispatch(tr);
          return true;
        } else {
          return false;
        }
      },
    };
    }, {});
  }
}
