<template>

  <v-list-item link :to="{name: 'apps-admin-waf'}">

    <v-list-item-avatar>
      <v-icon>mdi-earth-arrow-right</v-icon>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ $t('admin-waf-title') }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('admin-waf-subtitle') }}</v-list-item-subtitle>
    </v-list-item-content>

  </v-list-item>
</template>

<script>
export default {
  name: "NavListItem",
}
</script>
