<!--Venue Admin - Registrations Page | The Registrations Page is used by Admins to manage the Registrations.-->
<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-sheet width="100%"
                 height="100%"
                 elevation="1"
                 rounded="lg"
                 :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">
          <v-container fluid class="fill-height">
            <v-row>
              <v-col>
                <apps-admin-registrations-app />
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "index",
}
</script>

