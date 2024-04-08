<template>
  <v-card
    outlined
    rounded="lg"
    width="300"
    height="300"
    hover
    :to="{ name: 'rooms-roomId', params: { roomId: roomId } }"
  >
    <v-img
      height="170"
      :src="null"

      class="white--text primary"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"

    >

      <v-card color="transparent white--text" height="100%" class="d-flex flex-column">
        <v-card-title class="line-clamp">

         {{ textLocal }}

          <!--            {{ $t(titleId) }}-->

        </v-card-title>
        <v-card-text class="mt-auto white--text text-left">
          <div v-if="createdBy">
            {{ $t('created-by') }} {{ createdBy }}
          </div>

          <v-chip v-if="chatId" small label color="deep-orange lighten-2" class="mt-2 white--text">
            <v-icon left small>mdi-forum</v-icon>
            Chat
          </v-chip>

          <v-chip v-if="dailyRoomId" small label color="deep-purple lighten-2" class="mt-2 white--text">
            <v-icon left small>mdi-video</v-icon>
            Daily
          </v-chip>

          <!--                    <v-chip small label color="deep-purple lighten-2" class="mt-2 white&#45;&#45;text">-->
          <!--                      <v-icon left small>mdi-video</v-icon>-->
          <!--                      Video Chat-->
          <!--                    </v-chip>-->
        </v-card-text>
      </v-card>
    </v-img>

    <v-card-actions class="justify-center">
      <v-container>
        <!--                  <v-row>-->
        <!--                    <v-col>-->
        <!--                      <v-avatar size="40" class="mr-2">-->
        <!--                        <v-img-->
        <!--                          class="rounded-lg"-->
        <!--                          src='https://cdn.vuetifyjs.com/images/lists/4.jpg'-->
        <!--                        ></v-img>-->
        <!--                      </v-avatar>-->

        <!--                      <v-avatar size="40" class="mr-2">-->
        <!--                        <v-img-->
        <!--                          class="rounded-lg"-->
        <!--                          src='https://cdn.vuetifyjs.com/images/lists/3.jpg'-->
        <!--                        ></v-img>-->
        <!--                      </v-avatar>-->

        <!--                      <v-avatar size="40" class="mr-2">-->
        <!--                        <v-img-->
        <!--                          class="rounded-lg"-->
        <!--                          src='https://cdn.vuetifyjs.com/images/lists/2.jpg'-->
        <!--                        ></v-img>-->
        <!--                      </v-avatar>-->
        <!--                    </v-col>-->
        <!--                  </v-row>-->

        <v-row>
          <v-col>
            {{ descriptionTextLocal }}
<!--            {{ $t(descriptionId) }}-->
          </v-col>

          <!--                    <v-col class="text-left">-->
          <!--                      7 spaces left-->
          <!--                    </v-col>-->

          <!-- ROOM PROPERTY: PRIVACY (private/public) -->
          <!--                    <v-col class="text-right">-->
          <!--&lt;!&ndash;                      <v-icon small>mdi-lock</v-icon>&ndash;&gt;-->
          <!--                      <v-icon small>mdi-lock-open-variant</v-icon>-->
          <!--                    </v-col>-->
        </v-row>
      </v-container>

    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "GridListItem",
  props: {
    roomId: {
      type: String
    },
    titleId: {
      type: String
    },
    descriptionId: {
      type: String
    },
    chatId: {
      type: String
    },
    dailyRoomId: {
      type: String
    },
    createdBy: {
      type: String
    }

  },

  watch: {
    titleId: {
      immediate: true,
      handler () {
        if (this.titleId) {
          if (! this.labelLoading && ! this.labelLoaded) {
            this.loadLabelWithLabelId(this.titleId);
          }
        }
      }
    },

    descriptionId: {
      immediate: true,
      handler () {
        if (this.descriptionId) {
          if (! this.descriptionLabelLoading && ! this.descriptionLabelLoaded) {
            this.loadLabelWithLabelId(this.descriptionId);
          }
        }
      }
    },

    text: {
      immediate: true,
      handler () {
        this.textLocal = this.text;
      }
    },

    languageId: {
      immediate: true,
      handler () {
        this.languageIdLocal = this.languageId;
      }
    },

    descriptionLabelText: {
      immediate: true,
      handler () {
        this.descriptionTextLocal = this.descriptionLabelText;
      }
    },
  },

  methods: {
    ...mapActions({
      load: 'rooms/load',
      reload: 'rooms/reload',
      loadLabelWithLabelId: 'apps/admin/labels/loadLabelWithLabelId',
    }),
  },

  computed: {
    ...mapGetters({
      loading: 'rooms/loading',
      loaded: 'rooms/loaded',
      rooms: 'rooms/rooms',
      numberOfRooms: 'rooms/numberOfRooms',

      labelWithLabelId: 'apps/admin/labels/labelWithLabelId',
    }),

    // the Label

    label () {
      return (this.titleId) ? this.labelWithLabelId(this.titleId) : undefined;
    },

    labelLoading () {
      return (this.label) ? this.label.loading : false;
    },

    labelLoaded () {
      return (this.label) ? this.label.loaded : false;
    },

    text () {
      return (this.label) ? this.label.text : undefined;
    },

    languageId () {
      return (this.label) ? this.label.languageId : undefined;
    },

    // the description Label

    descriptionLabel () {
      return (this.descriptionId) ? this.labelWithLabelId(this.descriptionId) : undefined;
    },

    descriptionLabelLoading () {
      return (this.descriptionLabel) ? this.descriptionLabel.loading : false;
    },

    descriptionLabelLoaded () {
      return (this.descriptionLabel) ? this.descriptionLabel.loaded : false;
    },

    descriptionLabelText () {
      return (this.descriptionLabel) ? this.descriptionLabel.text : undefined;
    },

    descriptionLabelLanguageId () {
      return (this.descriptionLabel) ? this.descriptionLabel.languageId : undefined;
    },

  },

  data: () => ({
    textLocal: undefined,
    descriptionTextLocal: undefined,
    languageIdLocal: undefined,
  }),
}
</script>

<style>
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 115px;
}
</style>
