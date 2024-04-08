<template>
  <v-card :rounded="'lg'" flat>
    <v-card-text class="pa-0">
      <v-container fluid>

        <v-row justify="center">

          <v-col align="center">
            <v-list outlined class="pa-0 rounded-lg">
              <v-list-item >

                <v-list-item-content class="text-left">
                  <v-list-item-title class="font-weight-medium">Presentation Slides</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn icon nuxt href="https://docs.google.com/presentation/d/137pQTDQI8O1FHzn2AtjL5tjeTnr8wbON7IonkcNyBVs/edit#slide=id.p" target="_blank">
                    <v-icon>mdi-open-in-new</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-col>

          <v-col align="center">
            <v-list outlined class="pa-0 rounded-lg">
              <v-list-item >

                <v-list-item-content class="text-left">
                  <v-list-item-title class="font-weight-medium">Speakers Bio</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn icon >
                    <v-icon>mdi-tray-arrow-down</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>

    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ResourcesDownloadsList",
  computed: {
    eventId () {
      return this.$route.params.eventId || undefined;
    },
  },
  data(){
    return {
    }
  },
};
</script>
