<template>
  <v-card color="primary">

    <v-card-text class="pa-0 ma-0">
      <v-container fluid>
        <v-row no-gutters>

          <v-col cols="12" lg="6" class="primary ma-auto">
            <v-img class="rounded elevation-3" height="340" :src="content.thumbnailUrl"></v-img>

            <v-card-actions>
              <v-row >
                <v-col cols="2">
                  <v-btn small elevation="0" fab>
                    <v-icon>mdi-play</v-icon>
                  </v-btn>
                </v-col>

                <v-col cols="10" align="end">
                  <v-btn >
                    {{ comments.length }} {{ $t('Comments') }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-col>

          <v-col cols="12" lg="6" class="primary">
            <v-list color="transparent">
              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>
                    {{ content.author }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ convertDateFormat(content.publishedDate) }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-row
                    align="center"
                    justify="end"
                  >
                    <v-col>
                      <!-- plus -->
                      <v-btn icon small outlined class="mr-1">
                        <v-icon small>mdi-plus</v-icon>
                      </v-btn>

                      <!-- thumbs up -->
                      <v-btn icon small outlined class="mr-1">
                        <v-icon small>mdi-thumb-up</v-icon>
                      </v-btn>

                      <!-- share -->
                      <v-btn icon small outlined>
                        <v-icon small>mdi-share</v-icon>
                      </v-btn>

                    </v-col>

                    <v-col cols="auto">
                      <v-btn
                        icon
                        small
                        @click="close"
                      >
                        <v-icon>mdi-arrow-collapse</v-icon>

                      </v-btn>
                    </v-col>

                  </v-row>
                </v-list-item-action>
              </v-list-item>
            </v-list>

            <v-row>
              <v-col>
                <v-card-title>
                  {{ content.title }}
                </v-card-title>

                <v-card-text>
                  <p class="text--primary text-overflow">
                    {{ content.description }}
                  </p>
                </v-card-text>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-card-text>
                  <p class="text-body-1 font-weight-medium">
                    consumption time: {{ content.consumptionTime }}
                  </p>

                  <v-chip
                    v-for="(tag, i) in content.tags"
                    :key="i"
                    class="mr-2"
                    color="secondary darken-4"
                  >
                    {{ $t(tag) }}
                  </v-chip>

                </v-card-text>

              </v-col>
            </v-row>

          </v-col>

        </v-row>

      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "ContentDetails",
  props: {
    content: {
      type: Object
    }
  },
  data: () => ({
    comments: [1,2,3,4]
  }),
  methods: {
    close() {
      this.$emit("close")
    },
    convertDateFormat(date) {
      if (date === null || date === undefined) {
        return "";
      }

      return dayjs(date).format("D MMMM YYYY");
    }
  }
}
</script>

<style>
  .text-overflow {
    overflow-y: auto;
    max-height: 300px;
  }
</style>
