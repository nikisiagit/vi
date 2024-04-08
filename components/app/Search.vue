<template>
  <v-card height="100%" width="100%" flat>

    <v-toolbar flat>
      <v-icon left>mdi-pound</v-icon>
      <v-toolbar-title>{{ $t('search') }}</v-toolbar-title>
    </v-toolbar>

    <v-card-text class="pa-0">
      <v-container fluid>
        <v-row no-gutters>
          <v-col cols="12" >

            <!--- Search box-->
            <v-text-field v-model="search" dense outlined persistent-hint
                rounded  prepend-inner-icon="mdi-magnify" clearable
                :placeholder="'placeholder'"
                hint="minimum of 3 characters"
            ></v-text-field>

            <!--- /Search box-->

            <p v-if="noResultsMsg">No results found</p>
            <!--- Search results-->
            <v-list v-for="result in results" :key="result.id">

              <v-list-item link>
                <v-list-item-icon>
                  <v-icon>
                    {{ mapTypeToIcon(result.type) }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ result.label }}</v-list-item-title>
                  <v-list-item-subtitle>{{ result.type }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

            </v-list>
            <!--- /Search results-->
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Search",
  computed: {
    ...mapGetters({
      loading: 'search/loading',
      loaded: 'search/loaded',
      results: 'search/results',
    })
  },
  watch: {
    search(val, oldVal) {
      console.log(val.length);
      if (val.length < 3) {
        this.clearResults();
        this.noResultsMsg = false;
      }
      if (val.length >= 3 && val !== oldVal) {
        clearTimeout(this.searchTimerId);
        this.searchTimerId = setTimeout(() => {
          this.load(val).then(() => {
            this.noResultsMsg = this.results.length < 1;
          })
        }, 500);
      }
    },
  },

  async created () {

  },

  data(){
    return {
      search: '',
      searchTimerId: null,
      noResultsMsg: false
    }
  },

  methods: {
    ...mapActions({
      load: 'search/load',
      clearResults: 'search/clearResults'
    }),
    mapTypeToIcon(type) {
      const icons = {
        'user': 'mdi-account-circle',
        'file': 'mdi-file',
        'image': 'mdi-image',
        'calendar': 'mdi-calendar',
      }

      return icons[type];
    },
    mapTypeToLink(type, id) {
      // TODO: build up the link that the click event will use
    }
  },
}
</script>
