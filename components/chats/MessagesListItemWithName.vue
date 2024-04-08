<template>
  <v-card flat>
    <v-card-text class="pa-0">

      <v-list-item class="pa-0">
        <v-list-item-icon class="mr-2">
          <base-avatar
            avatar="https://cdn.vuetifyjs.com/images/lists/1.jpg"
            size="xs"
            :status-indicator="true"
          ></base-avatar>
        </v-list-item-icon>


        <v-list-item-content>
          <v-list-item-title style="word-break: break-word">
            There many variations of passages of Loream
          </v-list-item-title>
          <v-list-item-subtitle>
            Luis Carbajal
            <span>·</span>
            <small>18/09/2022 12:20 PM</small>


          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

    </v-card-text>
  </v-card>
</template>

<script>
import dayjs from "dayjs";

/**
 * No alignment - no bubble
 */
export default {
  name: 'MessagesListItemWithName',
  props: {
    messageId: {
      type: String,
    },
  },
  data(){
    return {

    }
  },
  created() {

  },
  methods: {

  }
}
</script>
