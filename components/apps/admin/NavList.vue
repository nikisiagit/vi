<!--
[PRO-241] Venue App (Admin) - Nav List

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-241

Venue App (Admin) -  Nav List

A smart component that renders the Nav List used to navigate the
Venue App (Admin) admin app.
-->
<template>
  <v-card :loading="loading" rounded>

    <!-- progress -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-shield-account</v-icon>
      {{ $t('admin') }}
      <v-spacer />
    </v-card-title>

    <v-list nav>
      <!--
      [PRO-129] Users (auth, cognito, etc)
      @link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-129
      -->
      <apps-admin-users-nav-list-item />


      <!--
        [PRO-261] - Venue App (Admin) - Registrations
        @link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-261
      -->
      <apps-admin-registrations-nav-list-item />

      <!--
      [PRO-234] WAF (firewall, WebACLs, etc)
      @link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-234
      -->
      <apps-admin-waf-nav-list-item />

      <!--
      [PRO-236] Emails (settings, identities)
      @link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-236
      -->
      <apps-admin-emails-nav-list-item />
<!--      <apps-admin-email-identities-nav-list-item />-->
<!--      <apps-admin-email-templates-nav-list-item />-->
<!--      <apps-admin-email-settings-nav-list-item />-->

      <!--
      [PRO-242] Languages (i18n - locales - translations)
      @link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-242
      -->
      <apps-admin-languages-nav-list-item />

      <!--
      [PRO-240] Venue (areas, components, registrations)
      @link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-240
      -->
      <apps-admin-venue-nav-list-item />
<!--      <apps-admin-areas-nav-list-item />-->

      <!--
      [PRO-133] Events (areas, components, registrations, tickets, etc
      @link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-133
      -->
      <apps-admin-events-nav-list-item />
<!--      <apps-admin-tickets-nav-list-item />-->


      <!--
      [PRO- ]
      Chats

      -->
      <apps-admin-chats-nav-list-item />
      <!-- rooms -->
      <apps-admin-rooms-nav-list-item />
      <!-- addresses -->
      <apps-admin-addresses-nav-list-item />
      <apps-admin-themes-nav-list-item />
      <apps-admin-tags-nav-list-item />
      <apps-admin-contents-nav-list-item />
      <apps-admin-resources-nav-list-item />
      <apps-admin-advertisements-nav-list-item />
      <apps-admin-integrations-nav-list-item />
    </v-list>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NavList",

  async created () {
    if (this.initialised) {
      if (! this.loaded && ! this.loading ) {
        await this.load();
      }
    }
  },

  watch : {
    initialised: {
      handler () {
        if (this.initialised) {
          if (! this.loaded && ! this.loading ) {
            this.load();
          }
        }
      }
    },
  },

  methods: {
    ...mapActions({
      load: 'venue/load',
    }),
  },

  computed: {
    ...mapGetters({
      initialised: 'venue/initialised',
      initialising: 'venue/initialising',

      venue: 'venue/venue',
      loading: 'venue/loading',
      loaded: 'venue/loaded',
    }),
  },
}
</script>
