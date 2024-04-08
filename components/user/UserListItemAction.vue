<template>
  <v-list-item-action>
    <v-btn v-if="(! bookmarkCreated && ! bookmarkId ) || bookmarkRemoved" icon @click="addUserBookmark" :loading="bookmarkCreating">
      <v-icon>mdi-account-plus</v-icon>
    </v-btn>

    <v-btn v-else icon @click="removeUserBookmark" :loading="bookmarkRemoving" >
      <v-icon>mdi-account-minus</v-icon>
    </v-btn>
  </v-list-item-action>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UserListItemAction",
  props: {
    userId: {
      type: Object
    },
    bookmarkId: {
      type: String

    }
  },
  data(){
    return {
      executionArn: undefined,
    }

  },
  computed: {
    ...mapGetters({
      creatingBookmarkWithExecutionArn: 'me/bookmarks/creatingBookmarkWithExecutionArn',
      removingBookmarkWithExecutionArn: 'me/bookmarks/removingBookmarkWithExecutionArn',
    }),

    creatingBookmark () {
      return (this.executionArn) ? this.creatingBookmarkWithExecutionArn(this.executionArn) : undefined;
    },

    bookmarkCreating () {
      return this.creatingBookmark?.creating;
    },

    bookmarkCreated () {
      return this.creatingBookmark?.created;
    },

    removingBookmark () {
      return (this.executionArn) ? this.removingBookmarkWithExecutionArn(this.executionArn) : undefined;
    },

    bookmarkRemoving () {
      return this.removingBookmark?.removing;
    },

    bookmarkRemoved () {
      return this.removingBookmark?.removed;
    },
  },
  methods: {
    ...mapActions({
      createBookmark: 'me/bookmarks/createBookmark',
      removeBookmark: 'me/bookmarks/removeBookmark'
    }),

    async addUserBookmark(){
      const {executionArn} = await this.createBookmark({
        itemType: "user",
        itemId: this.userId,
      })

      this.executionArn = executionArn;
    },

    async removeUserBookmark(){
      const {executionArn} = await this.removeBookmark(this.bookmarkId)

      this.executionArn = executionArn;
    }

  }
}
</script>

