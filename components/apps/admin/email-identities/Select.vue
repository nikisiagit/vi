<!--
[PRO-236] Venue App (Admin) - Emails - Identities - Select

A smart component that enables an Admin to select from the available
EmailIdentities that have been created in their Partition.
-->
<template>
  <v-select
    v-model="emailIdentityId"
    item-text="emailAddress"
    item-value="emailIdentityId"
    :loading="loading"
    :items="emailIdentities"
    :label="emailIdentityLabel"
    :hint="emailIdentityHint"
    :atts="$attrs"
    persistent-hint
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-slot:item="{on, attrs, item}">
      <v-list-item two-line v-bind="attrs" v-on="on">
        <v-list-item-content>
          <v-list-item-title>{{ $t(item.emailAddress) }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.emailIdentityId }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-select>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Select",

  props: {
    value: {
      type: String,
    },
  },

  data: () => ({
    emailIdentityId: undefined,
  }),

  watch: {
    value: {
      immediate: true,
      handler () {
        this.emailIdentityId = this.value;
      }
    }
  },

  async created() {
    if (this.initialised) {
      if (! this.loaded && ! this.loading) {
        await this.load();
      }
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/email-identities/load',
      reload: 'apps/admin/email-identities/reload',
      initialised: 'apps/admin/email-identities/initialised',
    }),
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/email-identities/loading',
      loaded: 'apps/admin/email-identities/loaded',
      error: 'apps/admin/email-identities/error',
      emailIdentities: 'apps/admin/email-identities/emailIdentities',
      numberOfEmailIdentities: 'apps/admin/email-identities/numberOfEmailIdentities',
    }),

    emailIdentityLabel () {
      return this.$i18n.t('email-identity-label');
    },

    emailIdentityHint () {
      return this.$i18n.t('email-identity-hint');
    },
  },
}
</script>
