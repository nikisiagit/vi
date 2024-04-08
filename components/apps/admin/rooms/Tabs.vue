<!--
Venue App (Admin) Rooms - Tabs

A smart component that renders the RoomsApp Tabs (internal) Nav.

-->
<template>
  <v-card rounded>
    <template>
      <v-tabs v-model="model" color="primary" >
        <v-tab>{{ $t('rooms') }}</v-tab>
        <v-tab>{{ $t('reports') }}</v-tab>
        <v-tab>{{ $t('dashboard') }}</v-tab>
        <v-tab>{{ $t('alerts') }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="model">

        <!-- ROOMS -->
        <v-tab-item>
          <v-sheet width="100%"
                   height="100%"
                   elevation="1"
                   rounded="lg"
                   :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">
            <v-container fluid class="fill-height">
              <v-row>
                <v-col>
                  <apps-admin-rooms-table @join-daily-room="(daily) => $emit('join-daily-room', daily)"/>
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-tab-item>

        <!-- REPORTS -->
        <v-tab-item>
          <v-sheet width="100%"
                   height="100%"
                   elevation="1"
                   rounded="lg"
                   :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">
            <v-container fluid class="fill-height">
              <v-row>
                <v-col>
                  <apps-admin-rooms-reports />
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-tab-item>

      <!-- DASHBOARD -->
        <v-tab-item>
          <v-sheet width="100%"
                   height="100%"
                   elevation="1"
                   rounded="lg"
                   :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">
            <v-container fluid class="fill-height">
              <v-row>
                <v-col>
                  <apps-admin-rooms-dashboard />
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-tab-item>

      <!-- ALERTS -->
        <v-tab-item>
          <v-sheet width="100%"
                   height="100%"
                   elevation="1"
                   rounded="lg"
                   :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">
            <v-container fluid class="fill-height">
              <v-row>
                <v-col>
                  <apps-admin-rooms-alerts />
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-tab-item>

      </v-tabs-items>
    </template>

  </v-card>
</template>

<script>
export default {
  name: "Tabs",
  data () {
    return {
      model: 'tab-2',
    }
  },
}
</script>

<style>
.card_spaces {
  box-shadow: 0 0 1rem 0 rgb(0 0 0 / 20%);
  backdrop-filter:blur(10px);
  padding: 20px;
  background-color: #79d3ca;
}
</style>
