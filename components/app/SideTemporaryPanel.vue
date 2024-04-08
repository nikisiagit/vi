
<template>
  <v-navigation-drawer
    v-model="drawer"
    fixed
    temporary
    width="460"
  >
    <v-container fluid class="fill-height align-start transparent pa-0">

      <!-- this needs the padding setting -->
      <v-row no-gutters class="fill-height">

        <v-fade-transition mode="out-in" >
          <v-col v-show="drawer" class="grow">

            <!--  v-if="drawer === 'people'" key="people"-->
<!--            <v-card class="fill-height" >-->
<!--              <v-card-title>-->
<!--                <v-icon left>mdi-account</v-icon>-->
<!--                {{ $t('Profile') }}-->
<!--              </v-card-title>-->
<!--              <v-divider></v-divider>-->

              <user-details class="fill-height" />
<!--            </v-card>-->
          </v-col>
        </v-fade-transition>
      </v-row>
    </v-container>

  </v-navigation-drawer>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "SideTemporaryPanel",
  methods: {
    ...mapActions({
      closeSideTemporaryContent: 'app/closeSideTemporaryContent',
    }),


  },

  computed: {
    ...mapGetters({
      sideTemporaryContentOpen: 'app/sideTemporaryContentOpen',
    }),

  },

  watch: {
    sideTemporaryContentOpen(){
      this.drawer = this.sideTemporaryContentOpen
    },

    drawer(){
      if ( ! this.drawer )
        this.closeSideTemporaryContent()
    }
  },

  data: () => ({
    drawer: false,
  }),

}
</script>
