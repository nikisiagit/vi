<!--
[PRO-215] Venue App - Areas

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-215

Render a link to the Area.
-->
<template>
  <v-list-item :to="to" exact>
    <v-list-item-content>
      <!-- if we have a titleId (Label) -->
      <v-list-item-title>{{ $t(titleId) }}</v-list-item-title>
      <!-- if we have a descriptionId (Label) -->
      <v-list-item-subtitle>{{ $t(descriptionId) }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NavListItem",

  props: {
    areaId: {
      type: String,
      required: true,
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

    area () {
      return (this.areaId) ? this.areaWithAreaId(this.areaId) : undefined;
    },

    titleId () {
      return this.area?.titleId;
    },

    descriptionId () {
      return this.area?.descriptionId;
    },

    default () {
      return this.area?.default;
    },

    name () {
      return this.area?.name;
    },

    // dynamically generate the to link prop
    to () {
      if (this.default) {
        return {name: 'index'};
      }

      if (this.name) {
        return {name: 'areas-name', params: {name: this.name}};
      }

      return undefined;
      // throw new Error(`Luis!!! What do we do here?`);
    },
  },
}
</script>
