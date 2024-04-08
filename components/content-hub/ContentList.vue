<template>
  <v-card>
    <!-- image or background -->
    <v-img height="250" :src="content.thumbnailUrl"></v-img>

    <v-card-actions>
      <v-container fluid>
        <v-row>
          <v-col cols="10">

            <!-- loop through actions and add appropriate button -->
            <!-- play -->
            <v-btn icon outlined class="mr-2">
              <v-icon @click="goToDetails(content.contentId)">mdi-play</v-icon>
            </v-btn>

            <!-- plus -->
            <v-btn icon outlined class="mr-2">
              <v-icon>mdi-plus</v-icon>
            </v-btn>

            <!-- thumbs up -->
            <v-btn icon outlined class="mr-2">
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>

            <!-- share -->
            <v-btn icon outlined>
              <v-icon>mdi-share</v-icon>
            </v-btn>

          </v-col>

          <v-col cols="2" class="d-flex justify-end">
            <!-- open view summary dialog -->
            <v-btn fab small color="primary" @click="openDialog">
              <v-icon>mdi-arrow-expand</v-icon>
            </v-btn>
          </v-col>

        </v-row>

      </v-container>

    </v-card-actions>

    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col>
            <h3>{{ content.consumptionTime }}</h3>
          </v-col>
        </v-row>

        <v-row>
          <v-col>

            <div class="">
              <v-chip
                v-for="(tag, i) in content.tags"
                :key="i"
                class="mr-2"
                color="primary"
              >
                {{ $t(tag) }}
              </v-chip>
            </div>

          </v-col>
        </v-row>

      </v-container>
    </v-card-text>

    <v-card-title class="ml-2">{{ content.title }}</v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "ContentList",
  props: {
    content: {
      type: Object
    }
  },
  methods: {
    openDialog(){
      this.$emit("open-dialog")
    },
    goToDetails(contentId){
      this.$router.push({
        name: 'content-hub-id',
        params: {
          id: contentId
        }
      })
    }
  }
}
</script>
