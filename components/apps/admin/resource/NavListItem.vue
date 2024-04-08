<template>
  <v-list-item two-line
               ripple
               :to="{name: 'apps-admin-resources-resourceId', params: {resourceId: resourceId}}">

    <v-list-item-avatar>
      <!-- replace with apps-admin-resource-avatar -->
<!--      <v-avatar color="primary">-->
<!--        <v-icon>mdi-file</v-icon>-->
<!--      </v-avatar>-->

      <base-avatar
        size="xs"
        :avatar="url"
      />

    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ resourceId }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('resource-resource-id') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>


<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NavListItem",
  props: {
    // the name of the Theme  - i.e. `default`
    resourceId: {
      type: String,
      required: true,
    }
  },

  async created() {
    await this.load();
  },

  watch: {
    async resourceId(val) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
   //   loadResourceWithResourceId: 'apps/admin/resources/loadResourceWithResourceId',
      loadResourceUrlWithResourceId: 'apps/admin/resources/loadResourceUrlWithResourceId',
    }),

    async load () {
   //   await this.loadResourceWithResourceId(this.resourceId);
      return await (this.resourceId) ? this.loadResourceUrlWithResourceId(this.resourceId) : undefined;
    },
  },

  computed: {
    ...mapGetters({
      resourceWithResourceId: 'apps/admin/resources/resourceWithResourceId',
    }),

    resource () {
      return (this.resourceId) ? this.resourceWithResourceId(this.resourceId) : undefined;
    },

    name () {
      return (this.resource) ? this.resource.name : undefined;
    },

    url () {
      return (this.resource) ? this.resource.url : undefined;
    },

    loaded () {
      return (this.resource) ? this.resource.loaded : false;
    },

    loading () {
      return (this.resource) ? this.resource.loading : false;
    },
  },
}
</script>

