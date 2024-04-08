<template>
  <v-card outlined :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-toolbar flat>
      <v-icon left>mdi-advertisements</v-icon>

      <v-toolbar-title>
        {{ $t('advertisement') }}
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
<!--          {{ advertisementComponent }}-->
<!--        </pre>-->
<!--      </div>-->

      <!-- advertisement List -->
      <v-list two-line v-if="advertisementComponent && advertisementId">
        <apps-admin-area-advertisement-list-item
          :advertisement-id="advertisementId"
          :area-id="areaId"
          :component-id="componentId"
          @edit="openUpdateAdvertisementDialog"
        ></apps-admin-area-advertisement-list-item>
      </v-list>
      <!-- /advertisement List -->

      <v-container v-else fluid>
        <v-row>
          <v-col >
            <v-btn block @click="openUpdateAdvertisementDialog">
              <v-icon left>mdi-pencil</v-icon>

              {{ $t('update-advertisement') }}
            </v-btn>

          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn block nuxt link :to="{ name: 'apps-admin-advertisements'}">
              <v-icon left>mdi-advertisements</v-icon>

              {{ $t('new-advertisement') }}
            </v-btn>
          </v-col>
        </v-row>

      </v-container>

    </v-card-text>

    <v-dialog
      v-model="updateAdvertisementDialog"
      width="800px"
    >
      <apps-admin-area-update-advertisement
        v-if="updateAdvertisementDialog"
        :area-id="areaId"
        :component-id="componentId"
        @close="updateAdvertisementDialog = false;"
      ></apps-admin-area-update-advertisement>
    </v-dialog>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Advertisement",
  props: {
    areaId: {
      type: String
    }
  },
  data(){
    return {
      updateAdvertisementDialog: false,
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/areas/loadComponentWithComponentId',
    }),

    async reload () {
      return await this.load({
        areaId: this.areaId,
        componentId: this.componentId
      });
    },

    openUpdateAdvertisementDialog(){
      this.updateAdvertisementDialog = true;
    },
  },
  computed: {
    ...mapGetters({
      componentWithAreaIdAndComponentType: 'apps/admin/areas/componentWithAreaIdAndComponentType',
    }),

    advertisementComponent () {
      return (this.areaId) ? this.componentWithAreaIdAndComponentType(this.areaId, 'advertisement') : undefined;
    },

    advertisementId () {
      return (this.advertisementComponent) ? this.advertisementComponent.advertisementId : undefined;
    },

    componentId () {
      return (this.advertisementComponent) ? this.advertisementComponent.componentId : undefined;
    },

    loaded () {
      return (this.advertisementComponent) ? this.advertisementComponent.loaded : false;
    },

    loading () {
      return (this.advertisementComponent) ? this.advertisementComponent.loading : true;
    },

    error () {
      return (this.advertisementComponent) ? this.advertisementComponent.error : undefined;
    }
  }
}
</script>

