<!--
Sockets List

A smart component that renders that details of the Sockets
-->
<template>
  <v-card :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-lan-check</v-icon>
      {{ $t('sockets-list')}}
      <v-spacer />

      <v-btn icon disabled>
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>

      <v-btn icon disabled>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-card-title>

    <v-container fluid>
      <v-row>
        <v-col class="px-4">
          <pre>{{ sockets }}</pre>
        </v-col>
      </v-row>
    </v-container>

    <v-list>
      <v-list-item v-for="socket in sockets"
                   :key="socket.name"
                   @click="onClick(socket)"
                   two-line
                   ripple>
        <v-list-item-avatar>
          <v-fade-transition>
            <v-icon v-if="socket.state === 'open'" key="connected">mdi-lan-connect</v-icon>
            <v-icon v-else key="disconnected">mdi-lan-disconnect</v-icon>
          </v-fade-transition>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ socket.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('socket-name') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text>
            {{ socket.state }}
          </v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>

    </v-list>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "List",
  computed: {
    ...mapGetters({
      sockets: 'sockets/sockets',
      loading: 'sockets/loading',
      loaded: 'sockets/loaded',
    })
  },

  methods: {
    ...mapActions({

    }),

    /**
     * @param socket
     * @returns {Promise<void>}
     */
    async onClick (socket) {
      const {name, partition, state} = socket;
      console.log(`## SOCKETS - SOCKET ${name} HAS BEEN CLICKED`);
    },
  }
}
</script>
