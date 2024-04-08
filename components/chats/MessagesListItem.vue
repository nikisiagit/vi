<template>
  <v-card flat>
    <v-card-text class="pa-0">

      <v-container fluid class="d-flex align-start">

        <!-- render avatar to the left side in a list -->
        <base-avatar
          v-if="alignTo === 'left'"
          avatar="https://cdn.vuetifyjs.com/images/lists/4.jpg"
          size="xs"
          :status-indicator="true"
        ></base-avatar>
        <!-- -->

        <!-- push content to the right side in a list if is needed -->
        <template v-if="alignTo === 'right'">
          <v-spacer></v-spacer>
        </template>
        <!-- -->

        <!-- render message content list item in a card -->
        <v-card
          :class="{'mr-2': alignTo === 'right', 'ml-2': alignTo === 'left'}"
          max-width="350px"
          color="success"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-wrap">
                There many variations of passages of Loream
              </v-list-item-title>
              <v-list-item-subtitle align="end">
                12:20 PM
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card >
        <!-- -->

        <!-- render avatar to the right side in a list -->
        <base-avatar
          v-if="alignTo === 'right'"
          avatar="https://ca.slack-edge.com/TJGTBEENN-U01PB326FQA-5d1edc104af4-48"
          size="xs"
          :status-indicator="true"
        ></base-avatar>
        <!-- -->

      </v-container>

    </v-card-text>
  </v-card>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: 'MessagesListItem',
  props: {
    messageId: {
      type: String,
    },
    alignTo: {
      type: String,
      default: 'left' // 'left' || 'right'
    }
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
