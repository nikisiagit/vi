<template>
  <v-card :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-page-layout-header</v-icon>
<!--      {{ $t('label:region:app:admin:area-details') }}-->
      {{ name }}

      <v-spacer />

      <v-btn rounded :loading="loading" :disabled="loading" @click="reload">
        <v-icon left>mdi-refresh</v-icon>{{ $t('reload') }}
      </v-btn>
    </v-card-title>

    <v-card-subtitle>{{ $t('area') }}</v-card-subtitle>

    <v-card-text class="pt-4 pb-10">

      <v-row>
        <v-col>
          <v-subheader class="text-h6">
            <v-icon left >
              mdi-select-group
            </v-icon>
            {{ $t('components') }}
            <v-divider inset></v-divider>
          </v-subheader>

        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <!-- header -->
          <apps-admin-area-header :area-id="areaId"></apps-admin-area-header>
          <!-- /header -->
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <!-- advertisement -->
          <apps-admin-area-advertisement :area-id="areaId"></apps-admin-area-advertisement>
          <!-- /advertisement -->
        </v-col>
      </v-row>


      <v-row>
        <v-col>
          <!-- about -->
          <apps-admin-area-about :area-id="areaId"></apps-admin-area-about>
          <!-- /about -->
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <!-- events list -->
          <apps-admin-area-events-list :area-id="areaId"></apps-admin-area-events-list>
          <!-- /events list -->
        </v-col>
      </v-row>

    </v-card-text>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Details",

  props: {
    areaId: {
      type: String,
      required: true,
    },
  },

  data(){
    return {

    }
  },

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }

    if (! this.componentsLoaded && ! this.componentsLoading) {
      await this.loadComponents();
    }
  },

  watch: {
    areaId: {
      async handler () {
        console.log(`## ADDRESS DETAILS WATCHER`)
        if (! this.loaded && ! this.loading) {
          await this.load();
        }
      }
    }
  },

  methods: {
    ...mapActions({
      loadAreaWithAreaId: 'apps/admin/areas/loadAreaWithAreaId',

      loadComponentsWithAreaId: 'apps/admin/areas/loadComponentsWithAreaId',
    }),

    async load() {
      return await (this.areaId) ? this.loadAreaWithAreaId(this.areaId) : undefined;
    },

    async loadComponents() {
      return await (this.areaId) ? this.loadComponentsWithAreaId(this.areaId) : undefined;
    },


    async reload () {
      return await this.load();
    },
  },

  computed: {
    ...mapGetters({
      areaWithAreaId: 'apps/admin/areas/areaWithAreaId',
    }),

    area () {
      return (this.areaId) ? this.areaWithAreaId(this.areaId) : undefined;
    },

    name () {
      return (this.area) ? this.area.name : undefined;
    },

    loaded () {
      return (this.area) ? this.area.loaded : false;
    },

    loading () {
      return (this.area) ? this.area.loading : false;
    },

    error () {
      return (this.area) ? this.area.error : undefined;
    },

    componentsLoaded () {
      return (this.area) ? this.area.componentsLoaded : false;
    },

    componentsLoading () {
      return (this.area) ? this.area.componentsLoading : false;
    },

    componentsError () {
      return (this.area) ? this.area.componentsError : undefined;
    }
  }
}
</script>

