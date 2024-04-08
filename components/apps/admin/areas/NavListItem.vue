<template>
  <v-list-item link :to="{name: 'apps-admin-areas'}">
    <v-list-item-avatar>
      <v-icon>mdi-page-layout-header</v-icon>
<!--      <apps-admin-areas-avatar />-->
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ $t('admin-areas') }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('admin-areas') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>

export default {
  name: "NavListItem",
}
</script>
