<template>
  <v-card>
    <v-card-title>
      {{ $t('add-your-api-keys') }}
    </v-card-title>
    <v-card-subtitle>
      {{ $t('apple-api-keys-subtitle') }}
    </v-card-subtitle>
    <v-card-text>
      <v-form  ref="form" lazy-validation>
        <v-container fluid>
          <v-row>
            <v-col cols="12" lg="12">
              <v-text-field
                v-if="appleLocal"
                v-model="appleClientId"
                :label="'Apple Client Id'"
                persistent-hint
                clearable
                variant="outlined"
                required
              />
              <v-text-field
                v-if="appleLocal"
                v-model="appleClientSecret"
                :label="'Apple Client Secret'"
                persistent-hint
                clearable
                variant="outlined"
                required
              />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CreateAppleApiKeys",
  props: {
    apple: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  data() {
    return {
      appleLocal: this.apple || false,
      appleClientSecret: "",
      appleClientId: ""
    };
  },

  watch: {
    apple: {
      immediate: true,
      handler () {
        this.appleLocal = this.apple;
      },
    },
    appleClientId: function() {
      this.checkFormValidity();
    },
    appleClientSecret: function() {
      this.checkFormValidity();
    },
  },
  methods: {
    checkFormValidity: function() {
      if (this.appleClientId && this.appleClientSecret) {
        this.submit()
      }
    },
    submit() {
      this.$emit("submitted", {
        appleApiKey: {
          client_id: this.appleClientId,
          client_secret: this.appleClientSecret
        }
      });
      this.$emit('close')
    }
  }
}
</script>
