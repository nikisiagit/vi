<!--
[PRO-129]

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-129
-->
<template>
  <v-list-item link :to="{name: 'apps-admin-daily'}">

    <v-list-item-avatar>
      <v-icon>mdi-media</v-icon>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ $t('admin-daily-admin-title') }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('admin-daily-admin-title') }}</v-list-item-subtitle>
    </v-list-item-content>

  </v-list-item>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NavListItem",
  // async created() {
  //   if (! this.loading && ! this.loaded) {
  //     await this.load();
  //   }
  // },
  methods: {

  },
  computed: {

  }
}
</script>

