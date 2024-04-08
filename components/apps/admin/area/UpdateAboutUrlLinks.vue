<!--
Admin - Area - Component - Update About Url Links

A smart component that enables an Admin to update the About Url Links.
-->
<template>
  <v-card :loading="loading">

    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-calendar</v-icon>
      {{ $t('admin-component-about-update-url-links')}}
      <v-spacer />
      <v-btn icon @click="showHelp = !showHelp">
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </v-card-title>

    <!-- help -->
    <v-slide-y-transition>
      <v-container fluid v-if="showHelp">
        <v-row>
          <v-col class="px-4">
            <p>{{ $t('admin-component-about-update-url-links-help') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>

    <!-- form -->
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-container fluid>
        <v-row>
          <v-col class="px-4">
            <v-text-field
              v-model="twitterUrl"
              :label="twitterLabel"
              :hint="twitterHint"
              :rules="urlRules"
              prepend-icon="mdi-twitter"
              persistent-hint
              clearable
              required
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col class="px-4">
            <v-text-field
              v-model="linkedInUrl"
              :label="linkedInLabel"
              :hint="linkedInHint"
              :rules="urlRules"
              prepend-icon="mdi-linkedin"
              persistent-hint
              clearable
              required
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col class="px-4">
            <v-text-field
              v-model="facebookUrl"
              :label="facebookLabel"
              :hint="facebookHint"
              :rules="urlRules"
              prepend-icon="mdi-facebook"
              persistent-hint
              clearable
              required
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col class="px-4">
            <v-text-field
              v-model="webUrl"
              :label="webUrlLabel"
              :hint="webUrlHint"
              :rules="urlRules"
              prepend-icon="mdi-web"
              persistent-hint
              clearable
              required
            />
          </v-col>
        </v-row>

      </v-container>

      <!-- submit -->
      <v-container>
        <v-row>
          <v-col class="px-4">
            <v-btn large
                   block
                   @click="close"
            >
              {{ $t('close') }}
            </v-btn>


          </v-col>

          <v-col class="px-4">

            <v-btn large
                   block
                   color="primary"
                   @click="submit"
                   :disabled="!valid || updatingComponent && updatingComponent.updating"
                   :loading="updatingComponent && updatingComponent.updating"
            >
              {{ $t('admin-component-about-update-url-links') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>


  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UpdateAboutUrlLinks",

  props: {
    areaId: {
      type: String,
      required: true,
    },
  },

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    areaId: {
      handler () {
        if (! this.loaded && ! this.loading) {
          this.load();
        }
      },
    },
    aboutComponent(){
      this.twitterUrl = this.aboutComponent?.urlLinks?.twitter
      this.linkedInUrl = this.aboutComponent?.urlLinks?.linkedIn
      this.facebookUrl = this.aboutComponent?.urlLinks?.facebook
      this.webUrl = this.aboutComponent?.urlLinks?.webUrl
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/areas/loadComponentWithComponentId',
      updateComponent: 'apps/admin/areas/updateComponent',
    }),

    async load() {
      return await (this.areaId) ? this.load({
        areaId: this.areaId,
        componentId: this.componentId
      }) : undefined;
    },

    async reload() {
      return await this.load();
    },

    close(){
      this.$emit('close')

    },

    /**
     * Submit url links to update
     *
     * @returns {Promise<void>}
     */
    async submit () {
      if (! this.$refs.form.validate()) {
        this.valid = false;
        return;
      }

      this.valid = true;


      try {
        const update = {
          urlLinks: {
            twitter: this.twitterUrl,
            linkedIn: this.linkedInUrl,
            facebook: this.facebookUrl,
            webUrl: this.webUrl

          }
        };

        this.submitting = true;


        const updatingComponent = await this.updateComponent({
          componentId: this.componentId,
          areaId: this.areaId,
          ...update
        })

        if (updatingComponent) {

          const {executionArn, startDate} = updatingComponent;

          //@todo: handle errors
          //@todo: show messages success/failure

          this.executionArn = executionArn;
        } else {
          console.log("throw error from step function...")
        }


        this.submitting = false;

      } catch (error) {
        console.log(error);
      }
    },
  },

  computed: {
    ...mapGetters({
      componentWithAreaIdAndComponentType: 'apps/admin/areas/componentWithAreaIdAndComponentType',

      updatingComponentWithExecutionArn: 'apps/admin/areas/updatingComponentWithExecutionArn',
    }),

    urlRules () {
      return [
        // v => !!v || 'Url is required',
        v => {
          if (v) return /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/g.test(v) || 'Must be a valid Url';
          else return true;
        },
      ]

    },

    aboutComponent () {
      return (this.areaId) ? this.componentWithAreaIdAndComponentType(this.areaId, 'about') : undefined;
    },

    componentId () {
      return (this.aboutComponent) ? this.aboutComponent.componentId : undefined;
    },

    updatingComponent () {
      return (this.executionArn) ? this.updatingComponentWithExecutionArn(this.executionArn) : undefined;
    },

    loaded () {
      return (this.aboutComponent) ? this.aboutComponent.loaded : false;
    },

    loading () {
      return (this.aboutComponent) ? this.aboutComponent.loading : true;
    },

    error () {
      return (this.aboutComponent) ? this.aboutComponent.error : undefined;
    },


    twitterLabel () {
      return this.$i18n.t('twitter');
    },

    twitterHint () {
      return this.$i18n.t('twitter-hint');
    },

    linkedInLabel () {
      return this.$i18n.t('linked-in');
    },

    linkedInHint () {
      return this.$i18n.t('linked-in-hint');
    },

    facebookLabel () {
      return this.$i18n.t('facebook');
    },

    facebookHint () {
      return this.$i18n.t('facebook-hint');
    },

    webUrlLabel () {
      return this.$i18n.t('web-url');
    },

    webUrlHint () {
      return this.$i18n.t('web-url-hint');
    },
  },

  data: () => ({
    submitting: false,
    showHelp: false,

    twitterUrl: '',
    linkedInUrl: '',
    facebookUrl: '',
    webUrl: '',

    valid: false,
  }),
}
</script>
