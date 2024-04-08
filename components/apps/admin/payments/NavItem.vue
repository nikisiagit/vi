<template>
  <v-list-item link :to="{name: 'apps-admin-payments'}">
    <v-list-item-avatar>
      <v-icon>mdi-credit-card</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ $t('payments') }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('payments') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "NavItem",

}
</script>

