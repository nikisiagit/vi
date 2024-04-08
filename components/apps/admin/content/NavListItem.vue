<template>
  <v-list-item class=""
               two-line
               nuxt exact :to="{name: 'apps-admin-contents-contentId', params: {contentId: contentId}}">
    <v-list-item-avatar>
      <v-icon>mdi-post</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ name }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('content') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NavListItem",

  props: {
    contentId: {
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
    contentId: {
      handler () {
        if (! this.loaded && ! this.loading) {
          this.load();
        }
      }
    }
  },

  methods: {
    ...mapActions({
      loadContentWithContentId: 'apps/admin/contents/loadContentWithContentId',
    }),

    async load () {
      return await (this.contentId) ? this.loadContentWithContentId(this.contentId) : undefined;
    },
  },

  computed: {
    ...mapGetters({
      contentWithContentId: 'apps/admin/contents/contentWithContentId',
    }),

    content () {
      return (this.contentId) ? this.contentWithContentId(this.contentId) : undefined;
    },

    loading () {
      return (this.content) ? this.content.loading : false;
    },

    loaded () {
      return (this.content) ? this.content.loaded : false;
    },

    name () {
      return (this.content) ? this.content.name : undefined;
    },
  }
}
</script>
