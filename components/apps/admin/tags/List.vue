<!--
Venue Admin - Tags List

This smart component renders a list of the Tags in the Partition.
-->
<template>

  <v-card :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-toolbar flat>
      <v-icon left>mdi-tag-multiple</v-icon>

      <v-toolbar-title>
        {{ $t('tags') }} ({{ numberOfTags }})
      </v-toolbar-title>

      <v-spacer />

      <v-btn icon flat :loading="loading" :disabled="loading" @click="reload">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>

      <v-dialog v-model="createTagDialog" overlay-color="accent" >
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ml-3" icon v-bind="attrs" v-on="on">
            <v-icon>mdi-tag-plus</v-icon>
          </v-btn>
        </template>
        <apps-admin-tags-create-tag @close="createTagDialog = false;"/>
      </v-dialog>


    </v-toolbar>

    <v-container fluid>
      <v-row>
        <v-col>
          <v-list>
            <apps-admin-tag-nav-list-item
              v-for="tag in tags"
              :key="tag.tagId"
              :tag-id="tag.tagId" />
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "List",

  async created () {
    if (! this.loading && ! this.loaded) {
      await this.load();
    }
  },

  data: () => ({
    createTagDialog: false,
  }),

  methods: {
    ...mapActions({
      load: 'apps/admin/tags/load',
      reload: 'apps/admin/tags/reload',
    }),
  },

  computed: {
    ...mapGetters({
      tags: 'apps/admin/tags/tags',
      loading: 'apps/admin/tags/loading',
      loaded: 'apps/admin/tags/loaded',
      numberOfTags: 'apps/admin/tags/numberOfTags',
    })
  }
}
</script>

