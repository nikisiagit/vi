<template>

  <v-list-item>

    <v-list-item-avatar size="4rem">
      <base-profile-preview
        :userId="user.userId"
        :fullname="user.fullname"
        :headline="user.headline"
        :avatar="user.avatar" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ user.fullname }}</v-list-item-title>
      <v-list-item-subtitle>{{ user.headline }}</v-list-item-subtitle>
    </v-list-item-content>

    <user-list-item-action :user-id="user.userId" :bookmark-id="bookmarkId"></user-list-item-action>

<!--    <v-list-item-action v-if="person.addBookmark && contactAdded">-->
<!--    <v-list-item-action>-->
<!--&lt;!&ndash;      <v-btn icon v-if="contactAdded">&ndash;&gt;-->
<!--      <v-btn icon>-->
<!--        <v-icon >mdi-message</v-icon>-->
<!--      </v-btn>-->
<!--    </v-list-item-action>-->


<!--    &lt;!&ndash; ConfirmationDialog component &ndash;&gt;-->
<!--    <v-dialog v-model="confirmationDialog" max-width="800px">-->

<!--      <me-bookmark-create-bookmark @created="createdBookmark" @close="confirmationDialog = false"></me-bookmark-create-bookmark>-->

<!--    </v-dialog>-->

  </v-list-item>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UserListItem",
  props: {
    user: {
      type: Object
    },
  },
  data() {
    return{
      bookmarkId: null
    }
  },
  watch: {
    meBookmarks(){
      this.bookmarkId = this.findUserIsBookmarked(this.user.userId)
    }
  },
  computed: {
    ...mapGetters({
      meBookmarks: 'me/bookmarks/bookmarks'
    }),
  },
  methods: {
    findUserIsBookmarked (userId) {
      return this.meBookmarks.find(b => b.itemId === userId)?.bookmarkId
    },

  }
}
</script>

