<!--
Admin Addresses - Create Address

A smart component that enables an Admin to create an Address.

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-144
-->
<template>
  <v-card>
    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-map-marker</v-icon>
      {{ $t('admin-addresses-create-address') }}
      <v-spacer />
      <v-btn icon @click="showHelp = !showHelp">
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </v-card-title>

    <!-- help -->
    <v-slide-y-transition>
      <v-container fluid v-if="showHelp">
        <v-row>
          <v-col class="px-4">
            <p>{{ $t('admin-addresses-create-address-help') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>


    <!-- @todo - https://5-guys.atlassian.net/browse/PRK-152 -->
    <!--      <v-row>-->
    <!--        <v-col class="px-4">-->
    <!--          <v-fade-transition mode="out-in">-->
    <!--            <v-btn block @click="manual = true;" key="manual" v-if="! manual">-->
    <!--              {{ $t('admin-addresses-manual') }}-->
    <!--            </v-btn>-->

    <!--            <v-btn block @click="manual = false" key="search" v-else>-->
    <!--              {{ $t('admin-addresses-search') }}-->
    <!--            </v-btn>-->
    <!--          </v-fade-transition>-->
    <!--        </v-col>-->
    <!--      </v-row>-->

    <!-- form -->
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-container fluid>
        <!-- name -->
        <v-row>
          <v-col class="px-4">
            <v-text-field v-model="name"
                          :label="nameLabel"
                          :hint="nameHint"
                          :placeholder="namePlaceholder"
                          :rules="nameRules"
                          persistent-hint
                          persistent-placeholder
            />
          </v-col>
        </v-row>

        <!-- street -->
        <v-row>
          <v-col class="px-4">
            <v-text-field v-model="street"
                          :label="streetLabel"
                          :hint="streetHint"
                          :placeholder="streetPlaceholder"
                          persistent-hint
                          persistent-placeholder
            />
          </v-col>
        </v-row>

        <!-- city -->
        <v-row>
          <v-col class="px-4">
            <v-text-field v-model="city"
                          :label="cityLabel"
                          :hint="cityHint"
                          :placeholder="cityPlaceholder"
                          persistent-hint
                          persistent-placeholder
            />
          </v-col>
        </v-row>

        <!-- state -->
        <v-row>
          <v-col class="px-4">
            <v-text-field v-model="state"
                          :label="stateLabel"
                          :hint="stateHint"
                          :placeholder="statePlaceholder"
                          persistent-hint
                          persistent-placeholder
            />
          </v-col>
        </v-row>

        <!-- zip -->
        <v-row>
          <v-col class="px-4">
            <v-text-field v-model="zip"
                          :label="zipLabel"
                          :hint="zipHint"
                          :placeholder="zipPlaceholder"
                          :rules="zipRules"
                          persistent-hint
                          persistent-placeholder
            />
          </v-col>
        </v-row>

        <!-- country -->
        <v-row>
          <v-col class="px-4">
            <v-text-field v-model="country"
                          :label="countryLabel"
                          :hint="countryHint"
                          :placeholder="countryPlaceholder"
                          persistent-hint
                          persistent-placeholder
            />
          </v-col>
        </v-row>
      </v-container>

      <!-- submit -->
      <v-container>
        <v-row>
          <v-col class="px-4">
            <v-btn large block color="primary"
                   :loading="submitting"
                   :disabled="submitting"
                   @click="submit">
              {{ $t('admin-addresses-create-address-submit') }}
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="px-4">
            <v-btn large
                   block
                   color="secondary"
                   :loading="submitting"
                   :disabled="submitting"
                   @click="reset">
              {{ $t('admin-addresses-create-address-reset') }}
            </v-btn>

          </v-col>
        </v-row>
      </v-container>
    </v-form>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CreateAddress",

  data: () => ({
    submitting: false,
    valid: true,
    showHelp: true,

    executionArn: undefined,
    startDate: undefined,

    name: undefined,
    street: undefined,
    city: undefined,
    zip: undefined,
    state: undefined,
    country: undefined,

  }),

  methods: {
    ...mapActions({
      createAddress: 'apps/admin/addresses/createAddress',
    }),

    /**
     * Submit the form
     * @returns {Promise<void>}
     */
    async submit () {
      try {
        if (! this.$refs.form.validate()) {
          this.valid = false;
          return;
        }

        this.valid = true;

        const addressToCreate = {
          name: this.name,
          street: this.street,
          city: this.city,
          zip: this.zip,
          state: this.state,
          country: this.country,
        }

        this.submitting = true;
        const creatingAddress = await this.createAddress(addressToCreate);
        this.submitting = false;

        let {executionArn, startDate} = creatingAddress;

        this.executionArn = executionArn;
        this.startDate = startDate;

      } catch (error) {
        this.submitting = false;
        console.log(error);
      }
    },

    /**
     * Reset the form and the component.
     */
    reset () {
      this.submitting = false;
      this.valid = true;

      this.name = undefined;
      this.street = undefined;
      this.city = undefined;
      this.zip = undefined;
      this.state = undefined;
      this.country = undefined;

      this.executionArn = undefined;
      this.startDate = undefined;

      this.$refs.form.reset();
    },
  },

  computed: {
    ...mapGetters({
      creatingAddressWithExecutionArn: 'apps/admin/addresses/creatingAddressWithExecutionArn',
    }),

    // @todo - https://5-guys.atlassian.net/browse/PRK-153

    nameRules() {
      return [
        v => !!v || 'name-is-required',
      ]
    },

    zipRules() {
      return [
        v => !!v || 'Zip is required',
      ]
    },

    nameLabel () {
      return this.$i18n.t('name');
    },

    nameHint () {
      return this.$i18n.t('name-hint');
    },

    namePlaceholder () {
      return this.$i18n.t('name-placeholder');
    },

    streetLabel () {
      return this.$i18n.t('street');
    },

    streetHint () {
      return this.$i18n.t('street-hint');
    },

    streetPlaceholder () {
      return this.$i18n.t('street-placeholder');
    },


    cityLabel () {
      return this.$i18n.t('city');
    },

    cityHint () {
      return this.$i18n.t('city-hint');
    },

    cityPlaceholder () {
      return this.$i18n.t('city-placeholder');
    },


    zipLabel () {
      return this.$i18n.t('zip');
    },

    zipHint () {
      return this.$i18n.t('zip-hint');
    },

    zipPlaceholder () {
      return this.$i18n.t('zip-placeholder');
    },

    stateLabel () {
      return this.$i18n.t('state');
    },

    stateHint () {
      return this.$i18n.t('state-hint');
    },

    statePlaceholder () {
      return this.$i18n.t('state-placeholder');
    },

    countryLabel () {
      return this.$i18n.t('country');
    },

    countryHint () {
      return this.$i18n.t('country-hint');
    },

    countryPlaceholder () {
      return this.$i18n.t('country-placeholder');
    },
  }
}
</script>
