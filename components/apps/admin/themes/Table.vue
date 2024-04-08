<template>
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-palette</v-icon>
      {{ $t('themes') }}

      <v-spacer></v-spacer>
      <v-btn rounded :loading="loading" :disabled="loading" @click="reload">
        <v-icon left>mdi-refresh</v-icon>{{ $t('reload') }}
      </v-btn>

      <v-dialog v-model="createThemeDialog" max-width="800px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ml-3" rounded v-bind="attrs" v-on="on">
            <v-icon left>mdi-palette</v-icon>
            {{ $t('create-theme') }}
          </v-btn>
        </template>
        <apps-admin-themes-create-theme @close="createThemeDialog = false;"/>
      </v-dialog>
    </v-card-title>

    <v-card-subtitle>{{ $t('themes') }}</v-card-subtitle>

    <v-card-text>

      <v-data-table :search="search" :headers="headers" :items="themes" :loading="loading">
        <template v-slot:top>
          <v-container fluid class="px-0 pt-6">
            <v-row no-gutters>
              <v-col cols="12" md="6">
                <v-text-field v-model="search" dense hide-details="auto"
                              rounded filled prepend-inner-icon="mdi-magnify"
                              :placeholder="placeholder"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </template>

        <!-- headers -->
        <template v-slot:header.name="{ header }">
          {{ $t(header.text) }}
        </template>

        <template v-slot:header.primaryColor="{ header }">
          {{ $t(header.text) }}
        </template>

        <template v-slot:header.actions="{ header }">
          {{ $t(header.text) }}
        </template>

        <!-- items -->


        <template v-slot:item.name="{ item }">
          {{ item.name }}
        </template>

        <template v-slot:item.primaryColor="{ item }">
          <v-list-item-avatar class="gradient-light-dark-theme">
            <v-icon large :color="`${item.light && item.light.primary || 'transparent'}`">
              mdi-circle
            </v-icon>

            <v-icon large class="ml-1" :color="`${item.dark && item.dark.primary || 'transparent'}`">
              mdi-circle
            </v-icon>
          </v-list-item-avatar>
        </template>

        <!-- item actions -->
        <template v-slot:item.actions="{ item }">
          <template>
            <v-btn icon @click="openUpdateThemeDialog(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>

          <v-btn icon @click="openRemoveThemeDialog(item)" color="error">
            <v-icon>mdi-delete</v-icon>
          </v-btn>

<!--          <template v-if="item.error">-->
<!--            <v-btn icon :loading="loading" :disabled="loading" color="error">-->
<!--              <v-icon>mdi-alert</v-icon>-->
<!--            </v-btn>-->
<!--          </template>-->

<!--          <template v-if="item.loaded">-->
<!--            <v-btn icon :loading="loading">-->
<!--              <v-icon color="success">mdi-check-circle</v-icon>-->
<!--            </v-btn>-->
<!--          </template>-->
        </template>
      </v-data-table>
    </v-card-text>

<!--    <v-card-actions>-->

<!--      <v-spacer />-->

<!--    -->
<!--    </v-card-actions>-->


    <!-- Dialogs -->
    <v-dialog v-model="updateThemeDialog" max-width="800px">
      <apps-admin-themes-update-theme v-if="updateThemeDialog" :theme="themeSelected" @close="updateThemeDialog = false;"/>
    </v-dialog>

    <v-dialog v-model="removeThemeDialog" max-width="1000px">
      <apps-admin-theme-remove-theme :theme="themeSelected" @close="removeThemeDialog = false;"/>
    </v-dialog>
    <!--/ Dialogs -->

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Table",
  computed: {
    ...mapGetters({
      themes: 'apps/admin/themes/themes',
      loading: 'apps/admin/themes/loading',
      loaded: 'apps/admin/themes/loaded',
    }),

    placeholder () {
      return this.$i18n.t('search');
    }
  },

  /**
   * @return {Promise<void>}
   */
  async created () {
    if (! this.loading && ! this.loaded) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/themes/load',
      unload: 'apps/admin/themes/unload',
      reload: 'apps/admin/themes/reload',
    }),

    openUpdateThemeDialog (theme) {
      this.themeSelected = theme;
      this.updateThemeDialog = true;
    },

    openRemoveThemeDialog (theme) {
      this.themeSelected = theme;
      this.removeThemeDialog = true;
    },
  },
  data: () => ({
    createThemeDialog: false,
    updateThemeDialog: false,
    removeThemeDialog: false,
    search: '',
    themeSelected: null,
    headers: [
      {
        text: 'theme-name',
        align: 'start',
        value: 'name',
        sortable: true,
        width: 400,
      },
      {
        text: 'primary-colour',
        align: 'center',
        value: 'primaryColor',
        sortable: true,
        width: 150,
      },
      {
        text: 'actions',
        align: 'right',
        value: 'actions',
        sortable: false,
      }
    ],
  })
}
</script>

<style lang="scss" scoped>
.gradient-light-dark-theme {
  background: linear-gradient(
      to right,
      #FFFFFF 0%,
      #FAFAFA 47.5%,
      #212121 47.5%,
      #000000 100%
  );
}
</style>
