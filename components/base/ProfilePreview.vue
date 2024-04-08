<template>
  <v-menu
    open-on-hover
    bottom
    offset-y
    :close-on-content-click="false">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <base-avatar
          size="sm"
          :label="fullname"
          :avatar="avatarImage"
          :color="avatarColour"
          :icon="avatarIcon"></base-avatar>
      </v-btn>
    </template>
    <v-card rounded="lg">
      <v-list>
        <v-list-item class="pl-1">
          <v-list-item-avatar size="4rem" >
            <base-avatar
              size="sm"
              :label="fullname"
              :avatar="avatarImage"
              :color="avatarColour"
              :icon="avatarIcon"
            ></base-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h6">{{ fullname }}</v-list-item-title>
            <v-list-item-subtitle>{{ headline }}</v-list-item-subtitle>
          </v-list-item-content>

          <user-list-item-action :user-id="userId"  :bookmark-id="bookmarkId"></user-list-item-action>

        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn :to="`/users/${userId}`" elevation="0" text class="primary font-weight-bold" :class="$vuetify.theme.dark ? 'black--text': 'white--text'" @click="viewProfile">
          {{ $t('View Profile') }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon color="primary">
          <v-icon>
            mdi-message-outline
          </v-icon>
        </v-btn>
        <v-btn large icon color="primary">
          <v-icon>
            mdi-video-outline
          </v-icon>
        </v-btn>
        <v-btn icon color="primary">
          <v-icon>
            mdi-calendar-outline
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ProfilePreview",
  props: {
    avatar: {
      type: Object,
    },
    fullname: {
      type: String,
    },
    headline: {
      type: String,
    },
    userId: {
      type: String,
    },
  },
  watch: {
    avatar: {
      immediate: true,
      handler(){
        this.avatarColour = this.avatar?.colour || 'primary'
        this.avatarIcon = this.avatar?.icon
        this.avatarImage = this.avatar?.image
      }
    },

    meBookmarks: {
      immediate: true,
      deep: true,
      handler(){
        this.bookmarkId = this.findUserIsBookmarked(this.userId)
      }

    }
  },
  data() {
    return{
      avatarColour: null,
      avatarIcon: null,
      avatarImage: null,
      bookmarkId: null
      }
  },
  created() {
    this.loadBookmarkWithType('user')
  },
  computed: {
    ...mapGetters({
      meBookmarks: 'me/bookmarks/bookmarks'
    })

  },
  methods: {
    ...mapActions({
      openSideTemporaryContent: 'app/openSideTemporaryContent',
      addSideTemporaryUserData: 'app/addSideTemporaryUserData',
      loadBookmarkWithType: 'me/bookmarks/loadBookmarkWithType'
    }),

    findUserIsBookmarked (userId) {
      return this.meBookmarks.find(b => b.itemId === userId)?.bookmarkId
    },

    viewProfile(){
      this.addSideTemporaryUserData({
        avatar: this.avatar,
        fullname: this.fullname,
        description: this.description
      })
      this.openSideTemporaryContent()
    }
  }
};
</script>
