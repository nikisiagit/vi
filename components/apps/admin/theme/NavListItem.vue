<template>
  <v-list-item two-line
               ripple
               :to="{name: 'apps-admin-themes-themeId', params: {themeId: themeId}}">

    <v-list-item-avatar class="gradient-light-dark-theme">
      <v-icon large :color="`${lightPrimary || 'transparent'}`">
        mdi-circle
      </v-icon>
      <v-icon large class="ml-1" :color="`${darkPrimary || 'transparent'}`">
        mdi-circle
      </v-icon>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ themeId }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('theme') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NavListItem",
  props: {
    // the name of the Theme  - i.e. `default`
    themeId: {
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
      loadThemeWithThemeId: 'apps/admin/themes/loadThemeWithThemeId',
    }),

    async load () {
      return await (this.themeId) ? this.loadThemeWithThemeId(this.themeId) : undefined;
    },

    async reload () {
      return await this.load();
    },
  },

  computed: {
    ...mapGetters({
      themeWithThemeId: 'apps/admin/themes/themeWithThemeId',
    }),

    /**
     * Return the Theme.
     *
     * @return {*|undefined}
     */
    theme () {
      return (this.themeId) ? this.themeWithThemeId(this.themeId) : undefined;
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

    dark () {
      return (this.theme) ? this.theme.dark : undefined;
    },

    light () {
      return (this.theme) ? this.theme.light : undefined;
    },

    darkPrimary () {
      return (this.dark) ? this.dark?.primary : undefined;
    },

    lightPrimary () {
      return (this.light) ? this.light?.primary : undefined;
    }
  },
}
</script>

<style lang="scss" scoped>
.gradient-light-dark-theme {
  background: linear-gradient(
      to right,
      #FFFFFF 0%,
      #FAFAFA 47.5%,
      #212121 47.5%,
      #000000 100%
  );
}
</style>
