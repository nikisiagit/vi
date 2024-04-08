<template>
  <v-card color="transparent" flat rounded="lg">
    <v-row >
      <v-col>
        <v-card flat class="rounded-t-lg my-2" height="52" elevation="1" style="top: 0;position: sticky;z-index: 1;">
          <v-toolbar-title class="ma-auto my-0">
            <v-tabs
              v-model="tab"
              centered

            >
              <v-tabs-slider></v-tabs-slider>

              <v-tabs v-model="tab">
                <v-tab @click="$emit('navigate-to', 'about')">
                  About
                </v-tab>

                <v-tab v-if="exhibitorId === 'exhibitor:ivent'" @click="$emit('navigate-to', 'resources')">
                  Resources
                </v-tab>

                <v-tab v-if="exhibitorId === 'exhibitor:ivent'" @click="$emit('navigate-to', 'faqs')">
                  FAQs
                </v-tab>

                <v-tab @click="$emit('navigate-to', 'book-meeting')">
                  Book a Meeting
                </v-tab>

                <v-tab @click="$emit('navigate-to', 'get-demo')">
                  Get a Demo
                </v-tab>
              </v-tabs>

            </v-tabs>
          </v-toolbar-title>


        </v-card>

        <v-sheet rounded="lg" color="transparent">
          <slot name="tab-items"></slot>
        </v-sheet>

      </v-col>
    </v-row>
  </v-card>
</template>


<script>
export default {
  name: "ExhibitorTabs",
  data(){
    return {
      tab: null,
    }
  },
  exhibitorId () {
    return this.$route.params.exhibitorId || undefined;
  },
};
</script>
