<template>
  <v-dialog v-model="dialog" fullscreen>

    <template v-slot:activator="{ on, attrs}">
      <v-list-item v-bind="attrs" v-on="on" ripple>
        <v-list-item-avatar>
          <v-icon>mdi-map-marker</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ $t('addresses') }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('addresses') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>


    <v-card>
      <v-toolbar>
        <v-btn icon @click="dialog = false;">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{ $t('addresses') }} ({{ numberOfAddresses }})</v-toolbar-title>
        <v-spacer />

        <v-btn icon @click="reload" :loading="loading">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>

        <v-dialog fullscreen v-model="createDialog">
          <template v-slot:activator="{ on, attrs}">
            <v-btn icon v-bind="attrs" v-on="on" >
              <v-icon>mdi-map-marker-plus</v-icon>
            </v-btn>
          </template>
          <apps-admin-addresses-create-address @close="createDialog = false;"/>
        </v-dialog>
      </v-toolbar>

      <!-- the error -->
      <template v-if="error">
        <v-container>
          <v-row>
            <v-col>
              <v-alert type="error">
                {{ error }}
              </v-alert>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <!-- the list of Tags -->
      <v-container>
        <v-row>
          <v-col>
<!--            <apps-admin-addresses-list />-->
          </v-col>
        </v-row>
      </v-container>

    </v-card>

  </v-dialog>
</template>

<script>
export default {
  name: "ListItem",

  data: () => ({
    dialog: false,
    createDialog: false,
  }),

}
</script>
