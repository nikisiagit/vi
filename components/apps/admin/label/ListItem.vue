<template>
  <v-list-item v-bind="$attrs" v-on="$listeners">
    <v-list-item-avatar>
      <v-avatar>
        <v-icon>mdi-format-title</v-icon>
      </v-avatar>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ labelId }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('label-id') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ListItem",

  props: {
    labelId: {
      type: String,
      required: true,
    }
  },

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    labelId: {
      handler () {
        if (! this.loaded && ! this.loading) {
          this.load();
        }
      }
    },
  },

  methods: {
    ...mapActions({
      loadLabelWithLabelId: 'apps/admin/labels/loadLabelWithLabelId',
    }),

    async load() {
      return await (this.labelId) ? this.loadLabelWithLabelId(this.labelId) : undefined;
    },
  },

  computed: {
    ...mapGetters({
      labelWithLabelId: 'apps/admin/labels/labelWithLabelId',
    }),

    label() {
      return (this.labelId) ? this.labelWithLabelId(this.labelId) : undefined;
    },

    name () {
      return (this.label) ? this.label.name : undefined;
    },

    loaded() {
      return (this.label) ? this.label.loaded : false;
    },

    loading() {
      return (this.label) ? this.label.loading : false;
    },

    languageId() {
      return (this.label) ? this.label.languageId : undefined;
    },

    text() {
      return (this.label) ? this.label.text : undefined;
    },
  }
}
</script>
