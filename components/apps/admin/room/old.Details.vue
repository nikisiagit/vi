<!--
Admin - Room Details

A smart component that renders the details of the specified Chat.

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-149
-->
<template>
  <v-card :loading="loading">

    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-human-male-board</v-icon>

      <!-- @todo Title Label -->
      <!--      {{ $t(titleId)}} -->
        {{ roomId }}

      <v-spacer />

      <v-btn icon
             :loading="loading"
             :disabled="loading"
             @click="reload">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-card-title>

    <v-list>
      <!-- name -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ name }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-name') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- title id -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ titleId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-title-id') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- description-id -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ descriptionId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-description-id') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- tag ids -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ tagIds }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-tag-ids') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- theme id -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ themeId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-theme-id') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- language id -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ languageId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-language-id') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- max-participants -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ maxParticipants }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-max-participants') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- daily -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ daily }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-daily') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- chat -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ chat }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-chat') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

    </v-list>

      <v-container v-if="false">
        <v-row>
          <v-col class="px-0">
            <v-list two-line>

              <v-list-item>
                <v-list-item-content>
                  <!-- @todo - we need to create a summary/preview of the Room -->
                  <v-card color="primary">
                    <v-card-title>
<!--                      <v-icon left>mdi-human-male-board</v-icon>-->
                      {{ name }}
                    </v-card-title>
                  </v-card>

                </v-list-item-content>
              </v-list-item>


              <!-- SETTINGS -->
              <v-subheader>{{ $t('settings') }}</v-subheader>
              <!-- title id -->
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon>mdi-format-title</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ titleId }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('room-title-id') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!-- description id -->
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon>mdi-text</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ descriptionId }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('room-description-id') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!-- tag ids -->
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon>mdi-tag</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ tagIds }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('room-tag-ids') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!-- theme id -->
              <v-list-item>
                <v-list-item-avatar class="gradient-light-dark-theme">
                  <v-icon large :color="`${lightPrimary || 'orange'}`">
                    mdi-circle
                  </v-icon>

                  <v-icon large class="ml-1" :color="`${darkPrimary || 'orange lighten-2'}`">
                    mdi-circle
                  </v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ themeId || 'theme:pro-halloween' }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('room-theme') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!-- room size -->
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon>mdi-account-group</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ maxParticipants }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('room-max-participants') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!-- video config -->
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon>mdi-video</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ daily }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('room-video') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!-- chat config -->
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon>mdi-forum</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ chat }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('room-chat') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!-- daily config -->
              <v-list-item class="pa-0" v-if="false">
                <v-list-item-content>
                  <v-treeview :items="dailyConfig">
                    <template v-slot:prepend="{ item }">
                      <v-icon left v-if="item.children">mdi-play-network</v-icon>
                    </template>

                    <template v-slot:label="{ item }">
                      <v-list-item-content>
                        <template>
                          <v-list-item-title >{{ daily ? $t('Enabled'): $t('Disabled') }}</v-list-item-title>
                        </template>

                        <template>
                          <v-list-item-subtitle>{{ $t(item.title) }}</v-list-item-subtitle>
                        </template>
                      </v-list-item-content>
                    </template>

                    <template v-slot:append="{ item }">
                      <v-switch v-model="daily" inset dense v-if="item.children"></v-switch>
                    </template>

                  </v-treeview>
                </v-list-item-content>
              </v-list-item>

              <!-- chat config -->
              <v-list-item v-if="false">
                <v-list-item-avatar>
                  <v-icon>mdi-forum</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ chat ? $t('Enabled'): $t('Disabled') }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('room-chat') }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-switch v-model="chat" inset dense></v-switch>
                </v-list-item-action>
              </v-list-item>

              <!-- other attributes -->

              <!-- ticket access/controls -->
              <v-list-item v-if="false">
                <v-list-item-avatar>
                  <v-icon>mdi-ticket-confirmation</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ $t('All') }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('ticket-access') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!-- (default) language id -->
              <v-list-item v-if="false">
                <v-list-item-avatar>
                  <v-icon>mdi-language</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ languageId }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('room-language') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>


              <!-- BORING ADMIN STUFF -->
              <v-subheader>{{ $t('advanced') }}</v-subheader>
              <!-- room id -->
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon>mdi-link</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ roomId }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('room-room-id') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!-- name -->
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon>mdi-identifier</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('room-name') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!-- created by -->
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ createdBy }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('room-created-by') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!-- created at -->
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon>mdi-clock</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ createdAt }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('room-created-at') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!-- last modified by -->
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ lastModifiedBy }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('room-last-modified-by') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!-- last modified at -->
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon>mdi-clock</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ lastModifiedAt }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('room-last-modified-at') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

          </v-col>
        </v-row>
      </v-container>
    </v-card>

