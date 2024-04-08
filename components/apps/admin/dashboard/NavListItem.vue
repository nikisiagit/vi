<template>
  <v-list-item link exact :to="{name: 'apps-admin'}">
    <v-list-item-avatar>
      <v-icon>mdi-view-dashboard</v-icon>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ $t('dashboard') }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('dashboard') }}</v-list-item-subtitle>
    </v-list-item-content>

  </v-list-item>
</template>

<script>
export default {
  name: "NavListItem",
}
</script>
