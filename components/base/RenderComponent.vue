<template>
  <v-slide-y-transition>
    <slot v-if="show"></slot>
  </v-slide-y-transition>
</template>

<script>

export default {
  name: 'RenderComponent',
  props: {
    show: {
      type: Boolean,
      default: false
    }

  }

}
</script>

