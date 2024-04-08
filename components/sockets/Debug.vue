<!--

-->
<template>
  <v-card color="orange">
    <v-card-title>
      <v-icon left>mdi-lan-connect</v-icon>
      {{ $t('sockets') }}
    </v-card-title>

    <v-container>
      <v-row>
        <v-col>
          <pre>
            {{ sockets }}
          </pre>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Debug",

  computed: {
    ...mapGetters({
      sockets: 'sockets/sockets',
    })

  }
}
</script>
