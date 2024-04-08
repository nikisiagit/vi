<template>
  <v-card rounded>
    <v-card-title>
      {{users.length}} Users Found
    </v-card-title>
    <v-card-text>
      <v-row no-gutters>
        <v-col>
          <v-list>
            <user-list-item v-for="(user, index) in users"
                            :user-id="user.userId"
                            :user="user"
                            :key="user.userId"

            />
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>


<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "PeopleList",
  props: {
    noFilters: {
      type: Boolean,
      default: true
    },
    contactAdded: {
      type: Boolean,
      default: false
    },
  },
  data(){
    return {
      // search: '',
       /* users: [
          {
            userId  : '77af7405-006e-4abd-8f2f-6e5622d1237c',
            fullname: 'Marvin McKinney',
            headline: 'Product Manager at Google',
            avatar: 'https://cdn.hubilo.com/speaker/2116606/150/1549_8254_024241001636454559.png',
            addConnection: true,
          },
          {
            fullname: 'Jenny Wilson',
            headline: 'UX Designer at Glassdoor',
            avatar: 'https://silicon.createx.studio/assets/img/team/26.jpg',
            addConnection: true,
          },
          {
            fullname: 'Jerome Bell',
            headline: 'Strategic Advisor at Shopify',
            avatar: 'https://cdn.hubilo.com/speaker/2116606/150/1207_7616_896656001637156224.png',
            addConnection: true,
          },
          {
            fullname: 'Ralph Edwards',
            headline: 'Founder & CEO at Strapi',
            avatar: 'https://silicon.createx.studio/assets/img/team/24.jpg',
            addConnection: true,
          },
          {
            fullname: 'Gavin Newman',
            headline: 'CEO and Co-founder at iVent',
            avatar: 'https://ivent-hq.com/wp-content/uploads/2021/07/Gav-Selfie-ForWeb-1.png',
            addConnection: false,
          },
          {
            fullname: 'Albert McKinney',
            headline: 'Principal Consultant at Stretto Inc.',
            avatar: 'https://silicon.createx.studio/assets/img/team/25.jpg',
            addConnection: true,
          },
        ],*/
    }
  },
  created() {
    this.getAllUsers()

    this.loadBookmarkWithType('user')
  },
  computed: {
    ...mapGetters({
      /*search: 'users/search',*/
      users: 'users/users',
      meBookmarks: 'me/bookmarks/bookmarks'
    }),
  },
   methods: {
     ...mapActions({
       getAllUsers: 'users/getAllUsers',
       loadBookmarkWithType: 'me/bookmarks/loadBookmarkWithType'
     }),



   },
}
</script>
