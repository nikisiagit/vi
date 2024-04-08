<template>
  <div class="pro-editor__toolbar">
    <editor-menu-bar
      v-slot="menuBarContext"
      :editor="editor"
    >
      <slot
        name="default"
        :isActive="menuBarContext.isActive"
        :commands="menuBarContext.commands"
      >
        <v-toolbar class="pl-5 pr-5" v-bind="toolbarAttributes" :disabled="disabled">
          <div v-if="action" v-for="(action, i) in actions.primary" :key="i">

            <template v-if="action.type === 'btn'">
              <v-btn
                text
                icon
                class="mr-1"
                :class="{ 'v-btn--active': action.classCondition ? action.classCondition(menuBarContext): null }"
                @click="action.actionClick(menuBarContext)"
              >
                <v-icon v-if="action.icon">
                  {{ action.icon }}
                </v-icon>
                <b v-else>
                  {{ action.name }}
                </b>
              </v-btn>
            </template>


            <template v-else>

              <v-menu
                v-if="action.name === 'heading'"
                offset-y left bottom :nudge-right="40"
                transition="slide-y-transition" :close-on-content-click="false"
                close-on-content-click
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="mr-1"
                    text
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>{{ action.icon }}</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item
                    :class="{ 'v-list-item--active primary--text': menuBarContext.isActive.paragraph() }"
                    @click="menuBarContext.commands.paragraph"
                  >
                    <v-list-item-title>
                      <span>{{ $t('Paragraph') }}</span>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item
                    :class="{ 'v-list-item--active primary--text': menuBarContext.isActive.heading({level: 1}) }"
                    @click="menuBarContext.commands.heading({level: 1})"
                  >
                    <v-list-item-title>
                      <h1>{{ $t('Heading_1') }}</h1>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item
                    :class="{ 'v-list-item--active primary--text': menuBarContext.isActive.heading({level: 2}) }"
                    @click="menuBarContext.commands.heading({level: 2})"
                  >
                    <v-list-item-title>
                      <h2>{{ $t('Heading_2') }}</h2>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item
                    :class="{ 'v-list-item--active primary--text': menuBarContext.isActive.heading({level: 3}) }"
                    @click="menuBarContext.commands.heading({level: 3})"
                  >
                    <v-list-item-title>
                      <h3>{{ $t('Heading_3') }}</h3>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-menu
                v-if="action.name === 'textAlign'"
                offset-y left bottom  :nudge-right="80"
                      transition="slide-y-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="mr-1"
                    text
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>{{ action.icon }}</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-row no-gutters>
                    <v-col>
                      <v-list-item
                        :class="{ 'v-list-item--active primary--text': alignmentIsActive('left') }"
                        @click="menuBarContext.commands.align_left()"
                      >
                        <v-list-item-title>
                          <v-icon >mdi-format-align-left</v-icon>
                        </v-list-item-title>
                      </v-list-item>
                    </v-col>
                    <v-col>
                      <v-list-item
                        :class="{ 'v-list-item--active primary--text': alignmentIsActive('center') }"
                        @click="menuBarContext.commands.align_center()"
                      >
                        <v-list-item-title>
                          <v-icon >mdi-format-align-center</v-icon>
                        </v-list-item-title>
                      </v-list-item>
                    </v-col>
                    <v-col>
                      <v-list-item
                        :class="{ 'v-list-item--active primary--text': alignmentIsActive('right') }"
                        @click="menuBarContext.commands.align_right()"
                      >
                        <v-list-item-title>
                          <v-icon >mdi-format-align-right</v-icon>
                        </v-list-item-title>
                      </v-list-item>

                    </v-col>
                    <v-col>
                      <v-list-item
                        :class="{ 'v-list-item--active primary--text': alignmentIsActive('justify') }"
                        @click="menuBarContext.commands.align_justify()"
                      >
                        <v-list-item-title>
                          <v-icon >mdi-format-align-justify</v-icon>
                        </v-list-item-title>
                      </v-list-item>
                    </v-col>
                  </v-row>

                </v-list>
              </v-menu>

              <v-menu
                v-if="action.name === 'formatText'"
                offset-y left bottom  :nudge-right="80"
                transition="slide-y-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="mr-1"
                    text
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>{{ action.icon }}</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-row no-gutters>
                    <v-col>
                      <v-list-item
                        :class="{ 'v-list-item--active primary--text': menuBarContext.isActive.bold() }"
                        @click="menuBarContext.commands.bold()"
                      >
                        <v-list-item-title>
                          <v-icon >mdi-format-bold</v-icon>
                        </v-list-item-title>
                      </v-list-item>
                    </v-col>
                    <v-col>
                      <v-list-item
                        :class="{ 'v-list-item--active primary--text': menuBarContext.isActive.underline() }"
                        @click="menuBarContext.commands.underline()"
                      >
                        <v-list-item-title>
                          <v-icon >mdi-format-underline</v-icon>
                        </v-list-item-title>
                      </v-list-item>
                    </v-col>
                    <v-col>
                      <v-list-item
                        :class="{ 'v-list-item--active primary--text': menuBarContext.isActive.strike() }"
                        @click="menuBarContext.commands.strike()"
                      >
                        <v-list-item-title>
                          <v-icon >mdi-format-strikethrough</v-icon>
                        </v-list-item-title>
                      </v-list-item>

                    </v-col>
                    <v-col>
                      <v-list-item
                        :class="{ 'v-list-item--active primary--text': menuBarContext.isActive.italic() }"
                        @click="menuBarContext.commands.italic()"
                      >
                        <v-list-item-title>
                          <v-icon >mdi-format-italic</v-icon>
                        </v-list-item-title>
                      </v-list-item>
                    </v-col>
                  </v-row>

                </v-list>
              </v-menu>

              <v-menu
                v-if="action.name === 'tag'"
                offset-y left bottom :nudge-right="40"
                transition="slide-y-transition" :close-on-content-click="false"
                close-on-content-click
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="mr-1"
                    text
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>{{ action.icon }}</v-icon>
                  </v-btn>
                </template>

                <tags-list
                  show
                  :tag-symbol-start="tagSymbolStart"
                  :tag-symbol-end="tagSymbolEnd"
                  :tags="tagsList"
                  @tag-selected="(tag) => selectTag(menuBarContext, tag)"
                >
                </tags-list>
              </v-menu>

            </template>


          </div>

          <div class="ml-auto">
            <v-btn
              text
              icon
              @click="toggleExpandedBar"
            >
              <v-icon>
                mdi-dots-vertical
              </v-icon>
            </v-btn>
          </div>

          <v-toolbar v-bind="toolbarAttributes" :disabled="disabled" v-if="extended">
            <v-row no-gutters>
              <v-col align="end">

                <v-btn
                  v-for="(action, i) in actions.secondary"
                  v-if="action"
                  :key="i"
                  text
                  icon
                  :class="{ 'v-btn--active': action.classCondition ? action.classCondition(menuBarContext): null }"
                  @click="action.actionClick(menuBarContext)"
                >
                  <v-icon v-if="action.icon">
                    {{ action.icon }}
                  </v-icon>
                  <b v-else>
                    {{ action.name }}
                  </b>
                </v-btn>

              </v-col>
            </v-row>
          </v-toolbar>

        </v-toolbar>
      </slot>
    </editor-menu-bar>
  </div>
