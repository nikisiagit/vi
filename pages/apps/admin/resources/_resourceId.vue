<template>
  <v-container fluid>
    <v-row>
      <v-col>
<!--        {{ resourceId }}-->
        <apps-admin-resource-details :resource-id="resourceId"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Resource",
  layout: 'admin',

  async created () {
    // if (! this.loaded && ! this.loading) {
    //   await this.load();
    // }
  },

  computed: {
    ...mapGetters({

    }),

    resourceId () {
      return this.$route.params.resourceId || undefined;
    },
  }
}
</script>
