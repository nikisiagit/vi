<template>
<!-- class="primary fill-height align-content-start" -->
  <v-container fluid>

    <v-row>
      <v-col>
        <apps-admin-contents-list />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <apps-admin-contents-create-content />
      </v-col>
    </v-row>

  </v-container>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "index",
  layout: 'admin',
}
</script>
