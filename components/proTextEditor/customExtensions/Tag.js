import {Node} from "tiptap";
import {replaceText} from "tiptap-commands";
import SuggestionsPlugin from "../plugins/Suggestions";
import { Fragment } from 'prosemirror-model'

export default class Tag extends Node {

  get name() {
    return 'tag'
  }

  get defaultOptions() {
    return {
      matcher: {
        char: '{{',
        charEnd: '}}',
        allowSpaces: false,
        startOfLine: false,
      },
      tagClass: 'tag',
      suggestionClass: 'tag-suggestion',
    }
  }

  getLabel(dom) {
    return dom.innerText.split(this.options.matcher.char).join('')
  }

  createFragment(schema, label) {
    //@Todo: important for json structure
    return Fragment.fromJSON(schema, [{ type: 'text', text: `${label}` }])
  }

  insertTag(range, attrs, schema) {
    const nodeType = schema.nodes[this.name]
    const nodeFragment = this.createFragment(schema, attrs.label)
    return replaceText(range, nodeType, attrs, nodeFragment)
  }

  get schema() {
    return {
      attrs: {
        id: {},
        label: {},
        name: {},
      },
      group: 'inline',
      inline: true,
      content: 'text*',
      selectable: false,
      atom: true,
      toDOM: node => [
        'span',
        {
          class: this.options.tagClass,
          'data-tag-id': node.attrs.id,
        },
         `${this.options.matcher.char}${node.attrs.name}${this.options.matcher.charEnd}`,
      ],
      parseDOM: [
        {
          tag: 'span[data-tag-id]',
          getAttrs: dom => {
            const id = dom.getAttribute('data-tag-id')
            const label = this.getLabel(dom)

            const item = this.retrieveItemById(parseInt(id))

            // Retrieve item by id
            if (item) {
              return item
            }

            return { id, label }
          },
          getContent: (dom, schema) => {
            const label = this.getLabel(dom)
            return this.createFragment(schema, label)
          },
        },
      ],
    }
  }

  retrieveItemById(id){
    return this.options.items.find(item => item.id === id)
  }

  commands({ schema }) {
    return attrs => this.insertTag(null, attrs, schema)
  }

  get plugins() {
    return [
      SuggestionsPlugin({
        command: ({ range, attrs, schema }) => this.insertTag(range, attrs, schema),
        appendText: ' ',
        matcher: this.options.matcher,
        items: this.options.items,
        onEnter: this.options.onEnter,
        onChange: this.options.onChange,
        onExit: this.options.onExit,
        onKeyDown: this.options.onKeyDown,
        onFilter: this.options.onFilter,
        suggestionClass: this.options.suggestionClass,
      }),
    ]
  }

}
