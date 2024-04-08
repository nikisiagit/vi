<template>
  <v-list-item two-line>
    <v-list-item-content>
      <v-list-item-title>{{ name }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('name') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ListItem",

  props: {
    tagId: {
      type: String,
      required: true,
    },
  },

  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    tagId: {
      handler () {
        if (! this.loaded && ! this.loading) {
          this.load();
        }
      },
    },
  },

  methods: {
    ...mapActions({
      loadTagWithTagId: 'apps/admin/tags/loadTagWithTagId',
    }),

    async load () {
      return await (this.tagId) ? this.loadTagWithTagId(this.tagId) : undefined;
    },
  },

  computed: {
    ...mapGetters({
      tagWithTagId: 'apps/admin/tags/tagWithTagId',
    }),

    tag () {
      return (this.tagId) ? this.tagWithTagId(this.tagId) : undefined;
    },

    loading () {
      return (this.tag) ? this.tag.loading : false;
    },

    loaded () {
      return (this.tag) ? this.tag.loaded : false;
    },

    name () {
      return (this.tag) ? this.tag.name : undefined;
    }
  },

}
</script>
