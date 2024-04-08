<template>
  <v-data-table :items="alerts" :headers="headers">
    <!-- item - type -->
    <template v-slot:item.type="{ item }">
      <v-icon v-if="item.type === 'success'" color="success">mdi-check</v-icon>
      <v-icon v-else-if="item.type === 'error'" color="error">mdi-alert-circle</v-icon>
    </template>

    <!-- item - alerts -->
    <template v-slot:item.alerts="{item}">
      <v-list-item class="pa-0" two-line>
        <v-list-item-content>
          <v-list-item-title :class="[item.type === 'success' ? 'success--text' : 'error--text']">
            {{ item.alerts }}
          </v-list-item-title>
          <v-list-item-subtitle :class="[item.type === 'success' ? 'success--text' : 'error--text']">
            {{  item.type }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <!-- item - actions -->
    <template v-slot:item.actions="{ item }">
      <v-btn @click="$emit('view-alert', item)" icon nuxt>
        <v-icon>mdi-eye</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "AlertsTable",
  props: {
    alerts: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
  },
};
</script>
