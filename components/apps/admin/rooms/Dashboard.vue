<template>
  <v-card rounded :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      dashboard
    </v-card-title>

  </v-card>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Dashboard",

}

</script>
