<template>
  <v-card>
    <v-card-text>
      <v-form v-model="valid" ref="form" lazy-validation>

        <template>
          <v-tabs
            fixed-tabs
            bg-color="indigo-darken-2"
          >
            <v-tab
              @click="setSection('basic')"
            >
              Basic Room
            </v-tab>
            <v-tab
              @click="setSection('advanced')"
            >
              Advanced Room (OPTIONAL)
            </v-tab>
          </v-tabs>
        </template>

        <v-container>
          <v-expansion-panel>
            <apps-admin-rooms-steps-create-room-basic-settings
              :dailyPropertiesProps="this.dailyProperties.basicProperties" v-if="section === 'basic'"
            />
            <apps-admin-rooms-steps-create-room-advanced-settings
              :dailyPropertiesProps="this.dailyProperties.advancedProperties" v-if="section === 'advanced'"
            />
          </v-expansion-panel>
        </v-container>

      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn plain large rounded @click="cancel">{{ $t('cancel') }}</v-btn>
      <v-spacer />

      <v-btn text large class="pa-4" rounded @click="back">
        <v-icon small >
          mdi-arrow-left
        </v-icon>

        <v-spacer></v-spacer>

        {{ $t('back') }}
      </v-btn>
      <v-btn large class="pa-4" rounded @click="submit">
        {{ $t('next') }}

        <v-spacer></v-spacer>
        <v-icon small >
          mdi-arrow-right
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "RoomConfig",
  props: {},
  computed: {

  },
  data: () => ({
    valid: true,
    dailyProperties: {
      basicProperties : {
        privacy: "public",
        enable_new_call_ui: true, // They recommend to pass false for old/existing Customers.
        enable_prejoin_ui: true,
        enable_knocking: false,
        start_video_off: true,
        start_audio_off: true,
        enable_screenshare: true,
        enable_chat: false,
        enable_people_ui: true,
        enable_video_processing_ui: false,
        enable_network_ui: false,
        enable_pip_ui: false,
        lang: 'en',
        enable_recording: null,
      },
      advancedProperties: {
        owner_only_broadcast: false,
        eject_at_room_exp: false, // should just be true when exp unix time is present.
        expTime: undefined,
        expDate: undefined,
        nbfDate: undefined,
        nbfTime: undefined,
        max_participants: 200,
      },
    }, // dailyConfig
    section: "basic"
  }),
  methods: {

    reset () {
      this.valid = true

      this.$refs.form.reset();
    },

    submit () {
      if (! this.$refs.form.validate()) {
        this.valid = false;
        return;
      }

      this.valid = true;
      this.$emit('submitted', {
        dailyProperties: this.dailyProperties
      });
    },
    cancel () {
      this.$emit('close');
      this.$emit('reset');
    },
    back () {
      this.$emit('back');
    },
    setSection(section){
      this.section = section
    }
  }
}
</script>
