<template>
  <v-list-item link :to="{name: 'apps-admin'}">
    <v-list-item-avatar>
      <apps-admin-avatar />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ $t('apps-admin') }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('apps-admin') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "NavListItem",
  computed: {
    ...mapGetters({

    })
  },
}
</script>
