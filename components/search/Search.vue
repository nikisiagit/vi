<!--
Search

A smart component for search
-->
<template>
  <v-card :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-magnify</v-icon>
      {{ $t('search')}}

      <v-spacer />

      <v-btn icon disabled>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-card-title>

    <v-container class="fluid">
      <v-row>
        <v-col class="px-4">
          <v-text-field v-model="search"
                        :hint="searchHint"
                        :label="searchLabel"
                        :placeholder="placeholder"
                        persistent-hint
                        prepend-icon="mdi-magnify" />
        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Search",

  data: () => ({
    loading: false,
    search: undefined,
  }),

  computed: {
    ...mapGetters({

    }),

    searchLabel () {
      return this.$i18n.t('search-label');
    },

    searchHint () {
      return this.$i18n.t('search-hint');
    },

    placeholder () {
      return this.$i18n.t('search-placeholder');
    }
  },
}
</script>
