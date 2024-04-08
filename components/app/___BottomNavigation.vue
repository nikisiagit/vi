<!--
App Bottom Navigation
--->
<template>

  <div>
    <v-bottom-sheet v-model="showSheet"
                    transition="slide-y-reverse-transition"
                    fullscreen>

      <v-sheet height="100vh" class="">
        <v-responsive max-height="100vh" class="overflow-y-auto yellow">

          <!-- this is a wip idea for what the card needs to look like when rendered in this popup sheet -->
          <v-card tile>
            <v-card-title class="primary">
<!--              <v-icon left>mdi-close</v-icon>-->
<!--              <v-icon left>mdi-arrow-left</v-icon>-->
<!--              <v-icon left>mdi-arrow-down</v-icon>-->
              {{ $t('title') }}
              <v-spacer />
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-card-title>

            <v-container fluid>
              <v-row>
                <!-- 16px padding -->
                <v-col class="px-4">
                  <!-- text content -->
                  <p>Content here</p>
                </v-col>
              </v-row>

              <!-- input -->
              <v-row>
                <v-col class="px-4">
                  <v-text-field label="label"
                                hint="label-hint"
                                persistent-hint
                                required
                                prepend-icon="mdi-at"
                  />
                </v-col>
              </v-row>

              <!-- buttons -->
              <v-row>
                <v-col class="px-4">
                  <v-btn block large color="primary">
                    {{ $t('button-text')}}
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>

        </v-responsive>
      </v-sheet>

    </v-bottom-sheet>

    <v-slide-y-reverse-transition>
      <v-bottom-navigation app fixed grow v-if="showNavigation" style="z-index: 999">

        <v-fade-transition>
          <v-btn icon plain exact v-if="showMenuButton" @click="showSheet = !showSheet">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </v-fade-transition>

      </v-bottom-navigation>
    </v-slide-y-reverse-transition>

  </div>

</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
  name: "BottomNavigation",

  async created () {
    if (! this.loading && ! this.loaded) {
      await this.load();
    }
  },

  data: () => ({
    showNavigation: true,
    showMenuButton: true,
    showSheet: false,
  }),

  methods: {
    ...mapActions({
      load: 'auth/load',
    }),
  },

  computed: {
    ...mapGetters({
      user: 'auth/user',
      loaded: 'auth/loaded',
      loading: 'auth/loading',
    }),
  },
}
</script>
