<!--
Admin Index/Home Page
-->
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4">
        <apps-admin-nav-list />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "index",
  layout: 'default',
  computed: {
    ...mapGetters({
      loaded: 'apps/admin/loaded',
      loading: 'apps/admin/loading',
    }),
  },
}
</script>
