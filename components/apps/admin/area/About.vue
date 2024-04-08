<template>
  <v-card outlined :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-toolbar flat>
      <v-icon left>mdi-text</v-icon>

      <v-toolbar-title>
        {{ $t('about') }}
      </v-toolbar-title>
      <v-spacer />

      <v-btn rounded :loading="loading" :disabled="loading" @click="reload">
        <v-icon left>mdi-refresh</v-icon>{{ $t('reload') }}
      </v-btn>

    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text>
      <!--      <div>-->
      <!--        <pre>-->
      <!--          {{ aboutComponent }}-->
      <!--        </pre>-->
      <!--      </div>-->

      <v-container fluid>
        <v-row>
          <v-col class="px-4">
            <apps-admin-area-update-about-title :area-id="areaId"></apps-admin-area-update-about-title>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="px-4">
            <apps-admin-area-update-about-description :area-id="areaId"></apps-admin-area-update-about-description>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="px-4">
            <apps-admin-area-update-about-url-links :area-id="areaId"></apps-admin-area-update-about-url-links>
          </v-col>
        </v-row>
      </v-container>



      <!--      <v-form v-model="valid" ref="form" lazy-validation>-->
      <!--        <v-container fluid>-->

      <!--          <v-row>-->
      <!--            <v-col cols="12" lg="6">-->
      <!--              <v-text-field-->
      <!--                v-model="title"-->
      <!--                :label="titleLabel"-->
      <!--                :hint="titleHint"-->
      <!--                persistent-hint-->
      <!--                clearable-->
      <!--                required-->
      <!--                :rules="titleRules"-->
      <!--              />-->
      <!--            </v-col>-->

      <!--            <v-col cols="12" lg="6">-->
      <!--              <v-textarea-->
      <!--                auto-grow-->
      <!--                rows="1"-->
      <!--                row-height="15"-->
      <!--                v-model.trim="description"-->
      <!--                :label="descriptionLabel"-->
      <!--                :hint="descriptionHint"-->
      <!--                persistent-hint-->
      <!--                clearable-->
      <!--              />-->
      <!--            </v-col>-->
      <!--          </v-row>-->

      <!--          <v-row>-->
      <!--            <v-col cols="12" lg="12">-->
      <!--              <apps-admin-languages-select :value="languageId" @change="changeLanguage" />-->
      <!--            </v-col>-->
      <!--          </v-row>-->

      <!--          <v-row>-->
      <!--            <v-col cols="12" lg="3">-->
      <!--              <v-text-field-->
      <!--                v-model="twitterUrl"-->
      <!--                :label="twitterLabel"-->
      <!--                :hint="twitterHint"-->
      <!--                persistent-hint-->
      <!--                clearable-->
      <!--                required-->
      <!--              />-->
      <!--            </v-col>-->

      <!--            <v-col cols="12" lg="3">-->
      <!--              <v-text-field-->
      <!--                v-model="linkedInUrl"-->
      <!--                :label="linkedInLabel"-->
      <!--                :hint="linkedInHint"-->
      <!--                persistent-hint-->
      <!--                clearable-->
      <!--                required-->
      <!--              />-->
      <!--            </v-col>-->

      <!--            <v-col cols="12" lg="3">-->
      <!--              <v-text-field-->
      <!--                v-model="facebookUrl"-->
      <!--                :label="facebookLabel"-->
      <!--                :hint="facebookHint"-->
      <!--                persistent-hint-->
      <!--                clearable-->
      <!--                required-->
      <!--              />-->
      <!--            </v-col>-->

      <!--            <v-col cols="12" lg="3">-->
      <!--              <v-text-field-->
      <!--                v-model="webUrl"-->
      <!--                :label="webUrlLabel"-->
      <!--                :hint="webUrlHint"-->
      <!--                persistent-hint-->
      <!--                clearable-->
      <!--                required-->
      <!--              />-->
      <!--            </v-col>-->
      <!--          </v-row>-->

      <!--        </v-container>-->
      <!--      </v-form>-->

      <!--      <div>-->
      <!--        <pre>-->
      <!--          {{ aboutToUpdate }}-->
      <!--        </pre>-->
      <!--      </div>-->
    </v-card-text>

    <!--    <v-card-actions>-->
    <!--      <v-btn block @click="submit" :disabled="updatingComponent && updatingComponent.updating" :loading="updatingComponent && updatingComponent.updating">-->
    <!--        {{ $t('update') }}-->
    <!--      </v-btn>-->
    <!--    </v-card-actions>-->
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "About",
  props: {
    areaId: {
      type: String
    }
  },
  computed: {
    ...mapGetters({
      componentWithAreaIdAndComponentType: 'apps/admin/areas/componentWithAreaIdAndComponentType',

      updatingComponentWithExecutionArn: 'apps/admin/areas/updatingComponentWithExecutionArn',
    }),

    descriptionLabel () {
      return this.$i18n.t('description');
    },

    descriptionHint () {
      return this.$i18n.t('description-hint');
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

    titleLabel () {
      return this.$i18n.t('title');
    },

    titleHint () {
      return this.$i18n.t('title-hint');
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
    }
  },
  data: () => ({
    valid: true,

    title: undefined,
    description: undefined,
    languageId: undefined,

    twitterUrl: '',
    linkedInUrl: '',
    facebookUrl: '',
    webUrl: '',

    titleRules: [],
    descriptionRules: [],


    aboutToUpdate: {},
    executionArn: undefined,
  }),
  watch: {
    aboutComponent(){
      // this.title = this.aboutComponent?.titleId
      // this.description = this.aboutComponent?.descriptionId
      this.twitterUrl = this.aboutComponent?.twitter
      this.linkedInUrl = this.aboutComponent?.linkedIn
      this.facebookUrl = this.aboutComponent?.facebook
      this.webUrl = this.aboutComponent?.webUrl

      this.languageId = this.aboutComponent?.languageId
    }
  },
  methods: {
    ...mapActions({
      load: 'apps/admin/areas/loadComponentWithComponentId',

      updateComponent: 'apps/admin/areas/updateComponent'
    }),

    async reload () {
      return await this.load({
        areaId: this.areaId,
        componentId: this.componentId
      });
    },

    reset () {
      this.valid = true

      this.title = undefined
      this.description = undefined

      this.twitterUrl = undefined
      this.linkedInUrl = undefined
      this.facebookUrl = undefined
      this.webUrl = undefined

      this.languageId = undefined

      this.$refs.form.reset();
    },

    addTitleRules(){
      this.titleRules = [
        v => !!v || 'A title is required'
      ]
    },

    addDescriptionRules(){
      this.descriptionRules = [
        v => !!v || 'A description is required'
      ]
    },

    async submit () {
      // this.addTitleRules();
      // this.addDescriptionRules();

      // after rules has been added, it requires to update the template to pick up validation.
      this.$nextTick(async () => {
        if (! this.$refs.form.validate()) {
          this.valid = false;
          return;
        }

        this.valid = true;

        // update about
        this.aboutToUpdate = {
          // title: {
          //   text: this.title,
          //   languageId: this.languageId
          // },
          // description: {
          //   text: this.description,
          //   languageId: this.languageId
          // },
          // languageId: this.languageId,

          twitter: this.twitterUrl,
          linkedIn: this.linkedInUrl,
          facebook: this.facebookUrl,
          webUrl: this.webUrl
        }

        const updatingComponent = await this.updateComponent({
          componentId: this.componentId,
          areaId: this.areaId,
          ...this.aboutToUpdate
        })

        if (updatingComponent) {

          const {executionArn, startDate} = updatingComponent;

          //@todo: handle errors
          //@todo: show messages success/failure

          this.executionArn = executionArn;
        } else {
          console.log("throw error from step function...")
        }

      })
    },
    cancel () {
      this.$emit('cancel');
      this.$emit('reset');
    },

    changeLanguage (languageId) {
      this.languageId = languageId;
    },
  }
}
</script>
