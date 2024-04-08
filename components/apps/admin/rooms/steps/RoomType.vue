<template>
  <v-card>
    <v-card-text>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-container fluid>
          <v-row>
            <v-col>
              <v-chip-group
                v-model="allowed"
                column
                multiple
                active-class="primary--text"
              >
                <v-chip
                  large
                  class="pa-8"
                  value="chat"
                >
                  <v-icon left> mdi-forum </v-icon>
                  {{ $t('chat') }}
                </v-chip>

                <v-chip
                  large
                  class="pa-8"
                  value="daily"
                >
                  <v-icon left> mdi-video </v-icon>
                  {{ $t('daily') }}
                </v-chip>

              </v-chip-group>
            </v-col>
          </v-row>

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
  name: "RoomType",
  props: {

  },
  data: () => ({
    valid: true,
    allowed: [],
  }),
  methods: {
    reset () {
      this.allowed = []
      this.$refs.form.reset();
    },
    back () {
      this.$emit('back');
    },

    submit () {
      if (! this.$refs.form.validate()) {
        this.valid = false;
        return;
      }

      this.valid = true;
      this.$emit('submitted', {
        daily: this.allowed.includes('daily'),
        chat: this.allowed.includes('chat'),
      });
    },
    cancel () {
      this.$emit('close');
      this.$emit('reset');
    },
  }
}
</script>
