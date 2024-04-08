<template>
  <v-card>
    <v-card-title>
      <v-icon left>mdi-file</v-icon>
      {{ $t('resource-details') }}

      <template v-if="$vuetify.breakpoint.name === 'xs'">
        <v-spacer />
        <v-btn icon :loading="loading" :disabled="loading" @click="reload">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </template>

      <template v-else>
        <v-spacer />
        <v-btn rounded :loading="loading" :disabled="loading" @click="reload">
          <v-icon left>mdi-refresh</v-icon>{{ $t('reload') }}
        </v-btn>
      </template>
    </v-card-title>
    <v-card-subtitle>{{ $t('resource-details-subtitle')}}</v-card-subtitle>

    <v-card-text>
      <v-list two-line>
        <apps-admin-resource-list-item :resource-id="resourceId" />
      </v-list>
    </v-card-text>

    <v-card-text v-if="debug">
      <pre>{{ resource }}</pre>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Details",

  props: {
    resourceId: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    debug: false,
  }),

  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    resourceId: {
      handler () {
        if (! this.loaded && ! this.loading) {
          this.load();
        }
      },
    }
  },

  methods: {
    ...mapActions({
      loadResourceWithResourceId: 'apps/admin/resources/loadResourceWithResourceId',
    }),

    async load () {
      return await (this.resourceId) ? this.loadResourceWithResourceId(this.resourceId) : undefined;
    },

    async reload () {
      return await this.load();
    },
  },

  computed: {
    ...mapGetters({
      resourceWithResourceId: 'apps/admin/resources/resourceWithResourceId',
    }),

    /**
     * Return the Theme.
     *
     * @return {*|undefined}
     */
    resource () {
      return (this.resourceId) ? this.resourceWithResourceId(this.resourceId) : undefined;
    },

    loading () {
      return (this.resource) ? this.resource.loading : false;
    },

    loaded () {
      return (this.resource) ? this.resource.loaded : false;
    },
  },
}
</script>
