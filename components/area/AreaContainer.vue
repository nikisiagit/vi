<!--
Render the Area
-->
<template>
  <v-sheet elevation="1"
           rounded="lg"
           class="glass-effect"
           :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'"
  >

    <v-card :loading="loading"
            height="100%"
            color="transparent"
            flat>

      <template slot="progress">
        <v-progress-linear height="4" indeterminate />
      </template>


      <v-card-title>{{ $t(titleId) }}</v-card-title>
      <v-card-subtitle>{{ $t(descriptionId) }}</v-card-subtitle>

<!--      <pre>{{ areaId }}</pre>-->

<!--      <template>-->
<!--        <v-skeleton-loader type="heading"/>-->
<!--      </template>-->

      <v-fade-transition mode="out-in">
        <!-- the components that belong to the Area with AreaId -->
        <area-components-container :area-id="areaId" />
        <!-- /the components that belong to the Area with AreaId -->

        <!-- area loader -->
<!--        <area-loader-home />-->
        <!-- /area loader -->
      </v-fade-transition>

    </v-card>

  </v-sheet>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "AreaContainer",

  props: {
    areaId: {
      type: String,
      required: true,
    },
  },

  async created() {
    if (this.initialised) {
      if (! this.loaded && ! this.loading) {
        await this.load();
      }
    }
  },

  watch: {
    areaId: {
      handler () {
        if (this.initialised) {
          if (!this.loaded && !this.loading) {
            this.load();
          }
        }
      },
    }
  },

  methods: {
    ...mapActions({
      loadAreaWithAreaId: 'areas/loadAreaWithAreaId',
    }),

    async load () {
      return await (this.areaId) ? this.loadAreaWithAreaId(this.areaId) : undefined;
    },

    async reload () {
      return await this.load();
    },
  },

  computed: {
    ...mapGetters({
      initialised: 'areas/initialised',
      areaWithAreaId: 'areas/areaWithAreaId',
      loading: 'areas/loading',
      loaded: 'areas/loaded',
      areas: 'areas/areas',
    }),

    area() {
      return (this.areaId) ? this.areaWithAreaId(this.areaId) : undefined;
    },

    titleId() {
      return this.area?.titleId;
    },

    descriptionId() {
      return this.area?.descriptionId;
    },

    default() {
      return this.area?.default;
    },

    name() {
      return this.area?.name;
    },
  }
}
</script>
