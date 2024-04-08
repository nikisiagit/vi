<!--
[PRO-216] Region - Components

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-216

About Component

This components may be change to just be used as Text component. (Admin management will be based through the ProTextEditor)

!!Important: social links may be extracted as stand-alone component or it could use links <a href> within the ProTextEditor WIP
-->
<template>
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-information</v-icon>
      {{ $t(titleId) }}
      <v-spacer />


      <template v-if="urlLinks">
        <v-btn v-if="twitter" icon nuxt link :href="twitter" target="_blank">
          <v-icon small>mdi-twitter</v-icon>
        </v-btn>

        <v-btn v-if="facebook" icon nuxt link :href="facebook" target="_blank">
          <v-icon small>mdi-facebook</v-icon>
        </v-btn>

        <v-btn v-if="linkedIn" icon nuxt link :href="linkedIn" target="_blank">
          <v-icon small>mdi-linkedin</v-icon>
        </v-btn>

        <v-btn v-if="webUrl" icon nuxt link :href="webUrl" target="_blank">
          <v-icon small>mdi-web</v-icon>
        </v-btn>
      </template>

    </v-card-title>

    <v-card-subtitle>{{ $t(descriptionId) }}</v-card-subtitle>

    <!-- if aboutId -->
    <v-card-text>
      <div>{{ $t(aboutId) }}</div>
    </v-card-text>

<!--    <pre>{{ component }}</pre>-->

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'AboutComponent',

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
    }
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

    aboutId () {
      return (this.component) ? this.component.aboutId : undefined;
    },

    urlLinks () {
      return (this.component) ? this.component.urlLinks : undefined;
    },

    webUrl () {
      return (this.urlLinks) ? this.urlLinks.webUrl : undefined;
    },

    twitter () {
      return (this.urlLinks) ? this.urlLinks.twitter : undefined;
    },

    facebook () {
      return (this.urlLinks) ? this.urlLinks.facebook : undefined;
    },

    linkedIn () {
      return (this.urlLinks) ? this.urlLinks.linkedIn : undefined;
    },
  },
}
</script>
