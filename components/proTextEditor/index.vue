<template>
  <div
    class="pro-editor"
    :class="{
      'pro-editor--disabled': disabled
    }">

    <v-card v-bind="cardProps">
      <slot name="toolbar-before" />

      <toolbar-menu
        v-if="extensions && extensions.length || !extensions"
        :editor="editor"
        :extensions="toolbarExtensions"
        :disabled="disabled"
        :toolbar-attributes="toolbarAttributes"
        :tags-list="toolbarTagsList"
        :tag-symbol-start="tagSymbolStart"
        :tag-symbol-end="tagSymbolEnd"
        :is-code-view-mode="isCodeViewMode"
        @create-link="createLink"
        @create-image="createImage"
        @create-button="createButton"
        @create-iframe="createIframe"
        @enable-view-code="enableViewCode"
      ></toolbar-menu>

      <slot name="toolbar-after" />

      <div
        v-if="isCodeViewMode"
      >
        <textarea ref="cmTextArea"></textarea>
      </div>

      <editor-content
        v-show="!isCodeViewMode"
        :editor="editor"
        class="pro-editor__content"
        :class="{
          'pro-editor__content--disabled': disabled
        }"
      />

      <v-tooltip color="transparent" bottom :nudge-right="100" transition="scale-transition" v-model="tagTooltip.active" :position-x="tagTooltip.positionX" :position-y="tagTooltip.positionY">
        <tags-list
          :show="showTags"
          :tag-symbol-start="tagSymbolStart"
          :tag-symbol-end="tagSymbolEnd"
          :tags="tagsList"
          :navigated-tag-index="navigatedTagIndex"
          @tag-selected="selectTag"
        >
        </tags-list>
      </v-tooltip>


      <v-divider v-show="!noFooter"></v-divider>

      <v-card-actions v-show="! noFooter">
        <slot name="footer">
          <v-spacer></v-spacer>

          <span>
                {{ totalWords }} {{ !totalWords || totalWords > 1 ? $t('words'): $t('word') }}
              </span>
          <span class="ma-2">
                -
              </span>
          <span>
                {{ totalCharacters }} {{ !totalCharacters || totalCharacters > 1 ? $t('characters'): $t('character') }}
              </span>
        </slot>

      </v-card-actions>

    </v-card>

    <v-dialog v-model="buttonDialog" width="500">
      <v-card>
        <v-card-title>
          Create Button
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="URL" v-model="button.url"/>

            <v-text-field label="Text" v-model="button.text"/>

            <base-color-picker :label="$t('Color')"
                               :color="button.color"
                               :has-icon="false"
                               @change-color="changeColor"
            />

            <h3 class="mt-2">{{ $t('Preview') }}</h3>
            <hr class="mb-4">
            <v-btn target="_blank" link :href="button.url" :color="button.color" >{{ button.text }}</v-btn>


          </v-form>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn text @click="setButton">Apply</v-btn>
          <v-btn text @click="buttonDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="iframeDialog" width="500">
      <v-card>
        <v-card-title>
          Create iFrame
        </v-card-title>
        <v-card-text>
          <v-form>

            <v-text-field label="Link or src" v-model="iframe.src"/>

          </v-form>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn text @click="setIframe">Apply</v-btn>
          <v-btn text @click="iframeDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="linkDialog" width="500">
      <v-card>
        <v-card-title>
          Enter Link URL
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="URL" v-model="link.url"/>

            <v-text-field label="Text" v-model="link.text"/>

          </v-form>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn text @click="setLink">Apply</v-btn>
          <v-btn text @click="linkDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="imgDialog" width="500">
      <v-card>
        <v-card-title>
          Add Image
        </v-card-title>
        <v-card-text>

          <v-tabs v-model="tabImg">
            <v-tab >
             {{ $t('URL') }}
            </v-tab>

            <v-tab >
              {{ $t('Upload') }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tabImg">
            <v-tab-item>
              <v-form>
                <v-text-field
                  v-model="urlImageSelected"
                  :label="$t('Source_Link')"
                />
                <v-text-field
                  v-model="urlImageText"
                  :label="$t('Alternative_Text')"
                />

              </v-form>
            </v-tab-item>

            <v-tab-item>
              <v-alert
                v-if="imageSelected !== null"
                dismissible
                prominent
                text
              >
                <template v-slot:close>
                  <v-btn
                    icon
                    @click="removeImage"
                  >
                    <v-icon>mdi-close-circle</v-icon>
                  </v-btn>
                </template>

                <v-text-field
                  v-model="imageText"
                  :label="$t('Alternative_Text')"
                />

                <v-img :src="imageSelectedUrl" max-width="120"></v-img>
              </v-alert>

              <file-drag-drop v-else @filesToUpload="handleImages" file-accept="image/*" />
            </v-tab-item>

          </v-tabs-items>


        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn text @click="setImage">Apply</v-btn>
          <v-btn text @click="imgDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>


<script>
import { Editor, EditorContent  } from 'tiptap';
import {
  Bold,
  HardBreak,
  HorizontalRule,

  Underline,
  Strike,
  Italic,
  Image,
  History,
  Blockquote,

  ListItem,
  OrderedList,
  BulletList,
  Placeholder,
} from 'tiptap-extensions';

import {
  TextAlign,
  Tag,
  Paragraph,
  Heading,
  CodeView,
  Iframe,
  CustomLink
} from './customExtensions'

import throttle  from 'lodash.throttle'
import FileDragDrop from "../base/FileDragDrop";
import ToolbarMenu from "./ToolbarMenu";

//
import Fuse from 'fuse.js'
import TagsList from "./TagsList";

/**
 * Codemirror library
 * @link: https://codemirror.net/5/doc/manual.html#usage
 */
import codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css'; // import base style
import 'codemirror/mode/xml/xml.js'; // language
import 'codemirror/addon/selection/active-line.js'; // require active-line.js
import 'codemirror/addon/edit/closetag.js';
import CodeViewMixin from "./mixins/CodeViewMixin"; // autoCloseTags
import {EditorView} from "@codemirror/view" // change theme

let myTheme = EditorView.theme({
  "&": {
    color: "white",
    backgroundColor: "#034"
  },
  ".cm-content": {
    caretColor: "#0e9"
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "#0e9"
  },
  "&.cm-focused .cm-selectionBackground, ::selection": {
    backgroundColor: "#074"
  },
  ".cm-gutters": {
    backgroundColor: "#045",
    color: "#ddd",
    border: "none"
  }
}, {dark: true})


/**
 * Available Extensions
 * @type {string[]}
 */
const listOfAvailableExt = [
  "history",
  "heading",
  "formatText",
  "textAlign",
  "link",
  "button",
  "image",
  "iframe",
  "orderedList",
  "bulletList",
  "blockquote",
  "horizontalRule",
  "tag",
  "codeView"
];

export default {
  name: 'ProTextEditor',
  mixins: [CodeViewMixin],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String, Object,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Write something ...'
    },
    extensions: {
      type: Array,
      required: false,
      validator: extensions => {
        if (!extensions.length) return true

        if (! extensions.some(ext => listOfAvailableExt.includes(ext))){
          throw new Error(`The Extensions array should contain a valid extension name. Valid extensions: ${listOfAvailableExt.join(', ')}.`)
        }

        return true
      }
    },
    cardProps: {
      type: Object,
      default: () => ({})
    },
    toolbarAttributes: {
      type: Object,
      default: () => ({
        color: 'primary',
        flat: true,
        dense: true,
      })
    },
    noFooter: {
      type: Boolean,
      default: false
    },
    outputFormat: {
      type: String,
      default: 'html'
    },
    tags: {
      type: Array,
      default: () => ([])
    }
  },
  watch: {
    value(val) {
      // if the last change was not made by the user but parent
      // component, then update the content of the editor
      if (!this.lastChangeMadeByUser) {
        this.editor.setContent(val);
      }
      this.lastChangeMadeByUser = false;
    },
    tags(val) {
      let tags = this.tags.map((tag, index) => {return {id: (index + 1), name: tag.name, label: tag.label}})

      this.toolbarTagsList = tags
      this.tagsList = tags
    }
  },
  components: {
    TagsList,
    EditorContent,
    FileDragDrop,
    ToolbarMenu
  },
  data() {
    return {
      urlImageSelected: '',
      urlImageText: '',

      tabImg: null,
      imgDialog: false,
      imageSelected: null,
      imageText: '',

      activeCommand: null,

      editor: null,

      linkDialog: false,
      link: {
        url: '',
        text: ''
      },

      buttonDialog: false,
      button: {
        url: '',
        text: 'text',
        color: '#8dd2c9' //primary
      },

      iframeDialog: false,
      iframe: {
        src: ''
      },

      totalWords: 0,

      toolbarExtensions: [],


      // tags
      toolbarTagsList: [],
      query: null,
      suggestionRange: null,
      tagsList: [],
      navigatedTagIndex: 0,
      insertTag: () => {},

      tagTooltip: {
        active: false,
        positionX: 0,
        positionY: 0
      },

      tagSymbolStart: '{{',
      tagSymbolEnd: '}}',
      lastChangeMadeByUser: false
    }
  },
  mounted() {
    this.initializeEditor();
  },
  computed: {
    showTags() {
      return this.query || this.tagsList.length > 0
    },


    totalCharacters(){
      if (!this.editor) return 0;
      return this.editor.state.doc.textContent.length;
    },

    imageSelectedUrl(){
      if ( this.imageSelected ){
        return URL.createObjectURL(this.imageSelected)
      }

    }
  },
  created() {
    // // @todo: retrieve/get list of tags from server side
    // let tags = [
    //   { id: 1, name: 'first_name', label: 'First name' },
    //   { id: 2, name: 'last_name', label: 'Last name' },
    //   { id: 3, name: 'email', label: 'Email' },
    //   { id: 4, name: 'webinar_Presenter_Name', label: 'Webinar Presenter name' },
    //   { id: 5, name: 'webinar_Title', label: 'Webinar Title' },
    //   { id: 6, name: 'webinar_Date', label: 'Webinar Date' },
    //   { id: 7, name: 'host_Name', label: 'Webinar Host name' },
    // ]

    let tags = this.tags.map((tag, index) => {return {id: (index + 1), name: tag, label: tag}})

    this.toolbarTagsList = tags
    this.tagsList = tags
  },
  methods: {
    initializeEditor() {
      // Editor Extensions
      let extensions = []

      if (this.extensions && this.extensions.length) {
        // Set selective extensions
        this.extensions.map(ext => {
          extensions.push(this.retrieveExtension(ext))
        })

        this.toolbarExtensions = this.extensions

      } else {
        // Set starterKit extensions by default
        extensions = this.retrieveStarterKitExt()
        this.toolbarExtensions = listOfAvailableExt
      }

      extensions.push(new Placeholder({
        emptyNodeClass: 'pro-editor__paragraph--is-empty',
        emptyNodeText: this.placeholder,
        showOnlyWhenEditable: true
      }));

      this.editor = new Editor({
        content: this.value,
        // content: `
        //  <p>
        //    Test
        //   </p>
        //   <p>Typing "in 10 days " creates a chip that looks like this: <vue-component days="10"></vue-component></p>
        //   <p></p>
        //   <p></p>
        //   <p></p>
        //   <p></p>
        // `,
        extensions,
        editable: ! this.disabled,
        onUpdate: this.onUpdate,
        onBlur: this.onBlur,
        onFocus: this.onFocus
      })

      if (this.extensions && this.extensions.includes('image')) {
        this.editor.schema.nodes.image.attrs = {
          ...this.editor.nodes.image.attrs,
          width: 'auto',
          height: 'auto'
        }
      }

      // Send event when initialise
      this.onInit()

      // Debug logs..
      console.log("editor", this.editor)
      window._editor = this.editor
    },

    // navigate to the previous item
    // if it's the first item, navigate to the last one
    upHandler() {
      this.navigatedTagIndex = ((this.navigatedTagIndex + this.tagsList.length) - 1) % this.tagsList.length
    },
    // navigate to the next item
    // if it's the last item, navigate to the first one
    downHandler() {
      this.navigatedTagIndex = (this.navigatedTagIndex + 1) % this.tagsList.length
    },
    enterHandler() {
      const tag = this.tagsList[this.navigatedTagIndex]
      if (tag) {
        this.selectTag(tag)
      }
    },
    // we have to replace our suggestion text with a tag
    // so it's important to pass also the position of your suggestion text
    selectTag(tagSelected) {
      this.insertTag({
        range: this.suggestionRange,
        attrs: {
          id: tagSelected.id,
          label: tagSelected.label,
          name: tagSelected.name
        },
      })
      this.editor.focus()
    },
    // renders a popup/tooltip with suggestions
    // tiptap provides a virtualNode object for using popups/tooltips
    renderPopup(node) {
      const { x, y } = node.getBoundingClientRect();
      if (x === 0 && y === 0) {
        return
      }
      if (this.tagTooltip.active) {
        return
      }

      this.tagTooltip.active = true
      this.tagTooltip.positionX = x
      this.tagTooltip.positionY = y
    },
    destroyPopup() {
      if (this.tagTooltip.active) {
        this.tagTooltip.active = false
        this.tagTooltip.positionX = 0
        this.tagTooltip.positionY = 0
      }
    },

    retrieveCodeViewConfig(){
      return {
        codemirror,
        codemirrorOptions: {
          /**
           * Theme templates available in this demo: https://codepen.io/DerkJanS/pen/owVGZb
           * More info about themes, @link: https://codemirror.net/5/demo/theme.html#bespin
           */
          darkTheme: 'bespin', // light theme it has by default.
          styleActiveLine: true,
          autoCloseTags: true,

          lineNumbers: true,
          lineWrapping: true,
          tabSize: 2,
          tabMode: 'indent',
          mode: 'text/html',
        },
      }
    },

    retrieveTagConfig(){
      return {
        matcher: {
          char: this.tagSymbolStart,
          charEnd: this.tagSymbolEnd,
          allowSpaces: false,
          startOfLine: false,
        },

        // a list of all suggested tags
        items: this.tagsList,

        // is called when a suggestion starts
        onEnter: ({
                    items, query, range, command, virtualNode,
                  }) => {
          this.query = query
          this.tagsList = items
          this.suggestionRange = range
          this.renderPopup(virtualNode)

          // we save the command for inserting a selected tag
          // this allows us to call it inside of our custom popup/tooltip
          // via keyboard navigation and on click
          this.insertTag = command
        },
        // is called when a suggestion has changed
        onChange: ({
                     items, query, range, virtualNode,
                   }) => {
          this.query = query
          this.tagsList = items
          this.suggestionRange = range
          this.navigatedTagIndex = 0
          this.renderPopup(virtualNode)
        },
        // is called when a suggestion is cancelled
        onExit: () => {
          // reset all saved values
          this.query = null
          this.tagsList = []
          this.suggestionRange = null
          this.navigatedTagIndex = 0
          this.destroyPopup()
        },
        // is called on every keyDown event while a suggestion is active
        onKeyDown: ({ event }) => {
          if (event.key === 'ArrowUp') {
            this.upHandler()
            return true
          }
          if (event.key === 'ArrowDown') {
            this.downHandler()
            return true
          }
          if (event.key === 'Enter') {
            this.enterHandler()
            return true
          }
          return false
        },
        // is called when a suggestion has changed
        // this function is optional because there is basic filtering built-in
        // you can overwrite it if you prefer your own filtering
        // in this example we use fuse.js with support for fuzzy search
        onFilter: async (items, query) => {
          if (!query) {
            return items
          }
          await new Promise(resolve => {
            setTimeout(resolve, 500)
          })
          const fuse = new Fuse(items, {
            threshold: 0.2,
            keys: ['name'],
          })
          return fuse.search(query).map(item => item.item)
        },
      }
    },


    retrieveStarterKitExt(){
      return [
        new Heading({
          levels: [1, 2, 3]
        }),
        new Bold(),
        new Underline(),
        new Strike(),
        new Italic(),
        new Image(),
        new History(),
        new Blockquote(),
        new HardBreak(),
        new HorizontalRule(),

        new CustomLink(),

        new ListItem(),
        new OrderedList(),
        new BulletList(),

        new Paragraph(),
        new TextAlign(),

        new Tag(this.retrieveTagConfig()),

        new Iframe(),
        new CodeView(this.retrieveCodeViewConfig())
      ]
    },

    retrieveExtension(extensionName){
      switch (extensionName) {
        case 'heading':
          return {
            ...new Paragraph(),
            ...new Heading({
              levels: [1, 2, 3]
            })
          }
        case 'formatText':
          return {
            ...new Bold(),
            ...new Underline(),
            ...new Strike(),
            ...new Italic()
          }

        case 'image':
          return new Image()

        case 'history':
          return new History()

        case 'blockquote':
          return new Blockquote()

        case 'horizontalRule':
          return {
            ...new HardBreak(),
            ...new HorizontalRule(),
          }

        case 'link':
        case 'button':
          return new CustomLink()

        case 'orderedList':
          return {
            ...new ListItem(),
            ...new OrderedList(),
          }

        case 'bulletList':
          return {
            ...new ListItem(),
            ...new BulletList(),
          }

        case 'textAlign':
          return new TextAlign()

        case 'tag':
          return new Tag(this.retrieveTagConfig())

        case 'iframe':
          return new Iframe()

        case 'codeView':
          return new CodeView(this.retrieveCodeViewConfig())

        default:
          console.log(`Sorry, the extension is not found.`);
      }
    },

    throttle: throttle(function(cb) {
      cb();
    }, 1000),

    countWords(str) {
      const arr = str.split(' ');

      return arr.filter(word => word !== '').length;
    },

    onInit(){
      // count words
      this.throttle(() => {
        let words = 0

        this.editor.state.doc.content.content.map((c) => {
          words += this.countWords(c.textContent)
        })

        this.totalWords = words

      })

      this.$emit('init', {
        editor: this.editor
      })

      // console.log("emitting updateContent event", this.editor.getHTML());
      //
      // this.$emit('updateContent', this.editor.getHTML());
    },

    onUpdate(e){
      console.log("editor update HTML", e.getHTML())
      console.log("editor update JSON", e.getJSON())

      let output = null
      if (this.outputFormat === 'html') {
        output = e.getHTML()
      } else {
        output = e.getJSON()
      }

      // Set this to true so that in watch -> value, when the value
      // changes, we can know if we should set the content of the
      // editor or not.
      this.lastChangeMadeByUser = true;

      // When the editor changes (user input)
      this.$emit('input', output, e)

      // console.log("emitting updateContent event update", e.getHTML());
      //
      // this.$emit('updateContent', e.getHTML());

      // count words
      this.throttle(() => {
        let words = 0

        e.state.doc.content.content.map((c) => {
          words += this.countWords(c.textContent)
        })

        this.totalWords = words

      })
    },

    onBlur ({ event, view }) {
      this.$emit('blur', event, view)
    },

    onFocus ({ event, view }) {
      this.$emit('focus', event, view)
    },

    handleImages(files){
      console.log("file", files)
      this.imageSelected = files && files.length && files[0]

      if ( this.imageSelected )
        this.imageText = this.imageSelected.name
    },

    removeImage(){
      this.imageSelected = null
    },

    createImage(command){
      this.imgDialog = true
      this.activeCommand = command
    },

    setImage(){
      this.imgDialog = false

      this.activeCommand({
        // src: "https://66.media.tumblr.com/dcd3d24b79d78a3ee0f9192246e727f1/tumblr_o00xgqMhPM1qak053o1_400.gif"
        src: this.urlImageSelected || this.imageSelectedUrl,
        alt: this.urlImageText || this.imageText,
        title: this.urlImageText || this.imageText,
        width: '300',
        height: 'auto'
      })

      // reset
      this.imageSelected = null
      this.imageText = ''
      this.urlImageSelected = ''
      this.urlImageText = ''
    },

    createLink(command){
      this.linkDialog = true
      this.activeCommand = command
    },

    setLink(){
      this.linkDialog = false

      this.activeCommand({ href: this.link.url, text: this.link.text })

      // add a space after the command is executed.
      const transaction = this.editor.state.tr.insertText(' ')
      this.editor.view.dispatch(transaction)

      this.editor.focus()
    },

    createButton(command){
      this.buttonDialog = true
      this.activeCommand = command
    },

    setButton(){
      this.buttonDialog = false

      this.activeCommand({ href: this.button.url, 'data-link-type': 'button', 'data-color': this.button.color, text: this.button.text  })


      // add a space after the command is executed.
      const transaction = this.editor.state.tr.insertText(' ')
      this.editor.view.dispatch(transaction)
      this.editor.focus()
    },

    changeColor(color){
      this.button.color = color
    },

    createIframe(command){
      this.iframeDialog = true
      this.activeCommand = command
    },

    setIframe(){
      this.iframeDialog = false
      this.activeCommand({ src: this.iframe.src })
    },

    enableViewCode(){
      this.isCodeViewMode = !this.isCodeViewMode
    }
  },

  beforeDestroy() {
    this.editor.destroy()


    this.destroyPopup()
  },
};

