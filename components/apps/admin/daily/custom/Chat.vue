<template>
  <v-card class="elevation-0 flex d-flex flex-column">
    <v-card-title>
      <v-icon class="mr-2">
        mdi-forum
      </v-icon>

      Chat ({{ messages.length }})
    </v-card-title>

    <v-card-text class="flex">
      <v-card
        class="mx-auto pa-2"
        max-width="500"
      >
        <div class="overflow-y-auto" style="height: 100%">

          <v-app-bar
            v-for="(message, i) in messages"
            :key="i"
            class="mb-2 ml-1"
            color="rgba(0,0,0,0)"
            flat
          >
            <v-badge
              bordered
              bottom
              color="green"
              dot
              offset-x="16"
              offset-y="9"
            >
              <v-avatar class="mt-n5 mr-2" size="30" elevation="10">
                <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
              </v-avatar>
            </v-badge>

            <v-list-item class="pa-0">
              <v-list-item-content>
                <div style="word-break: break-word">
                  {{ message.message }}
                </div>
                <v-list-item-subtitle style="margin-top: .25rem">
                  {{ message.name }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-app-bar>
        </div>

        <v-container fluid>
          <v-textarea
            auto-grow
            rows="1"
            row-height="15"

            v-model="text"
            append-outer-icon="mdi-send"

            clear-icon="mdi-close-circle"
            clearable
            dense
            placeholder="Type a message..."
            type="text"
            @click:append-outer="submitForm"
            @click:clear="clearText"


          ></v-textarea>

        </v-container>

      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Chat",
  props: ["sendMessage", "messages"],
  data() {
    return {
      text: "", //or message: ""
    };
  },
  methods: {
    submitForm() {
      // Send chat message
      this.sendMessage(this.text);
      this.text = "";
    },
    clearText () {
      this.text = ''
    },
  },
};
</script>
