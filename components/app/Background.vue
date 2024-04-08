<!--
This is the "Partition - Venue Background"

@link
-->
<template>
  <div :style="styles">
    <slot></slot>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Background",
  computed: {
    ...mapGetters({
      venue: 'venue/venue',
      loading: 'venue/loading',
      loaded: 'venue/loaded',

      themeWithThemeId: 'themes/themeWithThemeId', // add themeId to the Venue.
    }),


    themeId () {
      return this.venue?.themeId;
    },

    /**
     * Retrieve the Theme background attribute.
     *
     * Use the background object to create a `styles` object that we can use to style the <v-main>
     *
     * @returns {*}
     */
    background () {
      return this.theme?.background;

      // the background schema is:
      // {
      //  color: 'primary', // hex code whatever,
      //  image: {
      //    src: ''
      //  }
      // }

      // return an object that can be used to create the `styles` | This object matches CSS styles.
      // {
      //   backgroundImage: `url(${ this.background.image.src })`,
      // }
      // we will update the Venue object with a `background` property/attribute
    },

    styles () {
      const background = this.background;

      if (background) {
        return {
          backgroundColor: `var(--v-primary-base)`, // loaded from the Theme
          ...background,
          ...{
            // default attributes that are always present... maybe
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
          }
        }
      }

      return {
        backgroundColor: `var(--v-primary-base)`, // loaded from the Theme

        // default attributes that are always present...
        height: '100%',
      };
    },
  },

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      load: 'venue/load',
      loadThemeWithThemeId: 'themes/loadThemeWithThemeId',
    }),
  },
}
</script>
