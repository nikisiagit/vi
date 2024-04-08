<!--

Apps Admin - Themes Select

A smart component that enables an Admin to select a Theme from the Themes that belong to the
Venue/Partition.
-->
<template>
  <v-select
    v-model="themeIdLocal"
    :loading="loading"
    clearable
    :items="themes"
    item-text="name"
    item-value="themeId"
    :label="$attrs['label'] ? $attrs['label']: themeLabel"
    :hint="$attrs['hint'] ? $attrs['hint']: themeHint"
    required
    persistent-hint
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-slot:selection="{ item }">
      <v-list-item two-line>
        <v-list-item-avatar class="gradient-light-dark-theme">
          <v-icon :color="`${item.light && item.light.primary || 'transparent'}`">
            mdi-circle
          </v-icon>

          <v-icon class="ml-1" :color="`${item.dark && item.dark.primary || 'transparent'}`">
            mdi-circle
          </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ $t(item.name) }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.themeId }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <template v-slot:item="{item, on, attrs}">
      <v-list-item two-line v-bind="attrs" v-on="on">
        <v-list-item-avatar class="gradient-light-dark-theme">
          <v-icon large :color="`${item.light && item.light.primary || 'transparent'}`">
            mdi-circle
          </v-icon>

          <v-icon large class="ml-1" :color="`${item.dark && item.dark.primary || 'transparent'}`">
            mdi-circle
          </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ $t(item.name) }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.themeId }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-select>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Select",

  props: {
    value: {
      type: String
    },
  },

  watch: {
    value: {
      immediate: true,
      handler () {
        this.themeIdLocal = this.value;
      }
    }
  },

  data: () => ({
    themeIdLocal: undefined,
  }),

  async created() {
    this.themeId = this.value

    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/themes/load',
      reload: 'apps/admin/themes/reload',
    }),
  },
  computed: {
    ...mapGetters({
      loading: 'apps/admin/themes/loading',
      loaded: 'apps/admin/themes/loading',
      themes: 'apps/admin/themes/themes',
    }),

    themeLabel () {
      return this.$i18n.t('theme-label');
    },

    themeHint () {
      return this.$i18n.t('theme-hint');
    },
  }
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
