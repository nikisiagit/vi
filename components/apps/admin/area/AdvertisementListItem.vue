<template>
  <v-list-item>

    <v-list-item-content>
      <v-list-item-title>{{ advertisementId }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('advertisement-id') }}</v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon @click="$emit('edit')">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-list-item-action>

    <v-list-item-action>
      <v-btn color="error" icon @click="removeAdvertisement" :loading="updatingComponent && updatingComponent.updating" :disabled="updatingComponent && updatingComponent.updating">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>


<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "AdvertisementListItem",
  props: {
    // the name of the Theme  - i.e. `default`
    areaId: {
      type: String,
    },
    advertisementId: {
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
    if (! this.advertisementsLoading && ! this.advertisementsLoaded) {
      await this.loadAdvertisements();
    }
  },

  methods: {
    ...mapActions({
      loadAdvertisements: 'apps/admin/advertisements/load',
      loadAdvertisementWithName: 'apps/admin/advertisements/loadAdvertisementWithName',

      updateComponent: 'apps/admin/areas/updateComponent'
    }),

    // async load () {
    //   return await (this.name) ? this.loadAdvertisementWithName(this.name) : undefined;
    // },

    async removeAdvertisement(){
      const updatingComponent = await this.updateComponent({
        componentId: this.componentId,
        areaId: this.areaId,
        advertisementId: null
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

  // watch: {
  //   advertisementId: {
  //     immediate: true,
  //     async handler(){
  //       await this.load();
  //     }
  //   }
  // },

  computed: {
    ...mapGetters({
      advertisementsLoading: 'apps/admin/advertisements/loading',
      advertisementsLoaded: 'apps/admin/advertisements/loaded',
      advertisementWithAdvertisementId: 'apps/admin/advertisements/advertisementWithAdvertisementId',

      updatingComponentWithExecutionArn: 'apps/admin/areas/updatingComponentWithExecutionArn',
    }),

    updatingComponent () {
      return (this.executionArn) ? this.updatingComponentWithExecutionArn(this.executionArn) : undefined;
    },

    advertisement () {
      return (this.advertisementId) ? this.advertisementWithAdvertisementId(this.advertisementId) : undefined;
    },

    name () {
      return (this.advertisement) ? this.advertisement.name : undefined;
    },

    loaded () {
      return (this.advertisement) ? this.advertisement.loaded : false;
    },

    loading () {
      return (this.advertisement) ? this.advertisement.loading : false;
    },
  },
}
</script>

