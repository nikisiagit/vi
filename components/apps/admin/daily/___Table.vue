<template>
  <v-card :loading="loading">

    <v-card-title>
      <v-icon left>mdi-door-sliding</v-icon>
      {{ $t('Rooms_Table')}}
    </v-card-title>

    <v-card-subtitle>{{ $t('Rooms_Table_subtitle')}}</v-card-subtitle>

    <template slot="progress">
      <v-progress-linear color="primary" height="4" indeterminate />
    </template>

    <v-card-text>
      <v-data-table :headers="headers" :items="rooms" :loading="loading">
        <!-- headers -->
        <template v-slot:header.id="{ header }">
          {{ $t(header.text) }}
        </template>

        <template v-slot:header.name="{ header }">
          {{ $t(header.text) }}
        </template>

        <template v-slot:header.url="{ header }">
          {{ $t(header.text) }}
        </template>

        <template v-slot:header.privacy="{ header }">
          {{ $t(header.text) }}
        </template>

        <template v-slot:header.created_at="{ header }">
          {{ $t(header.text) }}
        </template>

        <template v-slot:header.actions="{ header }">
          {{ $t(header.text) }}
        </template>

        <!-- items -->
        <template v-slot:item.id="{ item }">
          {{ item.id }}
        </template>

        <template v-slot:item.name="{ item }">
          {{ item.name }}
        </template>

        <template v-slot:item.url="{ item }">
          <strong>
            {{ item.url }}
          </strong>
        </template>

        <template v-slot:item.privacy="{ item }">
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>
                  {{ item.privacy === 'private' ? 'mdi-door-closed-lock': 'mdi-door-open' }}
                </v-icon>
              </v-btn>
            </template>
            {{ item.privacy }}
          </v-tooltip>
        </template>

        <template v-slot:item.created_at="{ item }">
          {{ item.created_at || '-' }}
        </template>

        <!-- item actions -->
        <template v-slot:item.actions="{ item }">

          <v-btn plain @click="$emit('handle-join-room', item)">
            <v-icon left>mdi-login</v-icon> Join
          </v-btn>

        </template>

      </v-data-table>
    </v-card-text>

    <v-card-actions>
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-help-circle</v-icon>
          </v-btn>
        </template>
        {{ $t('Rooms_Table_Tooltip') }}
      </v-tooltip>


      <v-spacer />

      <v-btn :loading="loading" :disabled="loading" @click="$emit('reload')">
        <v-icon left>
          mdi-refresh
        </v-icon>
        {{ $t('Reload') }}
      </v-btn>


      <v-dialog v-model="createRoomDialog" max-width="1000px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ml-2" v-bind="attrs" v-on="on">
            <v-icon left>
              mdi-plus
            </v-icon>
            {{ $t('Create_Room') }}
          </v-btn>
        </template>

        <daily-create-room @close="createRoomDialog = false;"/>
      </v-dialog>

    </v-card-actions>

  </v-card>
</template>

<script>
export default {
  name: 'Table',
  props: {
    rooms: {
      type: Array,
      required: true
    },
    error: {
      type: String
    },
    loading: {
      type: Boolean
    }
  },
  data: () => ({
    /**
     * Is the CreateRoom dialog open or not.
     */
    createRoomDialog: false,

    /**
     * Headers used by table
     */
    headers: [
      {
        text: 'Room_Id',
        align: 'start',
        value: 'id',
        sortable: true,
      },
      {
        text: 'Room_Name',
        align: 'start',
        value: 'name',
        sortable: true,
      },
      {
        text: 'Room_Url',
        align: 'start',
        value: 'url',
        sortable: true,
      },
      {
        text: 'Privacy',
        align: 'start',
        value: 'privacy',
        sortable: true,
      },
      {
        text: 'Created At',
        align: 'start',
        value: 'created_at',
        sortable: true,
      },
      {
        text: 'Actions',
        align: 'right',
        value: 'actions',
        sortable: false,
      }
    ]
  }),
  methods: {
    /**
     * Open the CreateRoom dialog.
     */
    openCreateRoomDialog: function () {
      this.createRoomDialog = true;
    },

    /**
     * Close the CreateRoom dialog.
     */
    closeCreateRoomDialog: function () {
      this.createRoomDialog = false;
    },

  },
}
</script>


