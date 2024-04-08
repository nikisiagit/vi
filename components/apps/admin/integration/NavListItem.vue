<template>
  <v-list-item two-line :to="{name: 'apps-admin-integrations-name', params: {name: name}}">
    <v-list-item-content>
      <v-list-item-title>{{ name }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('integration') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NavListItem",

  props: {
    name: {
      type: String,
      required: true,
    }
  },

  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    name: {
      handler () {
        if (! this.loaded && ! this.loading) {
          this.load();
        }
      },
    }
  },

  methods: {
    ...mapActions({
      loadIntegrationWithName: 'apps/admin/integrations/loadIntegrationWithName',
    }),

    async load () {
      return await (this.name) ? this.loadIntegrationWithName(this.name) : undefined;
    },

    async reload () {
      return await this.load();
    },
  },

  computed: {
    ...mapGetters({
      integrationWithName: 'apps/admin/integrations/integrationWithName',
    }),

    /**
     * Return the Integration.
     *
     * @return {*|undefined}
     */
    integration () {
      return (this.name) ? this.integrationWithName(this.name) : undefined;
    },

    /**
     * Return the loading state of the Integration.
     *
     * @return {*|boolean}
     */
    loading () {
      return (this.integration) ? this.integration.loading : false;
    },

    /**
     * Return the loaded state of the Integration.
     *
     * @return {*|boolean}
     */
    loaded () {
      return (this.integration) ? this.integration.loaded : false;
    },
  },
}
</script>

