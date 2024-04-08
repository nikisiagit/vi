<template>
  <v-app>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'public',

  // watch: {
  //   '$route.params': {
  //     deep: true,
  //     immediate: true,
  //     handler(params){
  //       if (params?.eventId) {
  //         // this.$nextTick(() => {
  //         //   this.$vuetify.theme.themes.light.primary = '#79D3CA'
  //         //   this.$vuetify.theme.themes.dark.primary = '#79D3CA'
  //         // })
  //       } else {
  //         // change theme to Pro theme
  //         this.$nextTick(() => {
  //           this.$vuetify.theme.themes.light.primary = '#121212'
  //           this.$vuetify.theme.themes.dark.primary = '#121212'
  //         })
  //
  //       }
  //     }
  //   }
  // },
}
</script>
