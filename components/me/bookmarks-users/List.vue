<template>
  <v-list flat>
    <v-list-item-title class="text-center pa-4" v-if="! meBookmarks.length">
      <v-icon left>mdi-information</v-icon> {{ $t('me-people-label-empty') }}.
    </v-list-item-title>

    <me-bookmark-user-list-item v-else v-for="bookmark in meBookmarks"
                          :user-id="bookmark.itemId"
                          :bookmark-id="bookmark.bookmarkId"
                          :key="bookmark.bookmarkId"
    />
  </v-list>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "BookmarksUsersList",
  data(){
    return {


    }
  },
  async created() {
    await this.loadBookmarkWithType('user')

    // if (! this.loaded && ! this.loading) {
    //   await this.load();
    // }
  },
  computed: {
    ...mapGetters({
      meBookmarks: 'me/bookmarks/bookmarks',
      loading: 'me/bookmarks/loading',
      loaded: 'me/bookmarks/loaded',
    })

  },
  methods: {
    ...mapActions({
      load: 'me/bookmarks/load',
      loadBookmarkWithType: 'me/bookmarks/loadBookmarkWithType'
    }),
  }
}
</script>
