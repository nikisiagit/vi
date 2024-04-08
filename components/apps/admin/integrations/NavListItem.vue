<template>
  <v-list-item link :to="{name: 'apps-admin-integrations'}">
    <v-list-item-avatar>
      <v-icon>mdi-server</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ $t('integrations') }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('integrations') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NavListItem",
  // async created() {
  //   if (! this.loaded && ! this.loading) {
  //     await this.load();
  //   }
  // },
  // methods: {
    // ...mapActions({
    //   load: 'apps/admin/integrations/load',
    // })
  // },
  // computed: {
  //   ...mapGetters({
  //     integrations: 'apps/admin/integrations/integrations',
  //     loading: 'apps/admin/integrations/loading',
  //     loaded: 'apps/admin/integrations/loaded',
  //   }),
  // },
}
</script>