</template>


<script>
import { EditorMenuBar } from 'tiptap';
import TagsList from "./TagsList";
import {isTextAlignActive} from "./utils/Alignment";

export default {
  name: 'ToolbarMenu',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    editor: {
      type: Object,
    },
    extensions: {
      type: Array,
      required: false,
    },
    toolbarAttributes: {
      type: Object,
      default: () => ({})
    },

    tagsList: {
      type: Array,
    },
    tagSymbolStart: {
      type: String,
      default: '{{'
    },
    tagSymbolEnd: {
      type: String,
      default: '}}'
    },
    isCodeViewMode: {
      type: Boolean,
      default: false
    }
  },
  components: {
    TagsList,
    EditorMenuBar,
  },
  data(){
    return {
      actions: {
        primary: [],
        secondary: []
      },
      extended: false
    }
  },
  watch: {
    extensions(){
      this.actions = this.retrieveActions()
    }
  },
  methods: {
    alignmentIsActive(alignment){
      return isTextAlignActive(this.editor.state, alignment);
    },

    toggleExpandedBar(){
      this.extended = ! this.extended
    },
    retrieveActions(){
      let primaryActions = []
      let secondaryActions = []

      this.extensions.map(extensionName => {
        // retrieve primary action
        const pAction = this.getPrimaryAction(extensionName)

        // retrieve secondary action
        const sAction = this.getSecondaryAction(extensionName)

        // handle array and object of actions and add primary actions
        pAction && pAction.length ? primaryActions.push(...pAction): primaryActions.push(pAction)

        // add secondary actions
        secondaryActions.push(sAction)
      })

      return {
        primary: primaryActions,
        secondary: secondaryActions
      }
    },
    getPrimaryAction(extensionName){
      switch (extensionName) {
        case 'heading':
          return {
            type: 'menu',
            name: extensionName,
            icon: 'mdi-format-pilcrow'
          }

        case 'formatText':
          return {
            type: 'menu',
            name: extensionName,
            icon: 'mdi-format-text',
          }

        case 'image':
          return {
            type: 'btn',
            name: extensionName,
            icon: 'mdi-image',
            actionClick: (menuBarContext) => this.createImage(menuBarContext.commands.image),
            classCondition: (menuBarContext) => menuBarContext.isActive.image()
          }

        case 'history':
          return [
            {
              type: 'btn',
              name: extensionName,
              icon: 'mdi-undo',
              actionClick: (menuBarContext) => menuBarContext.commands.undo(),
              classCondition: null
            },
            {
              type: 'btn',
              name: extensionName,
              icon: 'mdi-redo',
              actionClick: (menuBarContext) => menuBarContext.commands.redo(),
              classCondition: null
            },
            {
              type: 'btn',
              name: 'eraser',
              icon: 'mdi-eraser',
              actionClick: this.clearContent,
              classCondition: () => false
            }
          ]

        case 'link':
          return {
            type: 'btn',
            name: extensionName,
            icon: 'mdi-link',
            actionClick: (menuBarContext) => this.createLink(menuBarContext.commands.custom_link),
            classCondition: (menuBarContext) => menuBarContext.isActive.custom_link()
          }

        case 'button':
          return {
            type: 'btn',
            name: extensionName,
            icon: 'mdi-button-cursor', // mdi-gamepad-square-outline
            actionClick: (menuBarContext) => this.createButton(menuBarContext.commands.custom_link),
            classCondition: (menuBarContext) => menuBarContext.isActive.custom_link()
          }

        case 'iframe':
          return {
            type: 'btn',
            name: extensionName,
            icon: 'mdi-application-brackets',
            actionClick: (menuBarContext) => this.createIframe(menuBarContext.commands.iframe),
            classCondition: (menuBarContext) => menuBarContext.isActive.iframe()
          }

        case 'codeView':
          return {
            type: 'btn',
            name: extensionName,
            icon: 'mdi-xml',
            actionClick: () => this.enableViewCode(),
            classCondition: () => this.isCodeViewMode
          }

        case 'textAlign':
          return {
            type: 'menu',
            name: extensionName,
            icon: 'mdi-text'
          }

        case 'tag':
          return {
            type: 'menu',
            name: extensionName,
            icon: 'mdi-tag'
          }

        default:
          return null
      }
    },
    getSecondaryAction(extensionName){
      switch (extensionName) {
        case 'blockquote':
          return {
            type: 'btn',
            name: extensionName,
            icon: 'mdi-format-quote-close',
            actionClick: (menuBarContext) => menuBarContext.commands.blockquote(),
            classCondition: (menuBarContext) => menuBarContext.isActive.blockquote()
          }

        case 'horizontalRule':
          return {
            type: 'btn',
            name: extensionName,
            icon: 'mdi-minus',
            actionClick: (menuBarContext) => menuBarContext.commands.horizontal_rule(),
            classCondition: (menuBarContext) => menuBarContext.isActive.horizontal_rule()
          }

        case 'orderedList':
          return {
            type: 'btn',
            name: extensionName,
            icon: 'mdi-format-list-numbered',
            actionClick: (menuBarContext) => menuBarContext.commands.ordered_list(),
            classCondition: (menuBarContext) => menuBarContext.isActive.ordered_list()
          }

        case 'bulletList':
          return {
            type: 'btn',
            name: extensionName,
            icon: 'mdi-format-list-bulleted',
            actionClick: (menuBarContext) => menuBarContext.commands.bullet_list(),
            classCondition: (menuBarContext) => menuBarContext.isActive.bullet_list()
          }

        default:
          return null
      }
    },
    createLink(command){
      this.$emit('create-link', command)
    },
    createImage(command){
      this.$emit('create-image', command)
    },
    createButton(command){
      this.$emit('create-button', command)
    },

    createIframe (command) {
      this.$emit('create-iframe', command)
    },

    enableViewCode (command) {
      this.$emit('enable-view-code', command)
    },

    selectTag(menuBarContext, tagSelected){
      menuBarContext.commands.tag(tagSelected)

      // add a space after the command is executed.
      const transaction = this.editor.state.tr.insertText(' ')
      this.editor.view.dispatch(transaction)

      this.editor.focus()
    },

    clearContent() {
      this.editor.clearContent(true)
      this.editor.focus()
    },
  }
}
</script>

<style lang="scss">
.pro-editor__toolbar {
  .v-toolbar {
    display: flex;
    height: auto !important;
    padding: 5px;

    .v-toolbar__content {
      height: auto !important;
      flex-wrap: wrap;
      padding: 0;
      width: 100%;
    }
  }
}
</style>

