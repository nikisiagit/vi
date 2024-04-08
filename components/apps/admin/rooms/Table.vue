<template>
    <!-- the list -->
  <v-container fluid>
    <v-row>
      <v-col>
        <v-list v-if="$vuetify.breakpoint.mobile">
          <apps-admin-room-nav-list-item
            v-for="room in rooms"
            :key="room.roomId"
            :room-id="room.roomId"
          />
        </v-list>

        <v-data-table
          v-else
          :items="rooms"
          :headers="headers"
          :loading="loading">

          <!--            &lt;!&ndash; item - titleId &ndash;&gt;-->
          <!--            <template v-slot:item.titleText="{ item }">-->
          <!--              <v-list-item class="pa-0" two-line>-->
          <!--                <v-list-item-content>-->
          <!--                  <v-list-item-title>-->
          <!--                    <nuxt-link-->
          <!--                      :to="{ name: 'apps-admin-rooms-roomId', params: { roomId: item.roomId } }"-->
          <!--                      class="text-decoration-none text&#45;&#45;primary">-->
          <!--                      {{ item.titleText || $t(item.titleId) }} -->
          <!--                    </nuxt-link>-->
          <!--                  </v-list-item-title>-->
          <!--                  <v-list-item-subtitle>-->
          <!--                    {{  item.descriptionText || $t(item.descriptionId) }}-->
          <!--                  </v-list-item-subtitle>-->
          <!--                </v-list-item-content>-->
          <!--              </v-list-item>-->
          <!--            </template>-->

          <!-- item - status -->
          <template v-slot:item.status="{ item }">
            <v-icon color="success">
              mdi-check
            </v-icon>
          </template>

          <!-- item - actions -->
          <template v-slot:item.actions="{ item }">
            <v-btn icon nuxt :to="{name: 'apps-admin-rooms-roomId', params: {roomId: item.roomId}}">
              <v-icon>mdi-eye</v-icon>
            </v-btn>

            <template v-if="item.dailyRoomId">
              <v-btn  @click="joinRoom(item)" icon :loading="loading">
                <v-icon color="primary">mdi-door-open</v-icon>
              </v-btn>
            </template>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>


</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Table",

  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/rooms/load',
      reload: 'apps/admin/rooms/reload',
      loadLabelWithLabelId: 'apps/admin/labels/loadLabelWithLabelId',
      returnRoomWithRoomId: 'apps/admin/rooms/returnRoomWithRoomId',
    }),

    async joinRoom(room){
      if(! room?.dailyRoomId) return;

      const _room = await this.returnRoomWithRoomId(room.roomId);

      this.$emit('join-daily-room', _room.daily)

    }
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/rooms/loading',
      loaded: 'apps/admin/rooms/loaded',
      rooms: 'apps/admin/rooms/rooms',
      numberOfRooms: 'apps/admin/rooms/numberOfRooms',
    }),

  },

  data: () => ({
    headers: [
      {
        text: 'Name',
        align: 'start',
        value: 'name',
        sortable: true,
        width: '55%'
      },
      // {
      //   text: 'Title',
      //   align: 'start',
      //   value: 'titleText',
      //   sortable: true,
      //   width: '55%'
      // },
      {
        text: 'Created',
        align: 'start',
        value: 'createdAt',
        sortable: true,
        width: '15%'
      },
      {
        text: 'Status',
        align: 'start',
        value: 'status',
        sortable: false,
        width: '15%'
      },
      {
        text: 'Actions',
        align: 'start',
        value: 'actions',
        sortable: false,
        width: '15%'
      }
    ],
  }),
}
</script>