<!--    <v-card v-if="false">-->
<!--      <v-card-text>-->
<!--        <v-alert-->
<!--          icon=" "-->
<!--          outlined-->
<!--          type="error"-->
<!--        >-->
<!--          <template v-slot:append>-->
<!--            <v-icon color="error">-->
<!--              mdi-delete-->
<!--            </v-icon>-->
<!--          </template>-->
<!--          <strong>{{ $t('delete-room') }}</strong>-->
<!--        </v-alert>-->
<!--      </v-card-text>-->
<!--    </v-card>-->
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Details",

  props: {
    roomId: {
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
    roomId: {
      handler () {
        if (! this.loaded && ! this.loading) {
          this.load();
        }
      },
    }
  },

  methods: {
    ...mapActions({
      loadRoomWithRoomId: 'apps/admin/rooms/loadRoomWithRoomId',
    }),

    async load () {
      return await (this.roomId) ? this.loadRoomWithRoomId(this.roomId) : undefined;
    },

    async reload () {
      return await this.load();
    }
  },


  data() {
    return {
      daily: true,
      chat: true,
      // chatConfig: [
      //   {
      //     id: 1,
      //     title: 'Enabled',
      //     subtitle: 'Room chat',
      //   }
      // ],
      dailyConfig: [
        {
          id: 1,
          title: 'room-audio-video',
          children: [
            {
              id: 2,
              title: 'screenshare',
            },
            {
              id: 3,
              title: 'people',
            },
            {
              id: 4,
              title: 'recording',
            },
            {
              id: 5,
              title: 'network',
            },
          ],
        }
        ]
    }
  },
  computed: {
    ...mapGetters({
      roomWithId: 'apps/admin/rooms/roomWithRoomId',
      loading: 'apps/admin/rooms/loading',
    }),

    room () {
      return (this.roomId) ? this.roomWithId(this.roomId) : undefined;
    },

    titleId () {
      return (this.room) ? this.room.titleId : undefined;
    },

    descriptionId () {
      return (this.room) ? this.room.descriptionId : undefined;
    },

    tagIds () {
      return (this.room) ? this.room.tagIds : undefined;
    },

    themeId () {
      return (this.room) ? this.room?.themeId : undefined;
    },

    languageId () {
      return (this.room) ? this.room?.languageId : undefined;
    },

    maxParticipants () {
      return (this.room) ? this.room.maxParticipants : undefined;
    },

    loaded () {
      return (this.room) ? this.room.loaded : false;
    },

    loading () {
      return (this.room) ? this.room.loading : false;
    },

    error () {
      return (this.room) ? this.room.error : undefined;
    },

    name () {
      return (this.room) ? this.room.name : undefined;
    },

    createdAt () {
      return (this.room) ? this.room.createdAt : undefined;
    },

    createdBy () {
      return (this.room) ? this.room.createdBy : undefined;
    },

    lastModifiedAt () {
      return (this.room) ? this.room.lastModifiedAt : undefined;
    },

    lastModifiedBy () {
      return (this.room) ? this.room.lastModifiedBy : undefined;
    },

    deletingAt () {
      return (this.room) ? this.room.deletingAt : undefined;
    },

    deletedBy () {
      return (this.room) ? this.room.deletedBy : undefined;
    },
  },
}
</script>

