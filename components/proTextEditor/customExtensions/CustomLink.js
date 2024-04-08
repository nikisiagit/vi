import { Node } from 'tiptap'
import CustomLinkView from "../components/CustomLinkView";

export default class CustomLink extends Node {
  get name () {
    return 'custom_link'
  }

  get schema () {
    return {
      attrs: {
        href: {
          default: null
        },
        target: {
          default: '__blank'
        },
        rel: {
          default: 'noopener noreferrer nofollow'
        },
        'data-color': {
          default: 'primary'
        },
        'data-link-type': {
          default: 'link' // 'link' || 'button'
        },
        text: {
          default: null
        },
        class: {
          default: 'v-btn v-size--default'
        }
      },

      group: 'inline',
      inline: true,
      content: 'text*',
      // draggable: true,
      selectable: true,
      atom: true,
      parseDOM: [{
        tag: 'a[href]',
        getAttrs: dom => ({
          href: dom.getAttribute('href'),
          target: dom.getAttribute('target'),
          rel: dom.getAttribute('rel'),
          'data-color': dom.getAttribute('data-color'),
          'data-link-type': dom.getAttribute('data-link-type'),
          text: dom.innerText
        })
      }],
      toDOM: node => ['a', {
        href: node.attrs.href,
        target: node.attrs.target,
        rel: node.attrs.rel,
        class: node.attrs['data-link-type'] === 'button' ? node.attrs.class: null,
        style: node.attrs['data-link-type'] === 'button' ? `background: ${node.attrs['data-color']}`: null
      },
        node.attrs.text
      ]
    }
  }

  commands ({ type }) {
    return attrs => (state, dispatch) => {
      const { selection } = state
      const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos
      const node = type.create(attrs)
      const transaction = state.tr.insert(position, node)
      dispatch(transaction)
    }
  }

  get view () {
    return CustomLinkView
  }
}
