<!--
[PRO-239] Venue App - Users - UsersList Page

List the Users in the Partition so the the current User (Me) can create connections with others.
-->
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">

        <!-- users app wrapper -->
        <v-sheet width="100%" height="100%" elevation="1" rounded="lg" :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">
          <v-container fluid class="fill-height">



            <!-- title or component -->
            <!-- search/filter/form -->
            <v-row>
              <v-col cols="12">
                <!-- users search card form/inputs -->
                <users-search />
              </v-col>
            </v-row>


            <!-- search results -->
            <v-row>
              <v-col>
                <users-list />
              </v-col>
            </v-row>


          </v-container>
        </v-sheet>
        <!-- /users app wrapper -->

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import colors from "~/mixins/colors";
import dayjs from "dayjs";

export default {
  name: "User",
  mixins: [colors],
  data() {
    return {}
  },

  computed: {
    ...mapGetters({
      loading: 'users/loading',
      loaded: 'users/loaded',
      user: 'users/user',
    }),
    sideNavigationOpen() {
      return this.$store.state.sideNavigationOpen
    },
    sideActivityNavigationOpen() {
      return this.$store.state.sideActivityNavigationOpen
    },
  },
  methods: {
    ...mapActions({
      loadUser: 'users/load',
    }),

  },
}
</script>
