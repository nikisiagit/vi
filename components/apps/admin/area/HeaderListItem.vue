<template>
  <v-list-item>

    <v-list-item-avatar>

      <base-avatar
        size="xs"
        :avatar="url"
      />

    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ resourceId }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('resource-id') }}</v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon @click="$emit('edit')">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-list-item-action>

    <v-list-item-action>
      <v-btn color="error" icon @click="removeHeader" :loading="updatingComponent && updatingComponent.updating" :disabled="updatingComponent && updatingComponent.updating">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>


<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "HeaderListItem",
  props: {
    // the name of the Theme  - i.e. `default`
    areaId: {
      type: String,
    },
    resourceId: {
      type: String,
    },
    componentId: {
      type: String,
    }
  },

  data(){
    return {
      executionArn: undefined,
    }
  },

  async created() {
    if (! this.resourcesLoading && ! this.resourcesLoaded) {
      await this.loadResources();
    }
  },

  methods: {
    ...mapActions({
      loadResources: 'apps/admin/resources/load',
      loadResourceUrlWithResourceId: 'apps/admin/resources/loadResourceUrlWithResourceId',

      updateComponent: 'apps/admin/areas/updateComponent'
    }),

    async load () {
      return await (this.resourceId) ? this.loadResourceUrlWithResourceId(this.resourceId) : undefined;
    },

    async removeHeader(){

      const updatingComponent = await this.updateComponent({
        componentId: this.componentId,
        areaId: this.areaId,
        resourceId: null
      })

      if (updatingComponent) {

        const {executionArn, startDate} = updatingComponent;

        //@todo: handle errors
        //@todo: show messages success/failure

        this.executionArn = executionArn;
      } else {
        console.log("throw error from step function...")
      }
    },
  },

  watch: {
    resourceId: {
      immediate: true,
      async handler(){
        await this.load();
      }
    }
  },

  computed: {
    ...mapGetters({
      resourcesLoading: 'apps/admin/resources/loading',
      resourcesLoaded: 'apps/admin/resources/loaded',
      resourceWithResourceId: 'apps/admin/resources/resourceWithResourceId',

      updatingComponentWithExecutionArn: 'apps/admin/areas/updatingComponentWithExecutionArn',
    }),

    updatingComponent () {
      return (this.executionArn) ? this.updatingComponentWithExecutionArn(this.executionArn) : undefined;
    },

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

