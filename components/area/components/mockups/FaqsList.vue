<template>
  <v-card :rounded="showLabel ? 'lg': 'lg'" :flat="! showLabel">
    <v-card-title v-if="showLabel">
      FAQs
    </v-card-title>
    <v-card-text>
      <v-sheet outlined rounded="lg">
        <v-container fluid>

          <v-row justify="center">

            <v-col cols="12" align="center">
              <v-expansion-panels flat :accordion="true" >
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <strong>Where is iVent HQ actually based?</strong>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="text-left">
                    Gavin's house.
                  </v-expansion-panel-content>
                  <v-divider></v-divider>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <strong>Why is our approach better than others?</strong>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="text-left">
                    We care about people, and believe in working with our customers on a consultancy basis to deliver the best result for an ultimate event experience.
                  </v-expansion-panel-content>
                  <v-divider></v-divider>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <strong>I want an event, but I don't want to faff with it. Can you help?</strong>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="text-left">
                    Absolutely. Hence why we offer our White Glove service for your peace of mind. We take care of everything, including your live event support. Use the form below or speak to one of us on the booth.
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>

          </v-row>
        </v-container>
      </v-sheet>


    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "RepresentativesList",
  props: {
    // this should come from customization of component in the admin - should contain title - yes - no.
    showLabel: {
      type: Boolean,
      default: true
    }
  },
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
