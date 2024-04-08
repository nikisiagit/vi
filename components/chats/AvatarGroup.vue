<template>
  <div class="d-flex mr-3">
    <v-btn
      fab
      color="primary"
      class="mr-n2 pa-5"
      max-height="35"
      max-width="35"
    >
      <v-icon >mdi-plus</v-icon>
    </v-btn>

    <v-btn
      fab
      color="primary"
      class="mr-n2"
      style="padding: 1.4rem 1.5rem 1.4rem 1.4rem"
      max-height="35"
      max-width="35"
      v-for="(avatar, i) in avatars"
      @click="handleClick(i)"
      :style="i === indexSelected ? { zIndex: 1 }: null"
      :key="i"
    >
      <base-avatar
        :avatar="avatar.src"
        :label="avatar.label"
        size="xs"
        :status-indicator="true"
      ></base-avatar>
    </v-btn>

  </div>
</template>

<script>
export default {
  name: 'AvatarGroup',
  data(){
    return {
      indexSelected: null,
      avatars: [
        {
          src: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          label: 'Random 1'
        },
        // {
        //   src: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        //   label: 'Random 2'
        // },
        {
          src: 'https://ca.slack-edge.com/TJGTBEENN-U01PB326FQA-5d1edc104af4-48',
          label: 'Random 3'
        },
        {
          src: null,
          label: 'Luis Carbajal'
        }
      ]
    }
  },
  methods: {
    handleClick(index){
      this.indexSelected = index
    }
  }
}
</script>
