<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <v-row>
          <v-col>
            <three-d-id />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="10">
        <nuxt-child :key="$route.fullPath"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ThreeD",
  layout: "nutshell",
  scrollToTop: true,
  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },
}
</script>

