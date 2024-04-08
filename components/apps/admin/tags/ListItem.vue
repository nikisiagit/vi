<template>
  <v-dialog v-model="dialog" fullscreen>
    <template v-slot:activator="{ on, attrs}">
      <v-list-item v-bind="attrs" v-on="on" ripple>
        <v-list-item-avatar>
          <v-icon>mdi-tag-multiple</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ $t('tags') }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('tags') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-card>
      <v-toolbar>
        <v-btn icon @click="dialog = false;">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{ $t('tags') }} ({{ numberOfTags }})</v-toolbar-title>
        <v-spacer />

        <v-btn icon @click="reload" :loading="loading">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>

        <v-dialog fullscreen v-model="createDialog">
          <template v-slot:activator="{ on, attrs}">
            <v-btn icon v-bind="attrs" v-on="on" >
              <v-icon>mdi-tag-plus</v-icon>
            </v-btn>
          </template>
          <apps-admin-tags-create-tag @close="createDialog = false;"/>
        </v-dialog>

      </v-toolbar>

      <!-- the error -->
      <template v-if="error">
        <v-container>
          <v-row>
            <v-col>
              <v-alert type="error">
                {{ error }}
              </v-alert>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <!-- the list of Tags -->
      <v-container fluid>
        <v-row>
          <v-col>
            <apps-admin-tags-list />
          </v-col>
        </v-row>
      </v-container>

    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ListItem",

  data: () => ({
    dialog: false,
    createDialog: false,
  }),

  async created () {
    if (! this.loading && ! this.loaded) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/tags/load',
      reload: 'apps/admin/tags/reload',
    }),
  },

  computed: {
    ...mapGetters({
      tags: 'apps/admin/tags/tags',
      numberOfTags: 'apps/admin/tags/numberOfTags',
      loading: 'apps/admin/tags/loading',
      loaded: 'apps/admin/tags/loaded',
      error: 'apps/admin/tags/error',
    })
  },

}
</script>
