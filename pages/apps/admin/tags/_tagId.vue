<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <apps-admin-tag-details :tag-id="tagId" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "TagView",
  layout: 'admin',

  async created () {

  },

  computed: {
    ...mapGetters({

    }),

    tagId () {
      return this.$route.params.tagId || undefined;
    },

  }

}
</script>
