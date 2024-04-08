<template>
  <v-card>

    <v-toolbar>
      <v-icon left>mdi-tag</v-icon>
      <v-toolbar-title>{{ name }}</v-toolbar-title>
    </v-toolbar>

    <v-list>
      <!-- name -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ name }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('name') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- type -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ type }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('type') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- partition -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ partition }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('partition') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- createdAt -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ createdAt }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('created-at') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- lastModifiedAt -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ lastModifiedAt }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('last-modified-at') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

    </v-list>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Details",

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

    name () {
      return (this.tag) ? this.tag.name : undefined;
    },

    type () {
      return (this.tag) ? this.tag.type : undefined;
    },

    partition () {
      return (this.tag) ? this.tag.partition : undefined;
    },

    createdAt () {
      return (this.tag) ? this.tag.createdAt : undefined;
    },

    lastModifiedAt () {
      return (this.tag) ? this.tag.lastModifiedAt : undefined;
    },


    loading () {
      return (this.tag) ? this.tag.loading : false;
    },

    loaded () {
      return (this.tag) ? this.tag.loaded : false;
    },
  },
}
</script>

