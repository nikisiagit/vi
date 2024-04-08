<!--
Admin Event Details

A smart component that renders the details of the specified Event.
-->
<template>


  <v-card :loading="loading">
    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-calendar</v-icon>
      {{ $t('room-details') }}
      <v-spacer />
      <!-- reload -->
      <v-btn icon :loading="loading" :disabled="loading" @click="reload">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>


    </v-card-title>

    <v-container>

    <v-list two-line>
      <!-- avatar -->

      <!-- CURRENTS -->

      <!-- name -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ name }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-name') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ name }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-daily-name') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>


      <!-- roomId -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ roomId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-room-id') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ dailyId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-daily-id') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- chat id -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ chatId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-chat-id') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- createdAt -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ createdAt }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-created-at') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ dailyCreatedAt }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-daily-created-at') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- lastModifiedAt -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ lastModifiedAt }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-lastModified-at') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- deletingAt -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ deletingAt }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-deleting-at') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- CURRENTS -->

      <hr>




      <!-- title id -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ titleId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-title-id') }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon color="primary" @click="onEdit('title')">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <!-- description id -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ descriptionId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-description-id') }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon color="primary" @click="onEdit('description')">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>



      <!-- type -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ type }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-type') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- daily config -->


      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ privacy }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-daily-privacy') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>





      <v-list-item two-line>
        <v-list-item-content>
          <v-switch
            dense
            color="primary"
            persistent-hint
            v-model="api_created"
            :label="api_created ? 'On': 'Off'"
          ></v-switch>
          <v-list-item-subtitle>{{ $t('admin-room-daily-api-created') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-switch
            dense
            color="primary"
            persistent-hint
            v-model="local_enable_prejoin_ui"
            :label="local_enable_prejoin_ui ? 'On': 'Off'"
          ></v-switch>
          <v-list-item-subtitle>{{ $t('admin-room-daiy-config-enable_prejoin_ui') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-switch
            dense
            color="primary"
            persistent-hint
            v-model="local_enable_knocking"
            :label="local_enable_knocking ? 'On': 'Off'"
          ></v-switch>
          <v-list-item-subtitle>{{ $t('admin-room-daiy-config-enable_knocking') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-switch
            dense
            color="primary"
            persistent-hint
            v-model="local_enable_pip_ui"
            :label="local_enable_pip_ui ? 'On': 'Off'"
          ></v-switch>
          <v-list-item-subtitle>{{ $t('admin-room-daiy-config-enable_pip_ui') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-switch
            dense
            color="primary"
            persistent-hint
            v-model="local_start_video_off"
            :label="local_start_video_off ? 'On': 'Off'"
          ></v-switch>
          <v-list-item-subtitle>{{ $t('admin-room-daiy-config-start_video_off') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-switch
            dense
            color="primary"
            persistent-hint
            v-model="local_enable_new_call_ui"
            :label="local_enable_new_call_ui ? 'On': 'Off'"
          ></v-switch>
          <v-list-item-subtitle>{{ $t('admin-room-daiy-config-enable_new_call_ui') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-switch
            dense
            color="primary"
            persistent-hint
            v-model="local_start_audio_off"
            :label="local_start_audio_off ? 'On': 'Off'"
          ></v-switch>
          <v-list-item-subtitle>{{ $t('admin-room-daiy-config-start_audio_off') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-switch
            dense
            color="primary"
            persistent-hint
            v-model="local_enable_people_ui"
            :label="local_enable_people_ui ? 'On': 'Off'"
          ></v-switch>
          <v-list-item-subtitle>{{ $t('admin-room-daiy-config-enable_people_ui') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-switch
            dense
            color="primary"
            :disabled="!expUnixTime"
            v-model="local_eject_at_room_exp"
            :label="local_eject_at_room_exp ? 'On': 'Off'"
          ></v-switch>
          <v-list-item-subtitle>{{ $t('admin-room-daiy-config-eject_at_room_exp') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
            <v-switch
              dense
              color="primary"
              persistent-hint
              v-model="local_enable_network_ui"
              :label="local_enable_network_ui ? 'On': 'Off'"
            ></v-switch>
          <v-list-item-subtitle>{{ $t('admin-room-daiy-config-enable_network_ui') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-switch
            dense
            color="primary"
            persistent-hint
            v-model="local_enable_video_processing_ui"
            :label="local_enable_video_processing_ui ? 'On': 'Off'"
          ></v-switch>
          <v-list-item-subtitle>{{ $t('admin-room-daiy-config-enable_video_processing_ui') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-switch
            dense
            color="primary"
            persistent-hint
            v-model="local_enable_chat"
            :label="local_enable_chat ? 'On': 'Off'"
          ></v-switch>
          <v-list-item-subtitle>{{ $t('admin-room-daiy-config-enable_chat') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ local_lang }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-daiy-config-lang') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>


    </v-list>

      <v-btn @click="dailySubmit">
          UPDATE DAILY CONFIG
      </v-btn>
    </v-container>


  </v-card>


</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Details",

  props: {
    roomId: {
      type: String,
      required: false,
    },
  },


  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();

    }
  },

  methods: {
    ...mapActions({
      loadRoomWithRoomId: 'apps/admin/rooms/loadRoomWithRoomId',
      updateRoom: 'apps/admin/rooms/updateRoom',
    }),

    async load () {
      return await (this.roomId) ? this.loadRoomWithRoomId(this.roomId) : undefined;
    },

    async reload () {
      return await this.load();
    },

    onEdit(property){
      this.$emit('update-room-property', property)

    },

    async dailySubmit () {
      try {
        const dailyRoomUpdate = {
          roomId: this.roomId,
          room: { },
          daily: {
            dailyRoomId: this.room.dailyRoomId,
            dailyProperties: {
              enable_prejoin_ui: this.local_enable_prejoin_ui,
              enable_knocking: this.local_enable_knocking,
              enable_pip_ui: this.local_enable_pip_ui,
              start_video_off: this.local_start_video_off,
              enable_new_call_ui: this.local_enable_new_call_ui,
              start_audio_off: this.local_start_audio_off,
              enable_people_ui: this.local_enable_people_ui,
              eject_at_room_exp: this.local_eject_at_room_exp,
              enable_network_ui: this.local_enable_network_ui,
              enable_video_processing_ui: this.local_enable_video_processing_ui,
              enable_chat: this.local_enable_chat,
            }
          }
        }

        this.submitting = true;
        const {executionArn} = await this.updateRoom(dailyRoomUpdate);

        this.executionArn = executionArn;
        this.submitting = false;

      } catch (error) {
        this.submitting = false;
        console.log(error);
      }
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

    name () {
      return (this.room) ? this.room?.name : undefined;
    },

    titleId () {
      return (this.room) ? this.room?.titleId : undefined;
    },

    descriptionId () {
      return (this.room) ? this.room?.descriptionId : undefined;
    },

    chatId () {
      return (this.room) ? this.room?.chatId : undefined;
    },

    type () {
      return (this.room) ? this.room?.type : undefined;
    },

    createdAt () {
      return (this.room) ? this.room?.createdAt : undefined;
    },

    lastModifiedAt () {
      return (this.room) ? this.room?.lastModifiedAt : undefined;
    },

    deletingAt () {  return (this.room) ? this.room?.deletingAt : undefined; },


    privacy () {  return (this.room) ? this.room?.daily?.privacy : undefined; },
    api_created () {

      return (this.room) ? this.room?.daily?.api_created : undefined; },

    dailyId () {  return (this.room) ? this.room?.daily?.id : undefined; },

    dailyCreatedAt () {  return (this.room) ? this.room?.daily?.created_at : undefined; },

    loaded () {
      return (this.room) ? this.room.loaded : false;
    },

    loading () {
      return (this.room) ? this.room.loading : false;
    },

    error () {
      return (this.room) ? this.room.error : undefined;
    },

    expUnixTime(){
      Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };

      const dateTime = this.expDate && this.expTime ? this.expDate + 'T' + this.expTime + ':00': null;
      return new Date(dateTime).getUnixTime()
    }
  },

  watch: {
    room(room){

      const daily = this.room?.daily

      if (daily) {
        this.local_enable_prejoin_ui = daily.config.enable_prejoin_ui
        this.local_enable_knocking = daily.config.enable_knocking
        this.local_enable_pip_ui = daily.config.enable_pip_ui
        this.local_start_video_off = daily.config.start_video_off
        this.local_enable_new_call_ui = daily.config.enable_new_call_ui
        this.local_start_audio_off = daily.config.start_audio_off
        this.local_enable_people_ui = daily.config.enable_people_ui
        this.local_eject_at_room_exp = daily.config.eject_at_room_exp
        this.local_enable_network_ui = daily.config.enable_network_ui
        this.local_enable_video_processing_ui = daily.config.enable_video_processing_ui
        this.local_enable_chat = daily.config.enable_chat
        this.local_lang = daily.config.lang
      }
    }
  },

  data: () => ({
    local_enable_prejoin_ui: undefined,
    local_enable_knocking: undefined,
    local_enable_pip_ui: undefined,
    local_start_video_off: undefined,
    local_enable_new_call_ui: undefined,
    local_start_audio_off: undefined,
    local_enable_people_ui: undefined,
    local_eject_at_room_exp: undefined,
    local_enable_network_ui: undefined,
    local_enable_video_processing_ui: undefined,
    local_enable_chat: undefined,
    local_lang: undefined,
    dailyEjectAfterTimes: [
      {
        text: '15 min',
        value: 900
      },
      {
        text: '30 min',
        value: 1800
      },
      {
        text: '1 Hr',
        value: 3600
      },
      {
        text: '2 Hr',
        value: 7200
      },
      {
        text: '4 Hr',
        value: 14400
      }
    ]
  }),
}
</script>

