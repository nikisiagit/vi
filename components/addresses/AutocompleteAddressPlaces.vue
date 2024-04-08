<template>
  <v-text-field
    id="searchTextField"
    v-model="searchSuggestion"
    :placeholder="$t('search-an-address')"
    clearable
    v-bind="$attrs"
    prepend-inner-icon="mdi-magnify"
  ></v-text-field>
</template>

<script>
import loadJS from 'load-js'

/**
 * Load Google Map API Library/module.
 */
let loadModulePromise
const loadModule = (options) => {
  if (Object.prototype.hasOwnProperty.call(window, 'google')) {
    return Promise.resolve()
  }
  const opt = Object.assign({
    libraries: 'places'
  }, options)
  const parameters = Object.keys(opt)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(opt[key])}`)
    .join('&')
  let url = `https://maps.googleapis.com/maps/api/js?${parameters}`
  return loadJS(url).catch(e => {
    loadModulePromise = null
    console.warn('Error loading google maps script', e)
  })
}

export default {
  name: "AutocompleteAddressPlaces",
  props: {
    value: {
      type: String
    },

    languageId: {
      type: String,
      default: 'en'
    },
  },
  watch: {
    // value: {
    //   immediate: true,
    //   handler(){
    //     this.formattedAddress = this.value
    //   }
    // },
    languageId: {
      immediate: true,
      handler(languageId){
        /**
         * Load Google Map API Library/module.
         * --------
         * URL Parameters when loading Places API JS Library.
         * @link https://developers.google.com/maps/documentation/javascript/url-params
         * @type {Promise<void>|*}
         */
        loadModulePromise = loadModulePromise || loadModule({
          key: "AIzaSyCJRSsDYuGoQbxksWoJUPX5Sqel49zQ1TQ", // @todo: GET FROM ENV or move to backend.
          language: languageId
        })
      }
    }
  },
  created() {
    this.parsedAddressFields = Object.assign({
      postal_town: 'short_name',
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      administrative_area_level_2: 'short_name',
      administrative_area_level_3: 'short_name',
      postal_code: 'long_name'
    })
  },

  mounted() {
    loadModulePromise.then(() => {
      this.setupGoogle()
    })
  },

  data () {
    return {
      formattedAddress: '',
      searchSuggestion: '',
      currentPlace: null,
      parsedAddressFields: null,
      autocomplete: null,
    }
  },

  methods: {
    setupGoogle () {
      const input = document.getElementById('searchTextField')

      /**
       * Init Google Autocomplete search.
       * @link https://developers.google.com/maps/documentation/javascript/place-autocomplete
       * ---------
       * The options that can be passed
       * @link https://developers.google.com/maps/documentation/javascript/reference/places-widget#AutocompleteOptions
       * @type {Window.google.maps.places.Autocomplete}
       */
      this.autocomplete = new window.google.maps.places.Autocomplete(
        input,
        // options
      )

      this.autocomplete.addListener('place_changed', this.onPlaceChange)
    },

    /**
     * parsePlace method use reference of get places API details and place data schema:
     * @link https://developers.google.com/maps/documentation/places/web-service/details
     *
     * Place Data Fields schema:
     * @link https://developers.google.com/maps/documentation/places/web-service/place-data-fields
     */
    parsePlace (place) {
      const returnData = {}

      if (place.formatted_address !== undefined) {
        this.formattedAddress = place.formatted_address
      }

      if (place.address_components !== undefined) {
        // Get each component of the address from the place details
        for (let i = 0; i < place.address_components.length; i += 1) {
          const addressType = place.address_components[i].types[0]

          if (this.parsedAddressFields[addressType]) {
            const val = place.address_components[i][this.parsedAddressFields[addressType]]
            returnData[addressType] = val
          }
          if (addressType === 'country') {
            returnData.country = place.address_components[i]['long_name']
            returnData.country_code = place.address_components[i]['short_name']
          }
        }

        returnData.latitude = place.geometry.location.lat()
        returnData.longitude = place.geometry.location.lng()

        // additional fields available in google places results
        returnData.name = place.name
        returnData.formatted_address = place.formatted_address
        returnData.photos = place.photos
        returnData.place_id = place.place_id
        returnData.place = place
      }
      return returnData
    },

    onPlaceChange () {
      /**
       * GET Place API:
       * @link https://developers.google.com/maps/documentation/places/web-service/details
       */
      const place = this.autocomplete.getPlace()

      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        this.$emit('no-result', place)
        return
      }

      console.log("### PLACE (not-parsed): ", place)

      /**
       * ParsePlace into properties that we're interested in.
       * @type {{}}
       */
      const pl = this.parsePlace(place)

      console.log("### PARSE PLACE", pl)

      /**
       * Emit event to parent and set current place and format the address.
       * address object schema:
       * {
       *   street: '',
       *   city: '',
       *   state: '',
       *   zip: '',
       *   country: ''
       * }
       */
      const address = {
        street: `${pl?.street_number ? pl.street_number +' ': '' }${pl?.route || ''}`,
        city: pl?.postal_town || pl?.locality,
        state: pl["administrative_area_level_1"], // administrative_area_level_2
        zip: pl?.postal_code,
        country: pl?.country,
        latitude: pl?.latitude,
        longitude: pl?.longitude
      }
      this.$emit('place-change', address)

      // build the format address as accurate as the address object above.
      // this.searchSuggestion = `${address.street}, ${address.city} ${address.zip}, ${address.country}`

      this.formattedAddress = pl ? this.formattedAddress : ''

      this.searchSuggestion = this.formattedAddress
      console.log("formattedAddress", this.formattedAddress)

      this.$emit('address-formatted', this.formattedAddress)
      // this.$emit('input', this.formattedAddress)
      this.currentPlace = pl
    },
  }

}

</script>
