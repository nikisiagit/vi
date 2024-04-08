<template>
  <!-- review step -->
  <v-card>
    <v-card-text class="pa-0">

      <v-container fluid>
        <v-row>
          <v-col>

            <v-list>
              <!-- RoomName step  -->
              <v-row>
                <v-col cols="6" lg="3">
                  <span class="text--disabled">{{ $t(`Room details`) }}</span>
                </v-col>
                <v-col cols="6" lg="9" align-self="center">
                  <v-divider />
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ room.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{ $t('room-name') }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ room.title.text }}</v-list-item-title>
                      <v-list-item-subtitle>{{ $t('room-title') }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ room.description && room.description.text }}</v-list-item-title>
                      <v-list-item-subtitle>{{ $t('room-description') }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>

                <v-col cols="auto" align-self="center" align="center">
                  <v-list-item>
                    <v-list-item-action>
                      <v-btn icon @click="createRoomSteps = 1">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-col>


              </v-row>

              <!--/ RoomName step  -->

              <!-- RoomType step  -->
              <v-row>
                <v-col cols="6" lg="3">
                    <span class="text--disabled">
                        {{ $t(`Room features`) }}
                    </span>
                </v-col>
                <v-col cols="6" lg="9" align-self="center">
                  <v-divider />
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ room.daily ? $t('enabled'): $t('disabled') }}</v-list-item-title>
                      <v-list-item-subtitle>{{ $t('daily') }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ room.chat ? $t('enabled'): $t('disabled') }}</v-list-item-title>
                      <v-list-item-subtitle>{{ $t('chat') }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>

                <v-col cols="auto" align-self="center" align="center">
                  <v-list-item>
                    <v-list-item-action>
                      <v-btn icon @click="createRoomSteps = 2">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-col>
              </v-row>

              <!--/ RoomType step  -->

              <!-- RoomConfig step  -->
              <v-row>
                <v-col cols="6" lg="3">
                  <span class="text--disabled">{{ $t(`Room configuration`)  }}</span>
                </v-col>
                <v-col cols="6" lg="9" align-self="center">
                  <v-divider />
                </v-col>
              </v-row>


              <!-- /RoomConfig step  -->

            </v-list>

          </v-col>
        </v-row>

      </v-container>
    </v-card-text>

    <!--      </v-card-actions>-->

    <v-card-actions>
      <v-btn plain large rounded @click="cancel">{{ $t('cancel') }}</v-btn>
      <v-spacer />

      <v-btn text large class="pa-4" rounded @click="back" :disabled="creating">
        <v-icon small >
          mdi-arrow-left
        </v-icon>

        <v-spacer></v-spacer>

        {{ $t('back') }}
      </v-btn>
      <v-btn large rounded @click="submit" :loading="creating">
        {{ $t('create') }}
      </v-btn>
    </v-card-actions>

  </v-card>
  <!--/ review step -->
</template>

<script>

export default {
  name: "RoomReview",
  props: {
    room: {
      type: Object,
      required: true
    },
    creating: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    valid: true,
    creatingLocal: false,
    roomLocal: {},
  }),
  created() {
    this.roomLocal = this.room
    this.creatingLocal = this.creating
  },
  methods: {

    reset () {
      this.valid = true
      this.$refs.form.reset();
    },

    submit () {
  /*    if (! this.$refs.form.validate()) {
        this.valid = false;
        return;
      }*/

      this.valid = true;
      this.$emit('submitted', {
        room: this.room
      });
    },
    cancel () {
      this.$emit('close');
      this.$emit('reset');
    },
    back () {
      this.$emit('back');
    },
    submitForm () {
      this.$emit('submitForm');
    },
  }
}
</script>
