<!--
Apps Admin - Venue Details

A smart component that renders tht details of the Venue.
-->
<template>
  <v-card :loading="loading">

    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-store</v-icon>
      {{ $t('admin-venue-details') }}
      <v-spacer />
    </v-card-title>

    <v-list>
      <!-- name -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ name }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-venue-name') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- status -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ status }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-venue-status') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="primary" @click="onEdit('status')">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <!-- title id -->
      <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>{{ titleId }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('admin-venue-title-id') }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon color="primary" @click="onEdit('title')">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-list-item-action>
      </v-list-item>

      <!-- description id -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ descriptionId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-venue-description-id') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="primary" @click="onEdit('description')">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <!-- currency id -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ currencyId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-venue-currency-id') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="primary" @click="onEdit('currency')">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <!-- language id -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ languageId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-venue-language-id') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="primary" @click="onEdit('language')">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>


      <!-- timezone id -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ timezoneId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-venue-timezone-id') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="primary" @click="onEdit('timezone')">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>


      <!-- theme id -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ themeId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-venue-theme-id') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="primary" @click="onEdit('theme')">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <!-- address id -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ addressId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-venue-address-id') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="primary" @click="onEdit('address')">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>


            <!-- header id -->
      <!--      <v-list-item two-line>-->
      <!--        <v-list-item-content>-->
      <!--          <v-list-item-title>{{ headerId }}</v-list-item-title>-->
      <!--          <v-list-item-subtitle>{{ $t('admin-venue-header-id') }}</v-list-item-subtitle>-->
      <!--        </v-list-item-content>-->
      <!--      </v-list-item>-->


      <!-- account manager -->
      <!--      <v-list-item two-line>-->
      <!--        <v-list-item-content>-->
      <!--          <v-list-item-title>{{ accountManager }}</v-list-item-title>-->
      <!--          <v-list-item-subtitle>{{ $t('admin-venue-account-manager') }}</v-list-item-subtitle>-->
      <!--        </v-list-item-content>-->
      <!--      </v-list-item>-->

      <!-- licence -->
      <!--      <v-list-item two-line>-->
      <!--        <v-list-item-content>-->
      <!--          <v-list-item-title>{{ licence }}</v-list-item-title>-->
      <!--          <v-list-item-subtitle>{{ $t('admin-venue-licence') }}</v-list-item-subtitle>-->
      <!--        </v-list-item-content>-->
      <!--        <v-list-item-action>-->
      <!--          <v-btn icon color="primary" @click="onEdit('license')">-->
      <!--            <v-icon>mdi-pencil</v-icon>-->
      <!--          </v-btn>-->
      <!--        </v-list-item-action>-->
      <!--      </v-list-item>-->

    </v-list>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Details",

  async created () {
    // if (this.initialised) {
      if (! this.loaded && ! this.loading) {
        await this.load();
      }
    // }
  },

  watch: {
    initialised: {
      immediate: true,
      handler () {
        if (this.initialised) {
          if (! this.loaded && ! this.loading) {
            this.load();
          }
        }
      }
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/venue/load',
    }),

    onEdit(property){
      this.$emit('update-venue-property', property)

    },
  },

  computed: {
    ...mapGetters({
      venue: 'apps/admin/venue/venue',
      loaded: 'apps/admin/venue/loaded',
      loading: 'apps/admin/venue/loading',
      initialised: 'apps/admin/venue/initialised',
    }),

    venueId () {
      return (this.venue) ? this.venue.venueId : undefined;
    },

    name () {
      return (this.venue) ? this.venue.name : undefined;
    },

    access () {
      return (this.venue) ? this.venue.access : undefined;
    },

    status () {
      return (this.venue) ? this.venue.status : undefined;
    },

    titleId () {
      return (this.venue) ? this.venue.titleId : undefined;
    },

    descriptionId () {
      return (this.venue) ? this.venue.descriptionId : undefined;
    },

    headerId () {
      return (this.venue) ? this.venue.headerId : undefined;
    },

    currencyId () {
      return (this.venue) ? this.venue.currencyId : undefined;
    },

    languageId () {
      return (this.venue) ? this.venue.languageId : undefined;
    },

    licence () {
      return (this.venue) ? this.venue.licence : undefined;
    },

    timezoneId () {
      return (this.venue) ? this.venue.timezoneId : undefined;
    },

    userPoolId () {
      return (this.venue) ? this.venue.userPoolId : undefined;
    },

    userPoolRegion () {
      return (this.venue) ? this.venue.userPoolRegion : undefined;
    },

    webClientId () {
      return (this.venue) ? this.venue.webClientId : undefined;
    },

    themeId () {
      return (this.venue) ? this.venue.themeId : undefined;
    },

    addressId () {
      return (this.venue) ? this.venue.addressId : undefined;
    },

    accountManager () {
      return (this.venue) ? this.venue.accountManager : undefined;
    },

    socialSignInProviders () {
      return (this.venue) ? this.venue.socialSignInProviders : undefined;
    },
  },
}
</script>
