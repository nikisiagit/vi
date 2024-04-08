<!--
[PRO-240] Venue App (Admin) - Venue - Title

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-240

A smart component that renders the Admin Venue App Title.
-->
<template>
  <v-card :loading="loading" rounded>

    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title and actions -->
    <v-card-title>
      <v-icon left>mdi-store</v-icon>
      {{ $t('admin-venue-title') }}

      <v-spacer />

      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon
                 v-bind="attrs"
                 v-on="on"
                 :loading="loading"
                 :disabled="loading"
                 @click="reload">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </template>
        {{ $t('reload') }}
      </v-tooltip>
    </v-card-title>

    <!-- subtitle -->
    <v-card-subtitle>{{ $t('admin-venue-subtitle') }}</v-card-subtitle>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Title",

  async created () {
    if (this.initialised) {
      if (! this.loaded && ! this.loading) {
        await this.load();
      }
    }
  },

  watch: {
    initialised: {
      immediate: true,
      handler () {
        if (this.initialised) {
          if (! this.loaded && ! this.loading) {
            this.load();
          }
        }
      }
    }
  },

  methods: {
    ...mapActions({
      load: 'venue/load',
      reload: 'venue/reload',
    })
  },

  computed: {
    ...mapGetters({
      venue: 'apps/admin/venue/venue',
      initialised: 'apps/admin/venue/initialised',
      loaded: 'apps/admin/venue/loaded',
      loading: 'apps/admin/venue/loading',
    }),
  },
}
</script>

