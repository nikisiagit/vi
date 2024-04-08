<template>
  <v-list two-line subheader >

      <v-list-item>
        <v-list-item-content>
          <v-row>
            <v-col cols="6">
              <v-list-item-title>
                Maximum participants
              </v-list-item-title>
              <v-list-item-subtitle>
                Set the maximum number of participants allowed in a room at the same time.
              </v-list-item-subtitle>
            </v-col>

            <v-col cols="6">
              <v-text-field
                type="number"
                placeholder="Enter maximum participants"
                v-model="dailyProperties.max_participants"
                counter="200"
                required
              />
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>

      <v-divider  />

      <v-list-item>
        <v-list-item-content>
          <v-row>
            <v-col cols="6">
              <v-list-item-title>
                Eject after
              </v-list-item-title>
              <v-list-item-subtitle>
                Eject participants this many seconds after they join the meeting.
              </v-list-item-subtitle>
            </v-col>

            <v-col cols="6">
              <v-select
                v-model="dailyProperties.eject_after_elapsed"
                :items="dailyEjectAfterTimes"
                placeholder="Select eject after duration"
              />
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>

      <v-divider  />

      <v-list-item>
        <v-list-item-content>
          <v-row>
            <v-col cols="6">
              <v-list-item-title>
                Owner only broadcast
              </v-list-item-title>
              <v-list-item-subtitle>
                Only meeting owners can screen share, record and use their camera/mic.
              </v-list-item-subtitle>
            </v-col>

            <v-col cols="6">
              <v-switch
                dense
                color="primary"
                v-model="dailyProperties.owner_only_broadcast"
                :label="dailyProperties.owner_only_broadcast ? 'On': 'Off'"
              ></v-switch>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>

      <v-divider  />

      <v-list-item>
        <v-list-item-content>
          <v-row>
            <v-col cols="6">
              <v-list-item-title>
                Meeting join hook
              </v-list-item-title>
              <v-list-item-subtitle>
                Set a URL that will receive a webhook when a user joins a room.
              </v-list-item-subtitle>
            </v-col>

            <v-col cols="6">
              <v-text-field
                type="text"
                placeholder="Enter endpoint URL..."
                v-model="dailyProperties.meeting_join_hook"
                required
              />
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>

      <v-divider  />

      <v-list-item>
        <v-list-item-content>
          <v-row>
            <v-col cols="6">
              <v-list-item-title>
                Not before
              </v-list-item-title>
              <v-list-item-subtitle>
                Participants cannot join before this time (UTC).
              </v-list-item-subtitle>
            </v-col>

            <v-col cols="6">

              <v-row>
                <v-col cols="6">
                  <base-date-picker
                    v-model="dailyProperties.nbfDate"
                    label="Not before date"
                    icon=""
                  />
                </v-col>
                <v-col cols="6">
                  <base-time-picker
                    v-model="dailyProperties.nbfTime"
                    icon=""
                  />
                </v-col>
              </v-row>

            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>

      <v-divider  />

      <v-list-item>
        <v-list-item-content>
          <v-row>
            <v-col cols="6">
              <v-list-item-title>
                Expires
              </v-list-item-title>
              <v-list-item-subtitle>
                Participants cannot join after this time (UTC).
              </v-list-item-subtitle>
            </v-col>

            <v-col cols="6">
              <v-row>
                <v-col cols="6">
                  <base-date-picker
                    v-model="dailyProperties.expDate"
                    label="Exp date"
                    icon=""
                  />
                </v-col>
                <v-col cols="6">
                  <base-time-picker
                    v-model="dailyProperties.expTime"
                    label="Exp time"
                    icon=""
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>

      <v-divider  />

      <v-list-item>
        <v-list-item-content>
          <v-row>
            <v-col cols="6">
              <v-list-item-title>
                Eject on EXP
              </v-list-item-title>
              <v-list-item-subtitle>
                Eject participants when the EXP (Expires) time is reached.
              </v-list-item-subtitle>
            </v-col>

            <v-col cols="6">
              <v-switch
                dense
                color="primary"
                :disabled="!expUnixTime"
                v-model="dailyProperties.eject_at_room_exp"
                :label="dailyProperties.eject_at_room_exp ? 'On': 'Off'"
              ></v-switch>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>

  </v-list>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "CreateRoomAdvancedSettings",
  props: {
    dailyPropertiesProps: {
      type: Object,
      required: true
    },
  },
  data: () => ({
    valid: true,
    dailyProperties: {},
    dailyEjectAfterTimes: [
      {
        text: '15 min',
        value: 900
      },
      {
        text: '30 min',
        value: 1800
      },
      {
        text: '1 Hr',
        value: 3600
      },
      {
        text: '2 Hr',
        value: 7200
      },
      {
        text: '4 Hr',
        value: 14400
      }
    ],
  }),
  created() {
    this.dailyProperties = this.dailyPropertiesProps
  },
  computed: {

    expUnixTime(){
      Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };

      const dateTime = this.expDate && this.expTime ? this.expDate + 'T' + this.expTime + ':00': null;
      return new Date(dateTime).getUnixTime()
    },
  }
}
</script>
