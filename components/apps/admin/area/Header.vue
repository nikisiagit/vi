<template>
  <v-card outlined :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-toolbar flat>
      <v-icon left>mdi-image-size-select-actual</v-icon>

      <v-toolbar-title>
        {{ $t('header') }}
      </v-toolbar-title>
      <v-spacer />

      <v-btn rounded :loading="loading" :disabled="loading" @click="reload">
        <v-icon left>mdi-refresh</v-icon>{{ $t('reload') }}
      </v-btn>

    </v-toolbar>

    <v-divider></v-divider>
    <v-card-text>

<!--      <div>-->
<!--        <pre>-->
<!--          {{ headerComponent }}-->
<!--        </pre>-->
<!--      </div>-->

      <!-- Header Resource List -->
      <v-list two-line v-if="headerComponent && resourceId">
        <apps-admin-area-header-list-item
          :resource-id="resourceId"
          :area-id="areaId"
          :component-id="componentId"
          @edit="openUpdateHeaderDialog"
        ></apps-admin-area-header-list-item>
      </v-list>
      <!-- /Header Resource List -->

      <!-- Upload Resource -->
      <v-container v-else fluid>

        <!-- updating component with resourceId -->
        <template v-if="updatingComponent">
          <!-- the loader -->
          <v-card-text class="text-center" v-show="updatingComponent.updating">
            {{ $t('updating') }}...

            <v-progress-linear class="mt-2" indeterminate />
          </v-card-text>
        </template>
        <!-- /updating component with resourceId -->

        <v-row>
          <v-col>
            <apps-admin-resources-create-resource
              v-if="! uploadedResourceId"
              item-id="component"
              @resource-created="changeResourceId"
              :display-as-card="false"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col align="end">
            <v-btn block @click="openUpdateHeaderDialog">
              <v-icon left>mdi-pencil</v-icon>

              {{ $t('update-header-with-a-resource') }}
            </v-btn>
          </v-col>
        </v-row>

      </v-container>
      <!-- /Upload Resource -->

    </v-card-text>

    <v-dialog
      v-model="updateHeaderDialog"
      width="800px"
    >
      <apps-admin-area-update-header
        v-if="updateHeaderDialog"
        :component-id="componentId"
        :area-id="areaId"
        @close="updateHeaderDialog = false;"
      ></apps-admin-area-update-header>
    </v-dialog>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Header",
  props: {
    areaId: {
      type: String,
      required: true
    }
  },
  data(){
    return {
      updateHeaderDialog: false,

      uploadedResourceId: undefined,
      executionArn: undefined,
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/areas/loadComponentWithComponentId',

      updateComponent: 'apps/admin/areas/updateComponent'
    }),

    async reload () {
      return await this.load({
        areaId: this.areaId,
        componentId: this.componentId
      });
    },

    openUpdateHeaderDialog(){
      this.updateHeaderDialog = true;
    },

    async changeResourceId(resourceId){
      this.uploadedResourceId = resourceId

      // update the header with the resourceId
      const updatingComponent = await this.updateComponent({
        componentId: this.componentId,
        areaId: this.areaId,
        resourceId: resourceId
      })

      if (updatingComponent) {

        const {executionArn, startDate} = updatingComponent;

        //@todo: handle errors
        //@todo: show messages success/failure

        this.executionArn = executionArn;
      } else {
        console.log("throw error from step function...")
      }
    }
  },
  computed: {
    ...mapGetters({
      componentWithAreaIdAndComponentType: 'apps/admin/areas/componentWithAreaIdAndComponentType',

      updatingComponentWithExecutionArn: 'apps/admin/areas/updatingComponentWithExecutionArn',
    }),

    updatingComponent () {
      return (this.executionArn) ? this.updatingComponentWithExecutionArn(this.executionArn) : undefined;
    },

    headerComponent () {
      return (this.areaId) ? this.componentWithAreaIdAndComponentType(this.areaId, 'header') : undefined;
    },

    resourceId () {
      return (this.headerComponent) ? this.headerComponent.resourceId : undefined;
    },

    componentId () {
      return (this.headerComponent) ? this.headerComponent.componentId : undefined;
    },

    loaded () {
      return (this.headerComponent) ? this.headerComponent.loaded : false;
    },

    loading () {
      return (this.headerComponent) ? this.headerComponent.loading : true;
    },

    error () {
      return (this.headerComponent) ? this.headerComponent.error : undefined;
    }
  }
}
</script>

