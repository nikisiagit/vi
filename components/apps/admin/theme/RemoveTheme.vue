<template>
  <v-card>
    <v-card-title>
      <v-icon left>mdi-delete</v-icon>
      {{ $t('remove-theme')}}
    </v-card-title>
    <v-card-subtitle>{{ $t('remove-theme') }}</v-card-subtitle>

    <v-card-text>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-container fluid>
          <v-list two-line>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ theme.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('theme-name')}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>


            <v-list-item v-if="theme.themeId === value">
              <v-list-item-content>
                <apps-admin-themes-select
                  :rules="[v => !!v || 'A theme is required.']"
                  :label="$t('new-default-venue-theme')"
                  :hint="$t('new-default-venue-theme')"
                  @change="change"
                />
              </v-list-item-content>
            </v-list-item>

          </v-list>
        </v-container>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-container>
        <v-row v-if="theme.themeId === value">
          <v-col cols="12">
            <base-preview-alert
              type="warning"
              :title="$t('You cannot remove this Theme before setting another default Theme.')"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-scroll-x-transition>
              <v-container fluid v-show="error">
                <v-row no-gutters>
                  <v-col>

                    <v-alert
                      text
                      rounded
                      outlined
                      border="left"
                      elevation="2"
                      type="error"
                    >
                      {{ error }}
                    </v-alert>
                  </v-col>
                </v-row>
              </v-container>
            </v-scroll-x-transition>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>

    <v-card-actions>
      <v-btn :disabled="removing" @click="cancel">{{ $t('cancel') }}</v-btn>
      <v-spacer />
      <v-btn :loading="removing" :disabled="removing" @click="confirm">{{ $t('remove') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "RemoveTheme",
  props: {
    theme: {
      type: Object,
    }
  },

  data: () => ({
    error: undefined,
    removing: false,
    valid: false,
    themeIdChanged: undefined
  }),

  computed: {
    ...mapGetters({
      venue: 'apps/admin/venue/venue',
    }),

    themeId () {
      return (this.venue) ? this.venue.themeId : undefined;
    },

    value () {
      return (this.themeId) ? this.themeId.value : undefined;
    },

    loading () {
      return (this.themeId) ? this.themeId.loading : false;
    },

    loaded () {
      return (this.themeId) ? this.themeId.loaded : false;
    },

    update () {
      return (this.themeId) ? this.themeId.update : undefined;
    },

    updating () {
      return (this.themeId) ? this.themeId.updating : undefined;
    },

    // error () {
    //   return (this.update) ? this.update.error : undefined;
    // },
  },

  methods: {
    ...mapActions({
      removeTheme: 'apps/admin/themes/removeTheme',
      updateVenue: 'apps/admin/venue/updateVenue',
    }),

    cancel () {
      this.$emit('close');
    },

    change (themeId) {
      this.themeIdChanged = themeId;
    },

    async confirm() {
      if (! this.$refs.form.validate()) {
        this.valid = false;
        return;
      }

      this.valid = true;

      if (! this.theme?.name) {
        throw new Error('Theme Name is required for removing the theme')
      }

      // remove theme selected
      try {
        this.removing = true;


        // update the new default venue theme
        if ( this.theme.themeId === this.value ) {


          if (! this.themeIdChanged) {
            return;
          }

          await this.updateVenue({themeId: this.themeIdChanged});

        }
        // END: update the new default venue theme


        const removingTheme = await this.removeTheme(this.theme.name);
        this.removing = false;

        console.log(`## REMOVING THEME`);
        console.log(removingTheme);

        this.cancel()

      } catch (error) {
        console.log(`## REMOVING THEME ERROR`);
        console.log(error);

        this.removing = false;
        this.error = error.response.data?.message || error?.message
      }
    }
  },
}
</script>
