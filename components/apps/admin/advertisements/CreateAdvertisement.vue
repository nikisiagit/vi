<template>
  <!-- Create advertisement Card -->
  <v-card>

    <!-- Create A advertisement Card -->
    <v-card :loading="loading">

      <template slot="progress">
        <v-progress-linear color="primary" height="4" indeterminate />
      </template>

      <v-card-title>
        <v-icon left>mdi-advertisements</v-icon>
        {{ $t('add-advertisement') }}
      </v-card-title>

      <v-card-subtitle>
        {{ $t('add-advertisement') }}

        <!-- Progress bar -->
        <!--  (Hides when step machines step finishes. Last step/'Create another one')-->
        <v-list v-show="this.currentStep !== 5">
          <v-list-item class="pa-0">
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('Step') }} {{ currentStep }} {{ $t('of') }} {{ numberOfSteps }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-progress-linear class="mt-2" v-model="progressBar"></v-progress-linear>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <!--/ Progress bar -->

      </v-card-subtitle>
    </v-card>

    <!-- Card with the form for each step. (AdvertisementText step)  -->
    <v-card v-show="showAdvertisementTextStep">
      <v-card-title>
        {{ $t('What would you like it to say?') }}
      </v-card-title>

      <v-list two-line v-if="adText || adLabel">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>
              <v-system-bar>
                <small>{{ $t('preview') }}</small>
                <v-spacer></v-spacer>

                <v-icon size=".8rem">mdi-square</v-icon>

                <v-icon size=".8rem">mdi-circle</v-icon>

                <v-icon size=".8rem">mdi-triangle</v-icon>
              </v-system-bar>
              <v-card
                outlined
                hover
                :href="fullAdLink"
                :target="'blank'"
              >

                <!-- preview ad -->
                <v-list class="pa-0" :color="adBackgroundColor">
                  <v-list-item>
                    <v-list-item-avatar
                      class="my-0"
                      size="100"
                      tile
                    >
                      <v-img
                        :alt="adText"
                        :src="adImgSrc"
                        contain
                      />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title class="text-wrap">
                        {{ adText }}
                      </v-list-item-title>

                      <!-- powered by -->
                      <v-list-item-subtitle class="mt-2 text-overline" :class="{'text-right': $vuetify.breakpoint.mdAndDown}">
                        {{ adLabel }}
                      </v-list-item-subtitle>
                    </v-list-item-content>

                  </v-list-item>
                </v-list>
                <!-- / preview ad -->


              </v-card>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-card-text>
        <v-form v-model="advertisementTextValid" ref="advertisementTextForm" lazy-validation>
          <v-container fluid>
            <v-row>
              <v-col cols="12" lg="12">
                <v-text-field
                  v-model="adName"
                  :label="adNameLabel  + ' *'"
                  :hint="adNameHint"
                  persistent-hint
                  clearable
                  required
                  :rules="nameRules"
                />
              </v-col>

              <v-col cols="12" lg="12">
                <v-text-field
                  clearable
                  v-model="adText"
                  :label="adTextLabel  + ' *'"
                  :hint="adTextHint"
                  persistent-hint
                  required
                  :rules="textRules"
                />
              </v-col>

            </v-row>

            <v-row>
              <v-col cols="12" lg="12">
                <v-text-field
                  clearable
                  v-model="adLabel"
                  :placeholder="$t('powered-by-pro')"
                  :label="$t('ad-label')"
                  :hint="$t('this-is-an-optional-label-for-the-advertisement')"
                  persistent-hint
                />
              </v-col>

            </v-row>

          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn plain large rounded @click="cancel">{{ $t('cancel') }}</v-btn>
        <v-spacer />
        <v-btn large class="pa-4" rounded @click="submitAdvertisementTextForm">
          {{ $t('next') }}

          <v-spacer></v-spacer>
          <v-icon small >
            mdi-arrow-right
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <!--/ AdvertisementText step -->


    <!-- AdvertisementBranding step -->
    <v-card v-show="showAdvertisementBrandingStep">
      <v-card-title>
        {{ $t('Set the look and feel') }}
      </v-card-title>
      <v-card-subtitle>
        {{ $t('ad-image') }}
      </v-card-subtitle>

      <v-card-text>
        <v-list two-line v-if="adText || adLabel">

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>
                <v-system-bar>
                  <small>{{ $t('preview') }}</small>
                  <v-spacer></v-spacer>

                  <v-icon size=".8rem">mdi-square</v-icon>

                  <v-icon size=".8rem">mdi-circle</v-icon>

                  <v-icon size=".8rem">mdi-triangle</v-icon>
                </v-system-bar>
                <v-card
                  outlined
                  hover
                  :href="fullAdLink"
                  :target="'blank'"
                >

                  <!-- preview ad -->
                  <v-list class="pa-0" :color="adBackgroundColor">
                    <v-list-item>
                      <v-list-item-avatar
                        class="my-0"
                        size="100"
                        tile
                      >
                        <v-img
                          :alt="adText"
                          :src="adImgSrc"
                          contain
                        />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="text-wrap">
                          {{ adText }}
                        </v-list-item-title>

                        <!-- powered by -->
                        <v-list-item-subtitle class="mt-2 text-overline" :class="{'text-right': $vuetify.breakpoint.mdAndDown}">
                          {{ adLabel }}
                        </v-list-item-subtitle>
                      </v-list-item-content>

                    </v-list-item>
                  </v-list>
                  <!-- / preview ad -->


                </v-card>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-form v-model="advertisementBrandingFormValid" ref="advertisementBrandingForm" lazy-validation>
          <v-container fluid>

            <v-row >
              <v-col cols="12" lg="12">

                <apps-admin-resources-create-resource
                  v-if="! uploadedResourceId"
                  item-id="advertisement"
                  @resource-created="changeResourceId"
                  @src-resource-created="changeResourceSrc"
                  :display-as-card="false"
                />

              </v-col>

            </v-row>

            <v-row>
              <v-col cols="12" lg="12">
                <base-color-picker :label="backgroundColorLabel"
                                   :hint="backgroundColorHint"
                                   @change-colour="changeColor" />
              </v-col>
            </v-row>

          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn plain large rounded @click="cancel">{{ $t('cancel') }}</v-btn>
        <v-spacer />

        <v-btn text large class="pa-4" rounded @click="currentStep = 1" :disabled="creating">
          <v-icon small >
            mdi-arrow-left
          </v-icon>

          <v-spacer></v-spacer>

          {{ $t('back') }}
        </v-btn>
        <v-btn large class="pa-4" rounded @click="submitAdvertisementBrandingForm" :loading="creating">
          {{ $t('next') }}

          <v-spacer></v-spacer>
          <v-icon small >
            mdi-arrow-right
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <!--/ AdvertisementBranding step -->


    <!-- AdvertisementLink step -->
    <v-card v-show="showAdvertisementLinkStep">
      <v-card-title>
        {{ $t('What’s the Advertisement link?') }}
      </v-card-title>

      <v-card-text>
        <v-list two-line v-if="adText || adLabel">

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>
                <v-system-bar>
                  <small>{{ $t('preview') }}</small>
                  <v-spacer></v-spacer>

                  <v-icon size=".8rem">mdi-square</v-icon>

                  <v-icon size=".8rem">mdi-circle</v-icon>

                  <v-icon size=".8rem">mdi-triangle</v-icon>
                </v-system-bar>
                <v-card
                  outlined
                  hover
                  :href="fullAdLink"
                  :target="'blank'"
                >

                  <!-- preview ad -->
                  <v-list class="pa-0" :color="adBackgroundColor">
                    <v-list-item>
                      <v-list-item-avatar
                        class="my-0"
                        size="100"
                        tile
                      >
                        <v-img
                          :alt="adText"
                          :src="adImgSrc"
                          contain
                        />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="text-wrap">
                          {{ adText }}
                        </v-list-item-title>

                        <!-- powered by -->
                        <v-list-item-subtitle class="mt-2 text-overline" :class="{'text-right': $vuetify.breakpoint.mdAndDown}">
                          {{ adLabel }}
                        </v-list-item-subtitle>
                      </v-list-item-content>

                    </v-list-item>
                  </v-list>
                  <!-- / preview ad -->


                </v-card>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-form v-model="advertisementLinkFormValid" ref="advertisementLinkForm" lazy-validation>
          <v-container fluid>
            <v-row>
              <v-col cols="12" lg="6">
                <v-text-field
                  v-model="adLink"
                  :label="adUrlLabel"
                  :hint="adUrlHint"
                  :placeholder="'www.coca-cola.co.uk'"
                  prefix="https://"
                  persistent-hint
                  required
                  clearable
                  :rules="[v => !!v || 'A link is required.']"
                />
              </v-col>

              <v-col cols="12" lg="6">
                <v-checkbox
                  v-model="adLinkOpenInTab"
                  :label="adLinkOpenInTabLabel"
                  :hint="adLinkOpenInTabHint"
                  persistent-hint
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-btn link plain color="primary" :target="'_blank'" :href="fullAdLink">
                  <v-icon left>
                    mdi-open-in-new
                  </v-icon>
                  {{ $t('preview-link') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-container fluid >
          <v-row>
            <v-col cols="12">
              <base-preview-alert
                :title="$t('Advertisement statistics will be available once it’s live. Make sure to add tracking parameters to your URL if you would like to track this advertisement on other tools (i.e. Google Analytics.)')"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>

      <v-card-actions>
        <v-btn plain large rounded @click="cancel">{{ $t('cancel') }}</v-btn>
        <v-spacer />

        <v-btn text large class="pa-4" rounded @click="currentStep = 2" :disabled="creating">
          <v-icon small >
            mdi-arrow-left
          </v-icon>

          <v-spacer></v-spacer>

          {{ $t('back') }}
        </v-btn>
        <v-btn large class="pa-4" rounded @click="submitAdvertisementLinkForm" :loading="creating">
          {{ $t('next') }}

          <v-spacer></v-spacer>
          <v-icon small >
            mdi-arrow-right
          </v-icon>
        </v-btn>
      </v-card-actions>

    </v-card>
    <!--/ AdvertisementLink step -->

    <!-- review step -->
    <v-card v-show="showReviewStep">
      <v-card-title>
        {{ $t('Finally, let’s review everything.') }}
      </v-card-title>

      <v-card-text>
        <v-list two-line v-if="adText || adLabel">

          <v-list-item>
            <v-list-item-content>
              <v-system-bar>
                <small>{{ $t('preview') }}</small>
                <v-spacer></v-spacer>

                <v-icon size=".8rem">mdi-square</v-icon>

                <v-icon size=".8rem">mdi-circle</v-icon>

                <v-icon size=".8rem">mdi-triangle</v-icon>
              </v-system-bar>
              <v-list-item-subtitle>
                <v-card
                  outlined
                  hover
                  :href="fullAdLink"
                  :target="'blank'"
                >

                  <!-- preview ad -->
                  <v-list class="pa-0" :color="adBackgroundColor">
                    <v-list-item>
                      <v-list-item-avatar
                        class="my-0"
                        size="100"
                        tile
                      >
                        <v-img
                          :alt="adText"
                          :src="adImgSrc"
                          contain
                        />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="text-wrap">
                          {{ adText }}
                        </v-list-item-title>

                        <!-- powered by -->
                        <v-list-item-subtitle class="mt-2 text-overline" :class="{'text-right': $vuetify.breakpoint.mdAndDown}">
                          {{ adLabel }}
                        </v-list-item-subtitle>
                      </v-list-item-content>

                    </v-list-item>
                  </v-list>
                  <!-- / preview ad -->


                </v-card>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-container fluid>
          <v-row>
            <v-col>
              <!-- ad text/label review -->
              <v-list two-line>

<!--                <v-list-item>-->
<!--                  <v-list-item-content>-->
<!--                    <v-list-item-title class="mb-2">-->
<!--                      <strong>{{ $t('preview') }}</strong>-->
<!--                    </v-list-item-title>-->
<!--                    <v-list-item-subtitle>-->
<!--                      <v-card-->
<!--                        outlined-->
<!--                        hover-->
<!--                        :href="fullAdLink"-->
<!--                        :target="'blank'"-->
<!--                      >-->

<!--                        &lt;!&ndash; preview ad &ndash;&gt;-->
<!--                        <v-list class="pa-0" :color="adBackgroundColor">-->
<!--                          <v-list-item>-->
<!--                            <v-list-item-avatar-->
<!--                              class="my-0"-->
<!--                              size="100"-->
<!--                              tile-->
<!--                            >-->
<!--                              <v-img-->
<!--                                :alt="adText"-->
<!--                                :src="adImgSrc"-->
<!--                                contain-->
<!--                              />-->
<!--                            </v-list-item-avatar>-->
<!--                            <v-list-item-content>-->
<!--                              <v-list-item-title class="text-wrap">-->
<!--                                {{ adText }}-->
<!--                              </v-list-item-title>-->

<!--                              &lt;!&ndash; powered by &ndash;&gt;-->
<!--                              <v-list-item-subtitle class="mt-2 text-overline" :class="{'text-right': $vuetify.breakpoint.mdAndDown}">-->
<!--                                {{ adLabel }}-->
<!--                              </v-list-item-subtitle>-->
<!--                            </v-list-item-content>-->

<!--                          </v-list-item>-->
<!--                        </v-list>-->
<!--                        &lt;!&ndash; / preview ad &ndash;&gt;-->


<!--                      </v-card>-->
<!--                    </v-list-item-subtitle>-->
<!--                  </v-list-item-content>-->
<!--                </v-list-item>-->

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ adName }}</v-list-item-title>
                    <v-list-item-subtitle>{{ $t('name') }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="currentStep = 1">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ adText }}</v-list-item-title>
                    <v-list-item-subtitle>{{ $t('ad-text') }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="currentStep = 1">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ adLabel }}</v-list-item-title>
                    <v-list-item-subtitle>{{ $t('ad-label') }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="currentStep = 1">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>

                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon :color="adBackgroundColor">
                      mdi-square-rounded
                    </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ adBackgroundColor }}
                    </v-list-item-title>
                    <v-list-item-subtitle>{{ $t('ad-background-colour') }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="currentStep = 2">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>

                <v-list-item>
                  <v-list-item-avatar>
                    <v-img contain  :src="adImgSrc"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ adImgName }}</v-list-item-title>
                    <v-list-item-subtitle>{{ $t('ad-image') }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="currentStep = 2">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-decoration-underline">{{ fullAdLink }}</v-list-item-title>
                    <v-list-item-subtitle>{{ $t('ad-link') }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="currentStep = 3">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>

              </v-list>

            </v-col>
          </v-row>

        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-btn plain large rounded @click="cancel">{{ $t('cancel') }}</v-btn>
        <v-spacer />

        <v-btn text large class="pa-4" rounded @click="currentStep = 3" :disabled="creating">
          <v-icon small >
            mdi-arrow-left
          </v-icon>

          <v-spacer></v-spacer>

          {{ $t('back') }}
        </v-btn>
        <v-btn large rounded @click="submitForm" :loading="creating">
          {{ $t('create') }}
        </v-btn>
      </v-card-actions>

    </v-card>
    <!--/ review step -->


    <!-- creating advertisement step -->
    <v-card v-if="showCreatingStep">

      <v-card-text v-if="creatingAd.creating">
        <v-container fluid>
          <v-row class="fill-height" align-content="center" justify="center">
            <v-col class="text-subtitle-1 text-center" cols="12">
              {{ $t('creating-advertisement') }} {{ adName }}
            </v-col>
            <v-col cols="6">
              <v-progress-linear indeterminate rounded height="6" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-text v-if="creatingAd.advertisement">
        <v-container fluid>
          <v-row>
            <v-col>
              <v-list two-line>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ creatingAd.advertisement.adName }}</v-list-item-title>
                    <v-list-item-subtitle>{{ $t('name') }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ creatingAd.advertisement.adText }}</v-list-item-title>
                    <v-list-item-subtitle>{{ $t('ad-text') }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>


      <v-card-actions>
        <v-btn plain large rounded @click="cancel">{{ $t('close') }}</v-btn>
        <v-btn text large rounded @click="reset">{{ $t('create-another-advertisement') }}</v-btn>

        <template v-if="creatingAd.advertisement">
          <v-spacer />
          <v-btn large class="pa-4" rounded :to="{name: 'advertisements-advertisementId', params: {'advertisementId': creatingAd.advertisement.advertisementId}}">
            {{ $t('view-advertisement') }}

            <v-spacer></v-spacer>
            <v-icon small >
              mdi-arrow-right
            </v-icon>
          </v-btn>
        </template>

      </v-card-actions>

    </v-card>
    <!--/ creating advertisementId step -->

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import { slugify } from '~/utils/helpers'

export default {
  name: "CreateAdvertisement",

  data: () => ({
    uploadedResourceId: undefined,

    currentStep: 1,
    numberOfSteps: 4,

    loading: false,
    creating: false,

    advertisementTextValid: true,
    advertisementBrandingFormValid: true,
    advertisementLinkFormValid: true,
    valid: true,

    adName: undefined,
    adText: undefined,
    adLabel: undefined,
    adBackgroundColor: undefined,
    adLink: undefined,
    adLinkOpenInTab: true,
    adImgSrc: undefined,
    adImgName: undefined,

    executionArn: undefined,

    nameRules: [],
    textRules: [],
  }),

  computed: {
    ...mapGetters({
      creatingAdvertisementWithExecutionArn: 'apps/admin/advertisements/creatingAdvertisementWithExecutionArn',
    }),

    adNameAsSlug () {
      if (this.adName) {
        return slugify(this.adName);
      }
    },

    fullAdLink(){
      return this.adLink ? `https://${this.adLink}`: ''
    },

    backgroundColorHint(){
      return this.$i18n.t('this-is-the-background-colour-of-the-advertisement');
    },

    backgroundColorLabel(){
      return this.$i18n.t('ad-background-colour');
    },

    adLinkOpenInTabLabel(){
      return this.$i18n.t('open-link-in-a-new-tab');
    },

    adLinkOpenInTabHint(){
      return this.$i18n.t('this-configuration-allows-to-open-link-in-a-new-tab');
    },

    progressBar(){
      return this.currentStep / this.numberOfSteps * 100
    },

    showAdvertisementTextStep() {
      return this.currentStep === 1
    },

    showAdvertisementBrandingStep() {
      return this.currentStep === 2
    },

    showAdvertisementLinkStep() {
      return this.currentStep === 3
    },

    showReviewStep() {
      return this.currentStep === 4
    },

    showCreatingStep() {
      return this.currentStep === 5
    },

    creatingAd () {
      return (this.executionArn) ? this.creatingAdvertisementWithExecutionArn(this.executionArn) : undefined;
    },

    adTextLabel () {
      return this.$i18n.t('ad-text');
    },

    adTextHint () {
      return this.$i18n.t('this-is-the-main-text-of-the-advertisement');
    },

    adNameLabel () {
      return this.$i18n.t('name');
    },

    adNameHint () {
      return this.$i18n.t('this-is-the-name-of-the-advertisement');
    },

    adUrlLabel () {
      return this.$i18n.t('ad-url');
    },

    adUrlHint () {
      return this.$i18n.t('this-is-the-url-of-the-advertisement');
    },
  },

  methods: {
    ...mapActions({
      createAdvertisement: 'apps/admin/advertisements/createAdvertisement',
    }),

    async changeResourceId(resourceId){
      this.uploadedResourceId = resourceId
    },

    async changeResourceSrc(src){
      this.adImgSrc = src
    },

    addNameRules(){
      this.nameRules = [
        v => !!v || 'A name is required'
      ]
    },

    addTextRules(){
      this.textRules = [
        v => !!v || 'A text is required'
      ]
    },

    changeColor(color) {
      console.log(color);
      this.adBackgroundColor = color; //?.hexa
    },

    changeRegionId (regionId) {
      this.regionId = regionId;
    },

    reset () {
      this.valid = true;
      this.advertisementTextValid = true;
      this.advertisementLinkFormValid = true
      this.advertisementBrandingFormValid = true

      this.currentStep = 1;

      this.adName = undefined;
      this.adText = undefined;
      this.adLabel = undefined;
      this.adBackgroundColor = undefined;
      this.adLink = undefined;
      this.adLinkOpenInTab = undefined;
      this.adImgSrc = undefined;
      this.adImgName = undefined;

      this.$refs.advertisementTextForm.reset();
      this.$refs.advertisementLinkForm.reset();
      this.$refs.advertisementBrandingForm.reset();
    },

    cancel () {
      this.$emit('close');
      this.reset();
    },

    submitAdvertisementTextForm () {
      this.addNameRules();
      this.addTextRules();

      // after rules has been added, it requires to update the template to pick up validation.
      this.$nextTick(() => {
        if (! this.$refs.advertisementTextForm.validate()) {
          this.advertisementTextValid = false;
          return;
        }

        this.advertisementTextValid = true;
        this.currentStep = 2;
      })
    },

    submitAdvertisementBrandingForm () {
      if (! this.$refs.advertisementBrandingForm.validate()) {
        this.advertisementBrandingFormValid = false;
        return;
      }

      this.advertisementBrandingFormValid = true;
      this.currentStep = 3;
    },

    submitAdvertisementLinkForm () {
      if (! this.$refs.advertisementLinkForm.validate()) {
        this.advertisementLinkFormValid = false;
        return;
      }

      this.advertisementLinkFormValid = true;
      this.currentStep = 4;
    },

    async submitForm () {
      if (!this.advertisementTextValid || ! this.advertisementLinkFormValid || ! this.advertisementBrandingFormValid) {
        this.valid = false;
        return;
      }

      this.valid = true;

      const advertisementToCreate = {
        name: this.adNameAsSlug,
        label: this.adLabel,
        text: this.adText,
        backgroundColour: this.adBackgroundColor,

        link: {
          url: this.adLink,
          target: this.adLinkOpenInTab ? '_blank': '_self',
        },

        // image: {
        //   base64: this.adImgSrc,
        //   // url: ''
        // },
        resourceId: this.uploadedResourceId
      };

      console.log("## AdvertisementToCreate")
      console.log(advertisementToCreate)

      //@todo: handle errors
      //@todo: add snackbar to show messages success/failure

      const {executionArn, startDate} = await this.createAdvertisement(advertisementToCreate);

      this.currentStep = 5;
      this.executionArn = executionArn;
    },
  },

  beforeDestroy() {
    this.reset();
  }
}
</script>
