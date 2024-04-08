<template>
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-toolbar flat>
      <v-icon left>mdi-human-male-board</v-icon>

      <v-toolbar-title>
        {{ $t('rooms') }} ({{ numberOfRooms }})
      </v-toolbar-title>

      <v-spacer />

      <v-btn icon :loading="loading" :disabled="loading" @click="reload">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>

      <v-dialog v-model="createRoomDialog" overlay-color="accent">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <apps-admin-rooms-create-room @close="createRoomDialog = false;"/>
      </v-dialog>

    </v-toolbar>

    <v-container fluid>
      <v-row>
        <v-col>

          <v-list v-if="$vuetify.breakpoint.mobile">
            <apps-admin-rooms-nav-list-item
              v-for="room in rooms"
              :key="room.roomId"
              :room-id="room.roomId"
            />
          </v-list>

          <v-data-table
            v-else
            :search="search" :headers="headers" :items="rooms" :loading="loading">
            <template v-slot:top>
              <v-container fluid class="px-0 pt-6">
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-text-field v-model="search" dense hide-details="auto"
                                  rounded filled prepend-inner-icon="mdi-magnify"
                                  :placeholder="placeholder"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </template>

            <!-- headers -->
            <template v-slot:header.name="{ header }">
              {{ $t(header.text) }}
            </template>

            <template v-slot:header.roomId="{ header }">
              {{ $t(header.text) }}
            </template>
            <template v-slot:header.actions="{ header }">
              {{ $t(header.text) }}
            </template>

            <!-- items -->
            <!--            <template v-slot:item.name="{ item }">-->
            <!--              <v-avatar rounded>-->
            <!--                <img :src="item.imageUrl" />-->
            <!--              </v-avatar>-->
            <!--              {{ item.name }}-->
            <!--            </template>-->

            <!-- item actions -->
            <template v-slot:item.actions="{ item }">
              <template>
                <v-btn icon nuxt :to="{name: 'apps-admin-rooms-roomId', params: {roomId: item.roomId}}">
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </template>

              <template>
                <v-btn icon color="error">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>

              <template v-if="item.error">
                <v-btn icon :loading="loading" :disabled="loading" color="error">
                  <v-icon>mdi-alert</v-icon>
                </v-btn>
              </template>

              <template v-if="item.loaded">
                <v-btn icon :loading="loading">
                  <v-icon color="success">mdi-check-circle</v-icon>
                </v-btn>
              </template>

              <template v-if="item.daily">
                <v-btn  @click="joinRoom(item.daily.url)" icon :loading="loading">
                  <v-icon color="warning">mdi-door-open</v-icon>
                </v-btn>
              </template>
            </template>
          </v-data-table>


        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "List",

  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  data: () => ({
    createRoomDialog: false,
    search: '',
    loading: false,
    headers: [
      {
        text: 'name',
        align: 'start',
        value: 'name',
        sortable: true,
      },
      {
        text: 'roomId',
        align: 'start',
        value: 'roomId',
        sortable: true,
      },
      {
        text: 'actions',
        align: 'right',
        value: 'actions',
        sortable: false,
      }
    ],
  }),

  methods: {
    ...mapActions({
      load: 'apps/admin/rooms/load',
      reload: 'apps/admin/rooms/reload',
    }),
    joinRoom(url) {
      window.open(url, '_blank', 'noreferrer');
    }
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/rooms/loading',
      loaded: 'apps/admin/rooms/loaded',
      rooms: 'apps/admin/rooms/rooms',
      numberOfRooms: 'apps/admin/rooms/numberOfRooms'
    }),

    placeholder () {
      return this.$i18n.t('search');
    }
  },
}
</script>

