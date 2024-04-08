
<template>
  <v-card height="100%">
    <v-card-title>
      <v-icon left>mdi-lifebuoy</v-icon>
      {{ $t('support') }}
    </v-card-title>
    <v-card-text class="pa-0">
      <v-container fluid>
        <v-row no-gutters>
          <v-col cols="12" >
            {{ $t('support-content-goes-here') }}
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Support",
  computed: {
    ...mapGetters({

    }),

  },
  watch: {
    search(){

    }
  },

  async created () {

  },

  data(){
    return {

    }
  },

  methods: {
    ...mapActions({

    }),
  },
}
</script>