</script>

<style lang="scss">
.v-tooltip__content {
  pointer-events: initial !important;
}

.v-tooltip__content.menuable__content__active {
  opacity: 1 !important;
}


.theme--light{
  .tag {
    background: rgba(#000, 0.1);
    //color: rgba(#000, 0.6);
  }
}
.theme--dark{
  .tag {
    background: rgba(#fff, 0.1);
    //color: rgba(#fff, 0.6);
  }
}

.tag {
  //font-size: 0.8rem;
  font-weight: bold;
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
  white-space: nowrap;
}




blockquote {
  border-left: 0.25em solid #dfe2e5;
  padding-left: 1em;
  //margin: 20px 0 !important;
}

.pro-editor {
  position: relative;
  .ProseMirror {
    outline: none !important;
    margin: 20px !important;
    height: 400px;

    img {
      max-width: 100%;
      height: auto;

      &.ProseMirror-selectednode {
        outline: 3px solid #68CEF8;
      }
    }
  }
}
.pro-editor--disabled {
  cursor: not-allowed;
}
.pro-editor__content {
  transition: all 2s;
  overflow: auto !important;
  padding: 5px;

  //a {
  //  pointer-events: none;
  //}

  p {
    font-size: 16px;
    //margin-top: 16px !important;
    //margin-bottom: 16px !important;
    //min-height: 1rem;
    &.pro-editor__paragraph--is-empty {
      &:first-child {
        &::before {
          content: attr(data-empty-text);
          float: left;
          color: #aaa;
          pointer-events: none;
          height: 0;
          font-style: italic;
        }
      }
    }
  }
}
.pro-editor__content h1,
.pro-editor__content h2,
.pro-editor__content h3,
.pro-editor__content h4 {
  //margin: 10px 0 20px !important;
}

.pro-editor__content--disabled {
  color: rgba(0,0,0,0.38);
  &:after {
    background-color: rgba(0,0,0,0.06);
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}


.pro-editor__toolbar {
  .v-toolbar {
    display: flex;
    height: auto !important;
    padding: 5px;

    .v-toolbar__content {
      height: auto !important;
      flex-wrap: wrap;
      padding: 0;
    }
  }
}

</style>


<!--<style lang="scss">-->
<!--@import '~vuetify/src/components/VBtn/VBtn';-->

<!--a[data-link-type="button"]{-->
<!--  @extend .v-btn;-->
<!--  @extend .v-size&#45;&#45;default;-->
<!--}-->
<!--</style>-->

