<template>
  <v-card outlined hover
          :href="href"
          :loading="loading"
          target="_blank">

    {{ advertisement }}

    <!-- venue Advertisement loading -->
    <v-skeleton-loader
      type="image"
      v-show="loading"
      height="80"
    ></v-skeleton-loader>
    <!-- /venue Advertisement loading -->

    <!-- Custom Advertisement -->
    <v-list v-show="! loading && venueAdvertisementImage" class="pa-0">
      <v-list-item>
        <v-list-item-avatar
          class="my-0"
          size="100"
          tile
        >
          <v-img
            :alt="venueAdvertisementText"
            :src="venueAdvertisementImage"
            contain
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-wrap">
            {{ venueAdvertisementText }}
          </v-list-item-title>

          <!-- powered by -->
          <v-list-item-subtitle class="mt-2 text-overline" :class="{'text-right': $vuetify.breakpoint.mdAndDown}">
            {{ venueAdvertisementPoweredBy }}
          </v-list-item-subtitle>
        </v-list-item-content>

      </v-list-item>
    </v-list>
    <!-- / Custom Advertisement -->

    <v-list :color="advertisementBackgroundColour" v-show="! loading" class="pa-0">
      <v-list-item>
        <v-list-item-avatar
          class=""
          size="70"
          tile
        >
          <v-img
            :alt="advertisementText"
            :src="resourceUrl"
            contain
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-wrap">
            {{ advertisementText }}
          </v-list-item-title>

          <!-- powered by -->
          <v-list-item-subtitle class="mt-2 text-overline" :class="{'text-right': $vuetify.breakpoint.mdAndDown}">
            {{ advertisementLabel }}
          </v-list-item-subtitle>
        </v-list-item-content>

      </v-list-item>
    </v-list>
    <!-- / Advertisement-->


    <!-- venue Advertisement empty -->
    <v-skeleton-loader
      type="image"
      boilerplate
      height="80"
      v-show="! venueAdvertisementImage"
    ></v-skeleton-loader>
    <!-- /venue Advertisement empty -->

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'Advertisement',

  props: {
    advertisementId: {
      type: String,
      required: true,
    }
  },

  watch: {
    advertisementId: {
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
      loadAdvertisementWithAdvertisementId: 'advertisements/loadAdvertisementWithAdvertisementId',
      // loadResourceWithResourceId: 'apps/admin/resources/loadResourceWithResourceId',
      // loadResourceUrlWithResourceId: 'apps/admin/resources/loadResourceUrlWithResourceId',
    }),

    async load () {
      return await (this.advertisementId)
        ? this.loadAdvertisementWithAdvertisementId(this.advertisementId)
        : undefined;
    },

    async reload () {
      return await this.load();
    },


    // async loadResource () {
    //   return await (this.resourceId) ? this.loadResourceWithResourceId(this.resourceId) : undefined;
    // },
    //
    // async loadResourceUrl () {
    //   return await (this.resourceId) ? this.loadResourceUrlWithResourceId(this.resourceId) : undefined;
    // },
  },

  computed: {
    ...mapGetters({
      initialised: 'components/initialised',
      advertisementWithAdvertisementId: 'advertisements/advertisementWithAdvertisementId',
    }),

    advertisement () {
      return (this.advertisementId)
        ? this.advertisementWithAdvertisementId(this.advertisementId)
        : undefined;
    },

    loading () {
      return (this.advertisement) ? this.advertisement.loading : false;
    },

    loaded () {
      return (this.advertisement) ? this.advertisement.loaded : false;
    },

    error () {
      return (this.advertisement) ? this.advertisement.error : undefined;
    },



    // ...mapGetters({
    //   componentWithAreaIdAndComponentType: 'areas/componentWithAreaIdAndComponentType',
    //
    //   resourceWithResourceId: 'apps/admin/resources/resourceWithResourceId',
    // }),

    // qParameters(){
    //   return this.$route.query
    // },
    //
    // isUniProDemo(){
    //   return this.qParameters['d'] && this.qParameters['d'] === 'uni'
    // },


    advertisementName () {
      return (this.advertisementId) ? this.advertisementId.split(':')[2] : undefined;
    },

    advertisementBackgroundColour () {
      return (this.advertisement) ? this.advertisement.backgroundColour : undefined;
    },

    advertisementLabel () {
      return (this.advertisement) ? this.advertisement.label : undefined;
    },

    advertisementText () {
      return (this.advertisement) ? this.advertisement.text : undefined;
    },

    advertisementLink () {
      return (this.advertisement) ? this.advertisement.link : undefined;
    },

    advertisementLinkUrl () {
      return (this.advertisementLink) ? `https://${this.advertisement.link.url}` : undefined;
    },

    advertisementLinkTarget () {
      return (this.advertisementLink) ? this.advertisement.link.target : undefined;
    },

    resourceId () {
      return (this.advertisement) ? this.advertisement.resourceId : undefined;
    },




    // the resource
    resource () {
      return (this.resourceId) ? this.resourceWithResourceId(this.resourceId) : undefined;
    },

    resourceName () {
      return (this.resource) ? this.resource.name : undefined;
    },

    resourceUrl () {
      return (this.resource) ? this.resource.url : undefined;
    },

    resourceLoaded () {
      return (this.resource) ? this.resource.loaded : false;
    },

    resourceLoading () {
      return (this.resource) ? this.resource.loading : false;
    },

    venueAdvertisementText(){
      return 'SOME TEXT'
    },
    venueAdvertisementPoweredBy(){
      return 'power by LUIS'
    },
    venueAdvertisementImage(){
      // return require('~/assets/mailchimp.png')
    },
    venueAdvertisementLink(){
      return 'www.monkey.com'
    },
  },
}
</script>
