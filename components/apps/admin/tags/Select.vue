<template>
  <v-select
    v-model="tagIdsLocal"
    :loading="loading"
    :items="tags"
    item-text="name"
    item-value="tagId"
    :label="$attrs['label'] ? $attrs['label']: tagsLabel"
    :hint="$attrs['hint'] ? $attrs['hint']: tagsHint"
    clearable
    required
    persistent-hint
    v-bind="$attrs"
    v-on="$listeners"
    multiple
  />
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Select",


  props: {
    tagIds: {
      type: Array,
      required: false,
      default: () => ([])
    },
  },

  watch : {
    tagIds: {
      immediate: true,
      handler () {
        this.tagIdsLocal = this.tagIds;
      }
    }
  },

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  data: () => ({
    tagIdsLocal: [],
  }),

  methods: {
    ...mapActions({
      load: 'apps/admin/tags/load',
    })
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/tags/loading',
      loaded: 'apps/admin/tags/loaded',
      tags: 'apps/admin/tags/tags',
    }),

    tagsLabel () {
      return this.$i18n.t('tags-label');
    },

    tagsHint () {
      return this.$i18n.t('tags-hint');
    },
  }
}
</script>
