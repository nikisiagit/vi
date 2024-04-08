<!--
[PRO-215] Venue App - Area

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-215

Render the Area, identified by the route name param.
-->
<template>
  <v-container fluid>
    <v-row>
      <v-col>

        <v-fade-transition mode="out-in">
          <area-container v-if="areaId" :area-id="areaId" />
        </v-fade-transition>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AreaView",

  computed: {
    name () {
      return this.$route.params.name || undefined;
    },

    /**
     * Create the areaId from the supplied route params.
     *
     * @returns {string|undefined}
     */
    areaId () {
      // @todo write a helper function to do this - createAreaId({partition, name})
      return (this.name) ? `area:${this.$partition.name}:${this.name}`: undefined;
    },
  },
}
</script>

