<template>
  <v-tabs centered show-arrows>
    <v-tabs-slider></v-tabs-slider>

    <v-tab @click="onTab('me-tickets')">
      {{ $t('me-tickets') }}
    </v-tab>
    <v-tab @click="onTab('me-library')">
      {{ $t('me-library') }}
    </v-tab>
    <v-tab @click="onTab('me-bookmarks-users')">
      {{ $t('me-people') }}
    </v-tab>
    <!--      <v-tab @click="onTab('me-chats')">-->
    <!--        My Chats-->
    <!--      </v-tab>-->
  </v-tabs>
</template>

<script>
export default {
  name: 'MeTabs',
  // watch: {
  //   tab:{
  //     immediate: true,
  //     handler(){
  //       this.$emit('show-tab-item', this.tab)
  //     }
  //
  //   }
  // },
  methods: {
    onTab(tabType){
      this.$emit(`show-tab-item`, tabType)
    }
  },
  created(){
    // fire off the first tab event.
    this.$emit(`show-tab-item`, 'me-tickets')

  }
}
</script>
