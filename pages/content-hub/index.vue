<template>
  <v-row>
    <v-col>
      <h2 class="font-bold text-3xl mb-5">ContentHub</h2>

      <v-row>
        <v-col>
          <v-card >
            <v-card-text>
              <v-container fluid>
                <v-row>
                  <v-col cols="5">
                    <!-- image/video -->
                    <!-- play button -->
                    <!-- comments link -->
                  </v-col>

                  <v-col cols="7">
                    <!-- presenter avatar -->
                    <!-- presenter name -->
                    <!-- actions -->
                    <!-- close modal -->
                    <!-- title -->
                    <!-- about -->
                    <!-- time in minutes -->
                    <!-- tags -->
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>

        <v-col cols="12" lg="4" v-for="(content, i) in contents" :key="i">

          <content-list :content="content" @open-dialog="openDialog(content)" />

        </v-col>
      </v-row>
    </v-col>

    <v-dialog
      v-model="contentSummaryDialog"
      max-width="1000px"
    >
      <content-details :content="viewedContent" @close="close" />
    </v-dialog>

  </v-row>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ContentList from "../../components/content-hub/ContentList";
import ContentDetails from "../../components/content-hub/ContentDetails";
export default {
  name: 'InspirePage',
  components: {ContentList, ContentDetails},
  data: () => ({
    contentSummaryDialog: false,
    viewedContent: null,
    comments: [1,2,3,4],
  }),
  computed: {
    ...mapGetters({
      'contents': 'content-hub/contents',
      'loaded': 'content-hub/loaded',
      'loading': 'content-hub/loading'
    })
  },
  methods: {
    ...mapActions({
      'load': 'content-hub/load'
    }),
    openDialog (content) {
      this.viewedContent = content;
      this.contentSummaryDialog = true;
    },
    close () {
      this.contentSummaryDialog = false;
    }
  },
  async created() {
    console.log("created");
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  }
}
/**
{
  "contents":[
  {
    "resourceId":"1Password Emergency Kit A3-WZRHNP-ivent.pdf",
    "author":"fdsfsdfdsfd",
    "contentId":"ucas.fdfsdffdsaf",
    "description":"fdsfsdfds",
    "type":"file",
    "title":"fdfsdffdsaf",
    "tags":[

    ],
    "expiryDate":null,
    "allowReactions":true,
    "allowComments":false,
    "thumbnail_name":"Screenshot from 2021-10-14 16-51-09.png",
    "venueId":"ucas",
    "consumptionTime":null,
    "publishedDate":null,
    "allowSharing":false
  },
  {
    "resourceId":"1Password Emergency Kit A3-WZRHNP-ivent.pdf",
    "author":"fsd",
    "contentId":"ucas.fdsfsdf",
    "description":"fds",
    "type":"file",
    "title":"fdsfsdf",
    "tags":[

    ],
    "expiryDate":null,
    "allowReactions":true,
    "allowComments":false,
    "thumbnail_name":"Screenshot from 2021-04-30 15-00-40.png",
    "venueId":"ucas",
    "consumptionTime":null,
    "publishedDate":null,
    "allowSharing":false
  },
  {
    "resourceId":"1Password Emergency Kit A3-WZRHNP-ivent.pdf",
    "author":"gdfgd",
    "contentId":"ucas.grgdfgdf",
    "description":"gdf",
    "type":"file",
    "title":"grgdfgdf",
    "tags":[
      "Programming"
    ],
    "expiryDate":null,
    "allowReactions":false,
    "allowComments":false,
    "thumbnail_name":"Screenshot from 2021-04-30 15-00-40.png",
    "venueId":"ucas",
    "consumptionTime":null,
    "publishedDate":null,
    "allowSharing":false
  },
  {
    "resourceId":"1Password Emergency Kit A3-WZRHNP-ivent.pdf",
    "author":null,
    "contentId":"ucas.random",
    "description":"des",
    "type":"file",
    "title":"random",
    "tags":[

    ],
    "expiryDate":"2022-06-16",
    "allowReactions":true,
    "allowComments":false,
    "thumbnail_name":"Screenshot from 2021-06-30 16-07-24.png",
    "venueId":"ucas",
    "consumptionTime":"4 mins",
    "publishedDate":"2022-06-08",
    "allowSharing":false
  },
  {
    "resourceId":"Screenshot from 2021-05-26 10-54-31.png",
    "author":null,
    "contentId":"ucas.title lol",
    "description":null,
    "type":"file",
    "title":"title lol",
    "tags":[

    ],
    "expiryDate":null,
    "allowReactions":false,
    "allowComments":false,
    "thumbnail_name":"Screenshot from 2021-04-30 15-00-40.png",
    "venueId":"ucas",
    "consumptionTime":null,
    "publishedDate":null,
    "allowSharing":false
  }
],
  "token":null
}
 **/
</script>
