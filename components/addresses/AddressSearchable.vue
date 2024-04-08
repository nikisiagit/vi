<!--<template>-->
<!--  <v-card flat>-->
<!--&lt;!&ndash;    <v-card-title>&ndash;&gt;-->
<!--&lt;!&ndash;      <v-icon left>mdi-home-map-marker</v-icon>&ndash;&gt;-->
<!--&lt;!&ndash;      {{ isEditing ? $t('Edit_Venue_Address') : $t('Add_Venue_Address') }}&ndash;&gt;-->
<!--&lt;!&ndash;    </v-card-title>&ndash;&gt;-->
<!--&lt;!&ndash;    <v-card-subtitle>{{ isEditing ? $t('Edit_Venue_Address_Subtitle') : $t('Add_Venue_Address_Subtitle') }}</v-card-subtitle>&ndash;&gt;-->

<!--    <v-card-title v-if="$slots['title']">-->
<!--      <slot name="title"></slot>-->
<!--    </v-card-title>-->

<!--    <v-card-subtitle v-if="$slots['subtitle']">-->
<!--      <slot name="subtitle"></slot>-->
<!--    </v-card-subtitle>-->

<!--    <v-card-text class="ma-0 pa-0">-->
<!--      <address-form ref="addressForm" :address="fullAddress"/>-->
<!--    </v-card-text>-->

<!--&lt;!&ndash;    <v-card-actions>&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;      <v-tooltip right>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;        <template v-slot:activator="{ on, attrs }">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;          <v-btn icon v-bind="attrs" v-on="on">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;            <v-icon>mdi-help-circle</v-icon>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;          </v-btn>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;        </template>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;        {{ $t('Venue_Address_Tooltip') }}&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;      </v-tooltip>&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;      <v-spacer />&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;      <v-btn class="ml-auto"&ndash;&gt;-->
<!--&lt;!&ndash;             plain&ndash;&gt;-->
<!--&lt;!&ndash;             :disabled="updatingAddress"&ndash;&gt;-->
<!--&lt;!&ndash;             @click="reset">&ndash;&gt;-->
<!--&lt;!&ndash;        {{ $t('Clean') }}&ndash;&gt;-->
<!--&lt;!&ndash;      </v-btn>&ndash;&gt;-->
<!--&lt;!&ndash;      &lt;!&ndash;             plain&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;      <v-btn color="primary"&ndash;&gt;-->
<!--&lt;!&ndash;             :loading="updatingAddress"&ndash;&gt;-->
<!--&lt;!&ndash;             @click="submit">&ndash;&gt;-->
<!--&lt;!&ndash;        {{ isEditing ? $t('Edit') : $t('Add') }}&ndash;&gt;-->
<!--&lt;!&ndash;      </v-btn>&ndash;&gt;-->
<!--&lt;!&ndash;    </v-card-actions>&ndash;&gt;-->

<!--  </v-card>-->
<!--</template>-->

<!--<script>-->
<!--import dayjs from "dayjs";-->
<!--import {mapActions, mapGetters} from "vuex";-->
<!--import AddressForm from "./AddressForm";-->

<!--const configKeys = ["street", "city", "state", "zip", "country", "latitude", "longitude"]; // addressId-->

