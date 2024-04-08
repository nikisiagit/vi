<template>
  <iframe class="iframe" :src="src"></iframe>
</template>

<script>
export default {
  name: 'IframeView',
  props: ['node', 'updateAttrs', 'view'],
  computed: {
    src: {
      get () {
        return this.node.attrs.src
      },
      set (src) {
        this.updateAttrs({
          src
        })
      }
    },
    height: {
      get () {
        return this.node.attrs.height || '15rem'
      },
      set (height) {
        this.updateAttrs({
          height
        })
      }
    }
  }
}
</script>

<style lang="scss">
.iframe {
  width: 50%;
  height: 15rem;
  border: 0;
  border-radius: 5px;
}
</style>
