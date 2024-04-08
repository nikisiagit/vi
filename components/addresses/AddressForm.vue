<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <template>
      <v-row no-gutters>
        <v-col>


<!--          <span>{{ searchAddress }}</span>-->


<!--          <autocomplete-address-->
<!--            v-model="searchAddress"-->
<!--            label="Search Address"-->
<!--            debounce-time-->
<!--            append-icon=""-->
<!--            hide-no-data-->
<!--            clearable-->
<!--            hide-details-->
<!--            ref="addressRef"-->
<!--          />-->

          <!-- new Google Autocomplete Places -->
          <autocomplete-address-places
            :language-id="languageId"
            :rules="[v => !!v || 'An Address is required.']"
            @place-change="addressChanged"
          />
          <!--/ new Google Autocomplete Places -->


          <v-btn text color="info" @click="toggleManualForm">
            {{ ! showManual ? $t('Add_manually'): $t('Hide_Manually') }}
          </v-btn>
        </v-col>
      </v-row>

      <v-container class="pt-0" v-show="showManual"><!-- force open if there is insufficient information to  complete the form successfully -->
        <v-row>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="localAddress.street"
              :label="streetLabel"
              :hint="streetHint"
              persistent-hint
            />
          </v-col>

          <v-col cols="12" lg="6">
            <v-text-field
              v-model="localAddress.city"
              :label="cityLabel"
              :hint="cityHint"
              persistent-hint
            />
          </v-col>

          <v-col cols="12" lg="6">
            <v-text-field
              v-model="localAddress.state"
              :label="stateLabel"
              :hint="stateHint"
              persistent-hint
            />
          </v-col>

          <v-col cols="12" lg="6">
            <v-text-field
              v-model="localAddress.zip"
              :label="zipLabel"
              :hint="zipHint"
              persistent-hint
              :rules="zipRules"
            />
          </v-col>


          <v-col cols="12" lg="6">
            <v-text-field
              v-model="localAddress.country"
              :label="countryLabel"
              :hint="countryHint"
              persistent-hint
            />
          </v-col>
        </v-row>

      </v-container>
    </template>
  </v-form>
</template>

<script>
// import AutocompleteAddress from "./AutocompleteAddress";
const configKeys = ["street", "city", "state", "zip", "country", "latitude", "longitude"];

export default {
  name: "AddressForm",
  // components: {AutocompleteAddress},
  props: {
    isEditing: {
      type: Boolean
    },
    languageId: {
      type: String
    },
    address: {
      type: Object,
      // required: true,
      // validator: config => {
      //   if (! configKeys.every(key => key in config)){
      //     throw new Error(`The prop 'address' should contain the keys: ${configKeys.join(', ')}.`)
      //   }
      //
      //   return true
      // }
    }
  },
  data: () => ({
    valid: true,
    showManual: false,
    searchAddress: '',
    localAddress: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    }
  }),
  created(){
    this.searchAddress = this.search
  },
  computed: {
    search(){
      let search = ''
      if (this.address.street) {
        search += `${this.address.street}`
      }

      if (this.address.city) {
        search += ` ${this.address.city}`
      }

      if (this.address.state) {
        search += ` ${this.address.state}`
      }

      if (this.address.zip) {
        search += ` ${this.address.zip}`
      }

      if (this.address.country) {
        search += ` ${this.address.country}`
      }

      return search
    },
    zipRules() {
      //TODO: Handle i18n.
      return [
        v => !!v || 'Zip is required',
      ]
    },

    streetLabel() {
      return this.$i18n.t('Street');
    },
    streetHint() {
      return this.$i18n.t('Street_Hint');
    },

    cityLabel() {
      return this.$i18n.t('City');
    },
    cityHint() {
      return this.$i18n.t('City_Hint');
    },

    stateLabel() {
      return this.$i18n.t('State');
    },
    stateHint() {
      return this.$i18n.t('State_Hint');
    },

    zipLabel() {
      return this.$i18n.t('Zip');
    },
    zipHint() {
      return this.$i18n.t('Zip_Hint');
    },

    countryLabel() {
      return this.$i18n.t('Country');
    },
    countryHint() {
      return this.$i18n.t('Country_Hint');
    },
  },
  watch: {
    // valid(valid){
    //   if (! valid) {
    //     this.showManual = true
    //   }
    // },


    // searchAddress(value){
    //   if (value && value.address) {
    //
    //     const { city, country, state, road, postcode } = value.address
    //     if (value.lon) {
    //       this.address.longitude = value.lon
    //     }
    //
    //     if (value.lat) {
    //       this.address.latitude = value.lat
    //     }
    //
    //     if (postcode) {
    //       this.address.zip = postcode
    //     }
    //
    //     if (city) {
    //       this.address.city = city
    //     }
    //
    //     if (country) {
    //       this.address.country = country
    //     }
    //
    //     if (state) {
    //       this.address.state = state
    //     }
    //
    //     if (road) {
    //       this.address.street = road
    //     }
    //   }
    // }


  },
  methods: {
    toggleManualForm(){
      this.showManual = ! this.showManual
    },

    addressChanged(address){
      this.localAddress = address

      this.$emit('change-address', address)
    }
  }
}
</script>
