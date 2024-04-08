
<template>
  <!-- take the user to the actual home page -->
  <v-tooltip right open-on-hover nudge-right="10" open-delay="300"  transition="slide-x-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn  v-bind="attrs"
              @click="handleClick" v-on="on" icon :color="$route.name === 'index' ? 'primary': null">
        <v-img
          v-if="avatar && image"
          :src="image"
          max-width="30"
          contain
        ></v-img>

        <base-avatar
          size="xs"
          :color="color"
          :icon="icon"
          :avatar="image"
        />

<!--        <v-img-->
<!--          v-else-if="! logo && defaultLogo"-->
<!--          :src="require('~/assets/ivent-pro-teal.png')"-->
<!--          max-width="30"-->
<!--          contain-->
<!--        ></v-img>-->

<!--        <v-icon v-else>-->
<!--          mdi-home-->
<!--        </v-icon>-->

      </v-btn>
    </template>

    <span>{{ $t('home') }}</span>
  </v-tooltip>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "VenueLogo",

  async created() {
    if (this.initialised) {
      if (! this.loaded && ! this.loading) {
        await this.load();
      }
    }
  },

  methods: {
    ...mapActions({
      load: 'areas/load',
    }),

    handleClick(){
      if (this.numberOfAreas > 1) {
        this.$emit('open-nav')
      } else {
        this.$router.push({name: 'index'})
      }
    }
  },

  computed: {
    ...mapGetters({
      venue: 'venue/venue',
      initialised: 'areas/initialised',
      loading: 'areas/loading',
      loaded: 'areas/loaded',
      numberOfAreas: 'areas/numberOfAreas',
    }),

    /**
     avatar: {
        icon: "mdi-abugida-devanagari",
        color: '#FF0000FF',
        image: '',
        resourceId: ''
      }
     */
    avatar(){
      return this.venue?.avatar
    },

    icon(){
      return this.avatar?.icon || this.defaultIcon
    },

    color(){
      return this.avatar?.color
    },

    image(){
      return this.avatar?.image
    },

    resourceId(){
      return this.avatar?.resourceId
    },
  },

  data: () => ({
    defaultLogo: true, // default Pro logo in case of fallback
    defaultIcon: 'mdi-home',
  }),

}
</script>
