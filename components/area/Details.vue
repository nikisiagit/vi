<template>
  <v-card>

    <v-card-title>
      {{ $t(titleId) }}
    </v-card-title>

    <v-container fluid>
      <v-row>
        <v-col>
          {{ $t(descriptionId) }}
        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Details",

  props: {
    areaId: {
      type: String,
      required: true,
    }
  },

  computed: {
    ...mapGetters({
      areaWithAreaId: 'areas/areaWithAreaId',
    }),

    area () {
      return (this.areaId) ? this.areaWithAreaId(this.areaId) : undefined;
    },

    titleId () {
      return (this.area) ? this.area.titleId : undefined;
    },

    descriptionId () {
      return (this.area) ? this.area.descriptionId : undefined;
    },
  }
}
</script>
