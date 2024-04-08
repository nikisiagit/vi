<template>
  <v-card>
    <v-card-title>
      {{ $t('add-your-api-keys') }}
    </v-card-title>
    <v-card-subtitle>
      {{ $t('facebook-api-keys-subtitle') }}
    </v-card-subtitle>
    <v-card-text>
      <v-form  ref="form" lazy-validation>
        <v-container fluid>
          <v-row>
            <v-col cols="12" lg="12">
              <v-text-field
                v-if="facebookLocal"
                v-model="facebookClientId"
                :label="'Facebook Client Id'"
                persistent-hint
                clearable
                variant="outlined"
                required
              />
              <v-text-field
                v-if="facebookLocal"
                v-model="facebookClientSecret"
                :label="'Facebook Client Secret'"
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
  name: "CreateFacebookApiKeys",
  props: {
    facebook: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  data() {
    return {
      facebookLocal: this.facebook || false,
      facebookClientSecret: "",
      facebookClientId: ""
    };
  },

  watch: {
    facebook: {
      immediate: true,
      handler () {
        this.facebookLocal = this.facebook;
      },
    },
    facebookClientId: function() {
      this.checkFormValidity();
    },
    facebookClientSecret: function() {
      this.checkFormValidity();
    },
  },
  methods: {
    checkFormValidity: function() {
      if (this.facebookClientId && this.facebookClientSecret) {
        this.submit()
      }
    },
    submit() {
      this.$emit("submitted", {
        facebookApiKey: {
          client_id: this.facebookClientId,
          client_secret: this.facebookClientSecret
        }
      });
      this.$emit('close')
    }
  }
}
</script>
