<!--
[PRO-216] Region - Components

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-216

Advertisement Component
-->
<template>
  <v-card :loading="loading">

    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-advertisements</v-icon>
      {{ $t(titleId) }}
    </v-card-title>
    <v-card-subtitle>{{ $t(descriptionId) }}</v-card-subtitle>

    <!-- Advertisement loading -->
    <v-skeleton-loader
      type="image"
      v-show="loading"
      height="80"
    />
    <!-- / Advertisement loading -->

    <!-- @todo - can we transition this in? -->
    <v-container fluid>
      <v-row>
        <v-col>
          <!-- Advertisement -->
          <advertisement :advertisement-id="advertisementId" v-if="advertisementId"/>
          <!-- /Advertisement -->
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Advertisement from '../../advertisement/Advertisement';

export default {
  name: 'AdvertisementComponent',
  components: {Advertisement},

  props: {
    componentId: {
      type: String,
      required: true
    }
  },

  async created() {
    if (this.initialised) {
      if (! this.loaded && ! this.loading) {
        await this.load();
      }
    }
  },

  watch: {
    componentId: {
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
      loadComponentWithComponentId: 'components/loadComponentWithComponentId',
    }),

    async load () {
      return await (this.componentId)
        ? this.loadComponentWithComponentId(this.componentId)
        : undefined;
    },

    async reload () {
      return await this.load();
    },
  },

  computed: {
    ...mapGetters({
      initialised: 'components/initialised',
      componentWithComponentId: 'components/componentWithComponentId',
    }),

    component () {
      return (this.componentId)
        ? this.componentWithComponentId(this.componentId)
        : undefined;
    },

    loaded () {
      return (this.component) ? this.component.loaded : false;
    },

    loading () {
      return (this.component) ? this.component.loading : true;
    },

    error () {
      return (this.component) ? this.component.error : undefined;
    },

    titleId () {
      return (this.component) ? this.component.titleId : undefined;
    },

    descriptionId () {
      return (this.component) ? this.component.descriptionId : undefined;
    },

    advertisementId () {
      return (this.component) ? this.component.advertisementId : undefined;
    },
  },
}
</script>
