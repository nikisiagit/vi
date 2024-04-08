<!--
Venue App - Area View

-->
<template>
<!--  <area-container :area-id="areaId" />-->
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "View",
  computed: {
    areaId () {
      return this.$route.params.areaId || undefined;
    },
  },
}
</script>

