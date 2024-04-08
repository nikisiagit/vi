<template>
  <v-container fluid>
    <v-row justify="center" no-gutters>
      <v-col cols="12" sm="12" md="9">
<!--             :lg="(sideNavigationOpen || sideActivityNavigationOpen) ? 10: 7" -->
<!--             :xl="(sideNavigationOpen || sideActivityNavigationOpen) ? 9: 6"-->

        <v-sheet elevation="1" rounded="lg" :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'" class="glass-effect">

          <v-card :loading="loading" height="100%" class="rounded-lg" color="transparent" flat>
            <template slot="progress">
              <v-progress-linear height="4" indeterminate />
            </template>

            <template v-if="loading">
              <v-skeleton-loader
                type="heading"
                class="mt-2 mb-4"
                width="30%"
              ></v-skeleton-loader>
            </template>

            <!--      <v-toolbar v-else flat>-->
            <!--        <v-toolbar-title class="text-h5 font-weight-bold">-->
            <!--          {{ $t(name) }}-->
            <!--        </v-toolbar-title>-->
            <!--      </v-toolbar>-->


            <v-fade-transition mode="out-in">
              <!-- the components that belong to the Area with AreaId -->
              <!-- Display the components container just when Area name exists. -->
              <area-components-container
                v-if="name"
                :area-id="areaId"
              />
              <!-- /the components that belong to the Area with AreaId -->

              <!-- area loader -->
              <area-loader-home v-else/>
              <!-- /area loader -->
            </v-fade-transition>


            <!-- debug: area -->
            <v-row v-show="debug" class="deep-purple">
              <v-col>
                area-name: {{ name }}
                <br/>
                areaId: {{ areaId }}
                <br/>
                area object:
                <pre>
            {{ area }}
          </pre>
              </v-col>
            </v-row>
            <!-- /debug: area-->


          </v-card>

        </v-sheet>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "AreaContainer",
  props: {
    areaId: {
      type: String,
      required: true
    }
  },
  data(){
    return {
      debug: false
    }
  },

  async created(){
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      loadAreaWithAreaId: 'areas/loadAreaWithAreaId',
    }),

    async load () {
      return await (this.areaId) ? this.loadAreaWithAreaId(this.areaId) : undefined;
    },
  },

  computed: {
    ...mapGetters({
      areaWithAreaId: 'areas/areaWithAreaId',
      sideNavigationOpen: 'app/sideNavigationOpen',
    }),

    styles () {
      if (! this.sideNavigationOpen) {
        return {
          padding: this.$vuetify.breakpoint.mdAndUp ? '0 15vw': '0 5vw',
          height: '100%',
          // transition: 'all 0.5s ease-out'
        }
      }

      return {
        // transition: 'all 0.5s ease-in-out'
      }
    },

    area () {
      return (this.areaId) ? this.areaWithAreaId(this.areaId) : undefined;
    },

    loading () {
      return (this.area) ? this.area.loading : false;
    },

    loaded () {
      return (this.area) ? this.area.loaded : false;
    },

    error () {
      return (this.area) ? this.area.error : undefined;
    },

    name () {
      return (this.area) ? this.area.name : undefined;
    },
  }
}
</script>
