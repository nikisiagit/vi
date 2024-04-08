<template>
  <v-autocomplete
    v-model="address"
    v-bind="$attrs"
    :items="addresses"
    :loading="loading"
    :search-input.sync="query"
    :filter="filter"
    return-object
    item-text="display_name"

    v-on="$listeners"
    @click:clear="onClear"
    :value-comparator="valueCompare"
    ref="inputRef"
    prepend-inner-icon="mdi-magnify"
  >
    <template slot="item" slot-scope="data">
      <v-list-item-content style="width: 50px">
<!--        {{ data.item.address.city }}-->
<!--        {{ data.item.address.country }}-->
<!--        {{ data.item.address.state }}-->
<!--        {{ data.item.address.road }}-->
<!--        {{ data.item.address.postcode }}-->

        {{ data.item.display_name }}
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: "AutocompleteAddress",
  props: {
    value: {
      type: [Object, String],
      required: false,
      default() {
        return {};
      }
    },
    debounceTime: {
      type: Boolean,
      default: false
    },

    prependIcon: {
      type: String,
      default: "mdi-map-marker"
    },
  },
  data() {
    // The initial value can be a string or an object
    const initialValue = this.value
      ? typeof this.value === "string"
        ? this.value
        : this.value.display_name
      : null;

    const initialAddress = { display_name: initialValue };
    return {
      loading: false,
      query: initialValue,
      address: initialAddress,
      addresses: initialValue ? [initialAddress] : [],
      filter() {
        return true; // filtering is done right after the api request
      }
    };
  },
  computed: {
    searchQuery() {
      let finalSearchQuery = "https://nominatim.openstreetmap.org/search?q="
      if (this.query != null) {
        finalSearchQuery += this.query.replace(/\s/g, "+");
      }

      finalSearchQuery += "&format=json&polygon_geojson=1&addressdetails=1" // nominatim API format/request

      return finalSearchQuery;
    },
    queryReady() {
      return (
        this.query !== null && this.query !== undefined && this.query !== ""
      );
    },
  },
  watch: {
    query(val) {
      if (val !== null && val !== undefined && val.length >= 1) {
        this.debouncedSearchAddresses();
      }
    },
    debounceTime: {
      immediate: true,
      handler(val) {
        if (val) {
          this.debouncedSearchAddresses = this.debounce(this.searchAddresses, 250);
        } else {
          this.debouncedSearchAddresses = this.searchAddresses;
        }
      }
    },
    searchQuery: {
      deep: true,
      handler(newVal, oldVal) {
        const oldQuery = oldVal.split("?q=")[1].split("&")[0];
        const newQuery = newVal.split("?q=")[1].split("&")[0];
        if (newQuery !== "" && newQuery === oldQuery) {
          this.debouncedSearchAddresses(this.setAddress);
        }
      }
    }
  },

  mounted() {
    if (this.queryReady) {
      this.searchAddresses(this.emitInputOnMountedSearch);
    }
  },

  destroyed() {
    this.onClear()
  },

  methods: {
    valueCompare (a, b) {
      if (a !== null && a.hasOwnProperty('display_name') && (typeof a === "string" || typeof a === "object")) {
        return a.display_name === b.display_name
      }

      return true
    },

    async searchAddresses() {
      this.loading = true;
      try {
        if (this.queryReady) {
          let searchResults = await (
            await fetch(this.searchQuery)
          ).json();

          if (searchResults !== null && searchResults !== undefined) {
            this.loading = false;

            this.addresses = searchResults

          } else {
            this.loading = false;
          }
        } else {
          this.loading = false;
        }
      } catch (error) {
        this.loading = false;
        console.log("error", error)
      }
    },

    async debouncedSearchAddresses() {},

    onClear() {
      this.query = ''
      this.addresses = []
      this.address = ''
      this.$emit("clear");
    },

    setAddress(address) {
      this.address = address;
    },

    debounce(callback, wait, immediate) {
      let timeout;
      return () => {
        let context = this,
          args = arguments;
        let later = () => {
          timeout = null;
          if (!immediate) callback.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) callback.apply(context, args);
      };
    },

    emitInputOnMountedSearch(address) {
      this.searchAddresses(address);
    },
  }
};
</script>
