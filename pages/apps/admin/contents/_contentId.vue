<template>
  <v-card>
    <!-- summary -->
    <v-list subheader>
      <v-subheader>{{ $t('summary') }}</v-subheader>

      <v-list-item two-line>
        <v-list-item-avatar>
          <v-icon>mdi-post</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ title }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('content') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- /summary -->

    <v-divider />
    <v-list subheader>
      <v-subheader>{{ $t('settings') }}</v-subheader>

      <!-- title -->
      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-format-title</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ title }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('content-title') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- body (if contentType === 'post') -->
      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-format-text</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ bodyId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('content-body') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- authorId -->
      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-text-account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ authorId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('content-author-id') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- description -->
      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-format-text</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ descriptionId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('content-description') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- tagIds -->
      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-tag-multiple</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ tagIds }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('content-tags') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider />
    <v-list subheader>
      <v-subheader>{{ $t('advanced') }}</v-subheader>

      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-delete</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ $t('delete') }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('content-delete') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-account-clock</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ $t('auditing') }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('content-auditing') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <!-- content -->
<!--    <pre>{{ content }}</pre>-->
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ViewContent",
  layout: 'admin',

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    authorId: {
      handler() {
        if (! this.authorLoaded && ! this.authorLoading) {
          this.loadAuthor();
        }
      }
    },
  },


  methods: {
    ...mapActions({
      loadContentWithContentId: 'apps/admin/contents/loadContentWithContentId',
      loadUserWithUserId: 'apps/admin/users/loadUserWithUserId',
    }),

    async load () {
      return await (this.contentId) ? this.loadContentWithContentId(this.contentId) : undefined;
    },

    async loadAuthor () {
      return await (this.authorId) ? this.loadUserWithUserId(this.authorId) : undefined;
    },
  },

  computed: {
    ...mapGetters({
      contentWithContentId: 'apps/admin/contents/contentWithContentId',
      userWithUserId: 'apps/admin/users/userWithUserId',
    }),

    contentId () {
      return this.$route.params.contentId || undefined;
    },

    content () {
      return (this.contentId) ? this.contentWithContentId(this.contentId) : undefined;
    },

    name () {
      return (this.content) ? this.content.name : undefined;
    },

    title () {
      return (this.content) ? this.content.title : undefined;
    },


    authorId () {
      return (this.content) ? this.content.authorId : undefined;
    },

    author () {
      return (this.authorId) ? this.userWithUserId(this.authorId) : undefined;
    },

    authorLoaded () {
      return (this.author) ? this.author.loaded : false;
    },

    authorLoading () {
      return (this.author) ? this.author.loading : false;
    },


    bodyId () {
      return (this.content) ? this.content.bodyId : undefined;
    },

    descriptionId () {
      return (this.content) ? this.content.descriptionId : undefined;
    },

    tagIds () {
      return (this.content) ? this.content.tagIds : undefined;
    }
  }
}
</script>