<!--export default {-->
<!--  name: "AddressSearchable",-->
<!--  components: {AddressForm},-->
<!--  props: {-->
<!--    venueId: {-->
<!--      type: String,-->
<!--      // required: true-->
<!--    },-->
<!--    address: {-->
<!--      type: Object,-->
<!--      // required: true,-->
<!--      // validator: config => {-->
<!--      //   if (! configKeys.every(key => key in config)){-->
<!--      //     throw new Error(`The prop 'address' should contain the keys: ${configKeys.join(', ')}.`)-->
<!--      //   }-->
<!--      //-->
<!--      //   return true-->
<!--      // }-->
<!--    }-->
<!--  },-->
<!--  data: () => ({-->
<!--    fullAddress: {-->
<!--      street: undefined,-->
<!--      city: undefined,-->
<!--      state: undefined,-->
<!--      zip: undefined,-->
<!--      country: undefined,-->
<!--      longitude: undefined,-->
<!--      latitude: undefined-->
<!--    },-->
<!--    valid: true,-->
<!--    updatingAddress: false,-->
<!--  }),-->
<!--  computed: {-->
<!--    ...mapGetters({-->
<!--      settingsForAddress: 'map/settingsForAddress'-->
<!--    }),-->
<!--    isEditing(){-->
<!--      return this.address && this.address.addressId-->
<!--    },-->

<!--    nameLabel() {-->
<!--      return this.$i18n.t('Name');-->
<!--    },-->
<!--    nameHint() {-->
<!--      return this.$i18n.t('Name_Hint');-->
<!--    },-->

<!--    streetLabel() {-->
<!--      return this.$i18n.t('Street');-->
<!--    },-->
<!--    streetHint() {-->
<!--      return this.$i18n.t('Street_Hint');-->
<!--    },-->

<!--    cityLabel() {-->
<!--      return this.$i18n.t('City');-->
<!--    },-->
<!--    cityHint() {-->
<!--      return this.$i18n.t('City_Hint');-->
<!--    },-->

<!--    stateLabel() {-->
<!--      return this.$i18n.t('State');-->
<!--    },-->
<!--    stateHint() {-->
<!--      return this.$i18n.t('State_Hint');-->
<!--    },-->

<!--    zipLabel() {-->
<!--      return this.$i18n.t('Zip');-->
<!--    },-->
<!--    zipHint() {-->
<!--      return this.$i18n.t('Zip_Hint');-->
<!--    },-->

<!--    countryLabel() {-->
<!--      return this.$i18n.t('Country');-->
<!--    },-->
<!--    countryHint() {-->
<!--      return this.$i18n.t('Country_Hint');-->
<!--    },-->
<!--  },-->
<!--  created() {-->
<!--    this.populateForm(this.address)-->

<!--    // if (! this.loading && ! this.loaded) {-->
<!--    //   //@todo: load when isEditing-->
<!--    //   console.log('LOADING');-->
<!--    //   console.log(this.venueId)-->
<!--    //   // this.load();-->
<!--    // }-->

<!--  },-->
<!--  methods: {-->
<!--    ...mapActions({-->
<!--      updateAddress: 'addresses/updateAddress',-->
<!--    }),-->

<!--    populateForm(address){-->
<!--      this.fullAddress.addressId = address.addressId-->
<!--      this.fullAddress.street = address.street-->
<!--      this.fullAddress.city = address.city-->
<!--      this.fullAddress.state = address.state-->
<!--      this.fullAddress.zip = address.zip-->
<!--      this.fullAddress.country = address.country-->
<!--      this.fullAddress.longitude = address.longitude-->
<!--    },-->

<!--    reset() {-->
<!--      // this.$refs.form.reset();-->
<!--      this.$refs.addressForm.$refs.form.reset();-->

<!--      this.$refs.addressForm.$refs.addressRef.onClear()-->
<!--      this.$refs.addressForm.$refs.addressRef.$refs.inputRef.clearableCallback()-->

<!--      this.valid = true;-->
<!--      this.updatingAddress = false;-->
<!--    },-->

<!--    async submit () {-->

<!--      if (! this.$refs.addressForm.$refs.form.validate()) {-->
<!--        return;-->
<!--      }-->

<!--      console.log("full address: ", this.address)-->

<!--      const addressToUpdate = {-->
<!--        addressId: this.address.addressId || this.venueId,-->
<!--        street: this.fullAddress.street,-->
<!--        city: this.fullAddress.city,-->
<!--        state: this.fullAddress.state,-->
<!--        zip: this.fullAddress.zip,-->
<!--        country: this.fullAddress.country,-->
<!--        api: 'Nominatim',-->
<!--        latitude: this.fullAddress.latitude,-->
<!--        longitude: this.fullAddress.longitude,-->

<!--        // mapSettings: this.settingsForAddress(this.address)-->
<!--      };-->

<!--      // this.updatingAddress = true;-->
<!--      // await this.updateAddress(addressToUpdate);-->
<!--      // this.updatingAddress = false;-->
<!--      this.$emit('save-address', addressToUpdate)-->

<!--      this.reset();-->
<!--      this.$emit('close');-->
<!--    },-->
<!--  },-->
<!--}-->
<!--</script>-->

