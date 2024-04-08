<!--
Venue App (Admin) Registrations - Tabs

A smart component that renders the RegistrationsApp Tabs (internal) Nav.

-->
<template>
  <v-card rounded>
    <template>
      <v-tabs v-model="model" color="primary" >
        <v-tab>{{ $t('registrations') }}</v-tab>
        <v-tab>{{ $t('reports') }}</v-tab>
        <v-tab>{{ $t('dashboard') }}</v-tab>
        <v-tab>{{ $t('alerts') }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="model">

        <!-- REGISTRATIONS -->
        <v-tab-item>
          <v-sheet width="100%"
                   height="100%"
                   elevation="1"
                   rounded="lg"
                   :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">
            <v-container fluid>
              <v-row>
                <v-col>
                  <apps-admin-registrations-table />
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
                  <apps-admin-registrations-reports />
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
                  <apps-admin-registrations-dashboard />
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
                  <apps-admin-registrations-alerts />
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
      text: 'Lorem ipsum dolor sit amet.',
      text2: 'merve',
    }
  },
}
</script>

