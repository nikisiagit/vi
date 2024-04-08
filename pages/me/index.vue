<!--
Me Page

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-99
-->
<template>
  <v-container fluid>
    <!-- details -->
    <v-row>
      <v-col cols="12" md="4">
        <me-details />
      </v-col>
    </v-row>

    <v-row>
      <!-- the list of ProfileChats that belong to the Me Profile -->
      <v-col cols="12" md="4">
        <me-profile-chats-list />
      </v-col>

      <!-- Create a Profile Chat - Join a Chat -->
      <v-col cols="12" md="4">
        <me-create-profile-chat />
      </v-col>
    </v-row>

    <!-- updates -->
    <v-row>
      <v-col cols="12" md="4">
        <me-update-avatar />
      </v-col>

      <v-col cols="12" md="4">
        <v-row>
          <v-col cols="12">
            <me-update-fullname />
          </v-col>

          <v-col cols="12">
            <me-update-language-id />
          </v-col>

          <v-col cols="12">
            <me-update-timezone-id />
          </v-col>

        </v-row>
      </v-col>

      <v-col cols="12" md="4">
        <v-row>

          <v-col cols="12">
            <me-update-time-format />
          </v-col>

          <v-col cols="12">
            <me-update-theme-mode />
          </v-col>
        </v-row>
      </v-col>

    </v-row>

    <!-- debug -->
    <v-row>
      <v-col cols="12" md="4">
        <me-debug />
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Me",
  layout: 'default',

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  computed: {
    ...mapGetters({
      me: 'me/me',
      loading: 'me/loading',
      loaded: 'me/loaded',
    }),
  },

  methods: {
    ...mapActions({
      load: 'me/load',
    }),
  },
}
</script>
