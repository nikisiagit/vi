<!--
Venue App Rooms - Search

A smart component that renders the RoomsApp Search input component.
-->
<template>
  <!-- rooms search card form/inputs -->
  <v-card rounded>

    <v-card-title>
      <v-icon left>mdi-magnify</v-icon>
      {{ $t('admin-rooms-search-title')}}
    </v-card-title>

    <v-card-subtitle>
      {{ $t('admin-rooms-search-subtitle')}}
    </v-card-subtitle>

    <v-container fluid>
      <v-row no-gutters>
        <v-col>
          <v-text-field v-model="searchLocal"
                        clearable
                        dense
                        outlined hide-details
                        append-icon="mdi-magnify"
                        :label="$t('Search')"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "Search",

  data: () => ({
    /**
     * The component "local" search/query value.
     */
    searchLocal: undefined,
  }),
}
</script>

