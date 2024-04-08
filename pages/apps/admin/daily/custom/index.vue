<template>
  <div>

    <v-container v-if="appState === 'idle'">
      <v-row class="d-flex justify-center">
        <v-col cols="6" >
          <v-card>
            <v-card-text>

              <v-form class="join-form" >
                <v-container >
                  <v-row>
                    <v-col cols="12">
                      <v-text-field label="Enter your name" type="text" required v-model="name" />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        type="text"
                        label="Daily URL"
                        placeholder="https://your-daily-domain.daily.co/room-name"
                        required
                        v-model="roomUrl"
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-btn @click="joinCall" color="primary">
                        Join
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>

              </v-form>

            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <daily-call
      v-else-if="appState === 'incall'"
      :leaveCall="leaveCall"
      :name="name"
      :roomUrl="roomUrl"
    />

  </div>
</template>

<script>
export default {
  name: "CustomCall",
  data() {
    return {
      appState: "idle",
      name: "",
      roomUrl: "https://magic-show.daily.co/magic-room",
    };
  },
  methods: {
    joinCall() {
      if (this.name && this.roomUrl) {
        this.appState = "incall";
      }
    },

    leaveCall() {
      // Reset app state to return to the join screen after leaving call
      this.appState = "idle";
    },

  },
};
</script>
