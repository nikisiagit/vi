<!--
Venue Admin - Themes List

This card component renders a list of the Themes in the Partition.
-->
<template>
  <v-card :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-toolbar flat>
      <v-icon left>mdi-palette</v-icon>

      <v-toolbar-title>
        {{ $t('label:region:app:admin:themes') }} ({{ numberOfThemes }})
      </v-toolbar-title>

      <v-spacer />

      <!-- themes-actions -->
      <v-btn icon :loading="loading" :disabled="loading" @click="reload">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>

      <v-dialog v-model="createThemeDialog" fullscreen>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon class="ml-3" v-bind="attrs" v-on="on">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <apps-admin-themes-create-theme @close="createThemeDialog = false;"/>
      </v-dialog>
      <!-- /themes-actions -->

    </v-toolbar>

    <v-container fluid>
      <v-row>
        <v-col>
          <v-list>
            <apps-admin-theme-nav-list-item
              v-for="theme in themes"
              :key="theme.name"
              :theme-id="theme.themeId"
            />
          </v-list>
        </v-col>
      </v-row>
    </v-container>





    <template v-if="false">
      <template v-if="$vuetify.breakpoint.name === 'xs'">
        <v-row>
          <v-col>
            <v-card :loading="loading">
              <template slot="progress">
                <v-progress-linear height="4" indeterminate />
              </template>

              <v-card-title>
                <v-icon left>mdi-palette</v-icon>
                {{ $t('themes') }} ({{ numberOfThemes }})

                <v-spacer />

                <v-btn fab
                       small
                       :loading="loading"
                       :disabled="loading"
                       @click="reload">
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>

                <v-dialog v-model="createThemeDialog" max-width="800px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn fab
                           small
                           class="ml-3"
                           v-bind="attrs" v-on="on">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </template>
                  <apps-admin-themes-create-theme @close="createThemeDialog = false;"/>
                </v-dialog>
              </v-card-title>

              <v-card-subtitle>{{ $t('themes-subtitle') }}</v-card-subtitle>

              <template>
                <v-container fluid class="">
                  <v-row no-gutters>
                    <v-col cols="12" md="6">
                      <v-text-field dense hide-details="auto"
                                    filled
                                    rounded
                                    append-icon="mdi-magnify"
                                    placeholder="search" />
                    </v-col>
                  </v-row>
                </v-container>
              </template>

              <v-card-text>
                <template v-if="error">
                  <v-alert type="error">
                    {{ error }}
                  </v-alert>
                </template>

                <apps-admin-themes-list />

              </v-card-text>

            </v-card>
          </v-col>
        </v-row>
      </template>
      <template v-else>
        <v-row>
          <v-col>
            <apps-admin-themes-table />
          </v-col>
        </v-row>
      </template>
    </template>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "List",

  /**
   * @return {Promise<void>}
   */
  async created () {
    if (! this.loading && ! this.loaded) {
      await this.load();
    }
  },

  data: () => ({
    createThemeDialog: false,
  }),

  methods: {
    ...mapActions({
      load: 'apps/admin/themes/load',
      reload: 'apps/admin/themes/reload'
    }),
  },

  computed: {
    ...mapGetters({
      themes: 'apps/admin/themes/themes',
      loading: 'apps/admin/themes/loading',
      loaded: 'apps/admin/themes/loaded',
      numberOfThemes: 'apps/admin/themes/numberOfThemes',
    })
  },
}
</script>
