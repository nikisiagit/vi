export default {
  data(){
    return {
      cmInstance: null,
      isCodeViewMode: false
    }
  },
  computed: {
    codemirror(){
      const codeView = this.toolbarExtensions.find(e => e === 'codeView');
      if (codeView) {
        const { codemirror } = this.retrieveCodeViewConfig();

        // it returns the library to use for initialization
        return codemirror
      }

      return null
    }
  },
  watch: {
    isCodeViewMode(val) {
      if (val) {
        const { codemirrorOptions } = this.retrieveCodeViewConfig();
        const isDark = this.$vuetify.theme.isDark
        const theme = isDark ? codemirrorOptions.darkTheme: 'default'

        this.$nextTick(() => !this.cmInstance && this.initCodemirror(theme));
      } else { // update editor content
        if (this.cmInstance) {
          const content = this.cmInstance.getValue();
          this.editor.setContent(content, true /* emitUpdate */);
          this.destroyCodemirror();
        }
      }
    },

    '$vuetify.theme.isDark': function(isDark){
      if (this.isCodeViewMode && this.codemirror) {
        const { codemirrorOptions } = this.retrieveCodeViewConfig();
        const theme = isDark ? codemirrorOptions.darkTheme: 'default'

        this.destroyCodemirror()
        this.initCodemirror(theme)
      }
    }

  },
  methods: {
    initCodemirror(theme) {
      if (this.isCodeViewMode && this.codemirror) {
        const { codemirrorOptions } = this.retrieveCodeViewConfig();

        // merge options
        const cmOptions = {
          ...codemirrorOptions,
          readOnly: false,
          spellcheck: false,
        };

        if (theme && theme !== 'default') {
          cmOptions.theme = theme
        }

        this.cmInstance = this.codemirror.fromTextArea(this.$refs.cmTextArea, cmOptions);
        this.cmInstance.setValue(this.editor.getHTML()); // init content
        this.formatCode();
      }
    },

    destroyCodemirror() {
      const element = this.cmInstance.doc.cm.getWrapperElement();
      element && element.remove && element.remove();
      this.cmInstance = null;
    },

    formatCode() {
      const cm = this.cmInstance;
      cm.execCommand('selectAll');
      const selectedRange = {
        from: cm.getCursor(true),
        to: cm.getCursor(false),
      };
      cm.autoFormatRange(selectedRange.from, selectedRange.to);
      cm.setCursor(0);
    }
  }
}
