<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <apps-admin-theme-details :name="name"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ThemeId",
  layout: 'admin',

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      loadThemeWithThemeId: 'apps/admin/themes/loadThemeWithThemeId',
    }),

    async load () {
      return await (this.themeId) ? this.loadThemeWithThemeId(this.themeId) : undefined;
    },
  },

  computed: {
    ...mapGetters({
      themeWithThemeId: 'apps/admin/themes/themeWithThemeId',
    }),

    themeId () {
      return this.$route.params.themeId || undefined;
    },

    theme () {
      return (this.themeId) ? this.themeWithThemeId(this.themeId) : undefined;
    },

    loaded () {
      return (this.theme) ? this.theme.loaded : false;
    },

    loading () {
      return (this.theme) ? this.theme.loading : false;
    },
  },

}
</script>
