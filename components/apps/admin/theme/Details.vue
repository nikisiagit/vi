<template>
  <v-card :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-palette</v-icon>
      {{ $t('theme-details') }}

      <v-spacer />

      <v-btn rounded :loading="loading" :disabled="loading" @click="reload">
        <v-icon left>mdi-refresh</v-icon>{{ $t('reload') }}
      </v-btn>
    </v-card-title>

    <v-card-subtitle>{{ $t('theme-details-subtitle') }}</v-card-subtitle>

    <v-card-text>
      <v-list two-line>

        <!-- list item for this Theme -->
        <apps-admin-theme-list-item :name="name" />

      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Details",

  props: {
    // the name of the Theme  - i.e. `default`
    name: {
      type: String,
      required: true,
    }
  },

  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    name: {
      handler () {
        if (! this.loaded && ! this.loading) {
          this.load();
        }
      },
    }
  },

  methods: {
    ...mapActions({
      loadThemeWithName: 'apps/admin/themes/loadThemeWithName',
    }),

    async load () {
      return await (this.name) ? this.loadThemeWithName(this.name) : undefined;
    },

    async reload () {
      return await this.load();
    },
  },

  computed: {
    ...mapGetters({
      themeWithName: 'apps/admin/themes/themeWithName',
    }),

    /**
     * Return the Theme.
     *
     * @return {*|undefined}
     */
    theme () {
      return (this.name) ? this.themeWithName(this.name) : undefined;
    },

    /**
     * Return the loading state of the Theme.
     *
     * @return {*|boolean}
     */
    loading () {
      return (this.theme) ? this.theme.loading : false;
    },

    /**
     * Return the loaded state of the Theme.
     *
     * @return {*|boolean}
     */
    loaded () {
      return (this.theme) ? this.theme.loaded : false;
    },
  },
}
</script>
