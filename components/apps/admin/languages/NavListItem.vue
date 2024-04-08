<!--
[PRO-242] Venue App (Admin) - Languages - NavListItem

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-242

Admin - Languages - NavListItem
-->
<template>
  <v-list-item link :to="{name: 'apps-admin-languages'}">

    <!-- avatar -->
    <v-list-item-avatar>
      <v-icon>mdi-translate</v-icon>
    </v-list-item-avatar>

    <!-- title/subtitle -->
    <v-list-item-content>
      <v-list-item-title>{{ $t('admin-languages-title') }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('admin-languages-title') }}</v-list-item-subtitle>
    </v-list-item-content>

    <!-- @todo alerts etc -->

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
  methods: {
    // ...mapActions({
    //   load: 'apps/admin/languages/load',
    // })
  },

  computed: {
    // ...mapGetters({
    //   loading: 'apps/admin/languages/loading',
    //   loaded: 'apps/admin/languages/loaded',
    // })
  },
}
</script>
