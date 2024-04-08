<template>
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-toolbar flat>
      <v-icon left>mdi-animation-play</v-icon>

      <v-toolbar-title>
        {{ $t('contents-list') }}
      </v-toolbar-title>

      <v-spacer />

      <v-btn icon @click="reload" :loading="loading" :disabled="loading">
        <v-icon>mdi-reload</v-icon>
      </v-btn>

    </v-toolbar>

    <v-container fluid>
      <v-row>
        <v-col>
          <v-list>
            <apps-admin-content-nav-list-item v-for="content in contents"
                                              :key="content.contentId"
                                              :content-id="content.contentId" />
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
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/contents/load',
      reload: 'apps/admin/contents/reload',
    })
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/contents/loading',
      loaded: 'apps/admin/contents/loaded',
      contents: 'apps/admin/contents/contents',
      error: 'apps/admin/contents/error',
      numberOfContents: 'apps/admin/contents/numberOfContents',
    }),
  }
}
</script>

