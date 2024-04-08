<template>

  <v-list-item link :to="{name: 'apps-admin-rooms'}">
    <v-list-item-avatar>
      <v-icon>mdi-human-male-board</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ $t('rooms') }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('rooms-subtitle') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "NavListItem",
}
</script>
