<!--
Me - Update Fullname

A smart component that enables the Me Profile to update their fullname
-->
<template>
  <v-card :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-account-circle</v-icon>
      {{ $t('me-update-fullname') }}
    </v-card-title>

    <!-- form -->
    <v-form ref="form" v-model="valid">
      <v-container fluid>
        <v-row>
          <v-col class="px-4">
            <v-text-field v-model="fullnameLocal"
                          :label="fullnameLabel"
                          :hint="fullnameHint"
                          persistent-hint
                          clearable
            />
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <!-- submit -->
    <v-container>
      <v-row>
        <v-col class="px-4">
          <v-btn large
                 block
                 color="primary"
                 @click="submit"
                 :loading="submitting"
                 :disabled="submitting">
            {{ $t('me-update-fullname') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UpdateFullname",

  data: () => ({
    valid: true,
    submitting: false,
    fullnameLocal: undefined,
  }),

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    fullname: {
      immediate: true,
      handler () {
        this.fullnameLocal = this.fullname;
      },
    },
  },

  methods: {
    ...mapActions({
      load: 'me/load',
      updateMe: 'me/updateMe',
    }),

    async submit () {
      try {
        const meUpdate = {
          fullname: this.fullnameLocal,
        };

        this.submitting = true;
        this.updatingMe = await this.updateMe(meUpdate);
        this.submitting = false;
      } catch (error) {
        console.log(error);
      }
    },
  },

  computed: {
    ...mapGetters({
      loading: 'me/loading',
      loaded: 'me/loaded',
      me: 'me/me',
    }),

    /**
     * The fullname attribute.
     *
     * @returns {*|undefined}
     */
    fullname () {
      return (this.me) ? this.me.fullname : undefined;
    },


    // i18n
    fullnameLabel () {
      return this.$i18n.t('me-fullname-label');
    },

    fullnameHint () {
      return this.$i18n.t('me-fullname-hint');
    },
  }
}
</script>
