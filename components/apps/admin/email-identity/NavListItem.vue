<!--
[PRO-236] Venue App (Admin) - Email - Identities - Nav List Item

@linl https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-236

A smart component that renders the EmailIdentity as a list item
-->
<template>
  <v-list-item two-line>
    <v-list-item-content>
      <v-list-item-title>{{ emailAddress }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('email-identity') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NavListItem",

  props: {
    emailIdentityId: {
      type: String,
      required: true,
    }
  },

  async created() {
    if (this.initialised) {
      if (! this.loaded && ! this.loading) {
        await this.load();
      }
    }
  },

  watch: {
    emailIdentityId: {
      handler () {
        if (this.initialised) {
          if (! this.loaded && ! this.loading) {
            this.load();
          }
        }
      }
    }
  },

  methods: {
    ...mapActions({
      loadEmailIdentityWithEmailIdentityId: 'apps/admin/email-identities/loadEmailIdentityWithEmailIdentityId',
    }),

    async load () {
      return await (this.emailIdentityId)
        ? this.loadEmailIdentityWithEmailIdentityId(this.emailIdentityId)
        : undefined;
    },

    async reload () {
      return await this.load();
    },
  },

  computed: {
    ...mapGetters({
      emailIdentityWithEmailIdentityId: 'apps/admin/email-identities/emailIdentityWithEmailIdentityId',
    }),

    emailIdentity () {
      return (this.emailIdentityId)
        ? this.emailIdentityWithEmailIdentityId(this.emailIdentityId)
        : undefined;
    },

    loaded () {
      return (this.address) ? this.address.loaded : false;
    },

    loading () {
      return (this.address) ? this.address.loading : false;
    },

    emailAddress () {
      return (this.emailIdentity) ? this.emailIdentity.emailAddress : undefined;
    },
  },
}
</script>
