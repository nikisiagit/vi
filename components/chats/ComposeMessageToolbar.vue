<template>
  <v-toolbar v-bind="toolbarAttributes" :disabled="disabled">
    <!-- Actions -->
    <slot name="left-actions"></slot>
    <!-- -->

    <div class="ml-auto">
      <slot name="right-actions"></slot>
    </div>

  </v-toolbar>
</template>


<script>
export default {
  name: 'ComposeMessageToolbar',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    toolbarAttributes: {
      type: Object,
      default: () => ({})
    },
  },
  data(){
    return {

    }
  },

  methods: {

  }
}
</script>
