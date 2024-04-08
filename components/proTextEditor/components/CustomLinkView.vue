<template>
  <a
    :class="{ 'v-btn v-size--default': this['data-link-type'] === 'button'}"
    :style="this['data-link-type'] === 'button' ? `background: ${this['data-color']}`: null"
    :href="href"
    :target="target"
    :rel="rel"
    @click.prevent=""
  >{{ text }}</a>
</template>

<script>
export default {
  name: 'CustomLinkView',
  props: ['node', 'updateAttrs', 'view'],
  computed: {
    href: {
      get () {
        return this.node.attrs.href
      },
      set (href) {
        this.updateAttrs({
          href
        })
      }
    },
    target: {
      get () {
        return this.node.attrs.target
      },
      set (target) {
        this.updateAttrs({
          target
        })
      }
    },
    rel: {
      get () {
        return this.node.attrs.rel
      },
      set (rel) {
        this.updateAttrs({
          rel
        })
      }
    },
    text: {
      get () {
        return this.node.attrs.text
      },
      set (text) {
        this.updateAttrs({
          text
        })
      }
    },
    class: {
      get () {
        return this.node.attrs.class
      },
      set (cls) {
        this.updateAttrs({
          class: cls
        })
      }
    },
    'data-color': {
      get () {
        return this.node.attrs['data-color']
      },
      set (color) {
        this.updateAttrs({
          'data-color': color
        })
      }
    },
    'data-link-type': {
      get () {
        return this.node.attrs['data-link-type']
      },
      set (linkType) {
        this.updateAttrs({
          'data-link-type': linkType
        })
      }
    }
  }
}
</script>
