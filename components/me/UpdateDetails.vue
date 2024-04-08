<template>
  <v-card>
    <v-card-title>
      {{ $t('update-details') }}
    </v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>

        <v-container fluid>

          <v-row dense>
            <v-col>
              <v-text-field
                v-model="fullNameLocal"
                :label="$t('fullname')"
                :hint="$t('fullname-hint')"
                persistent-hint
                clearable
              />
            </v-col>
          </v-row>

          <v-row dense>
            <v-col>
              <base-label-form
                :text="headlineLocal"
                :text-label="$t('headline')"
                :text-hint="$t('headline-hint')"
                @change="changeHeadlineLabelForm"
              ></base-label-form>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col>
              <base-label-form
                :text="bioLocal"
                :text-label="$t('bio')"
                :text-hint="$t('bio-hint')"
                @change="changeBioLabelForm"
              ></base-label-form>
            </v-col>
          </v-row>
        </v-container>






        <!--    <div class="form-group">-->
        <!--      <v-text-field class="form-control"-->
        <!--                    v-model="fullNameLocal"-->
        <!--                    counter="70"-->
        <!--                    :rules="fullNameValidation"-->
        <!--                    label="Full Name"></v-text-field>-->
        <!--    </div>-->

        <!--    <div class="form-group">-->

        <!--      &lt;!&ndash; this needs to change to an input with a text and a language select &ndash;&gt;-->
        <!--      &lt;!&ndash; text and a language id &ndash;&gt;-->
        <!--      &lt;!&ndash; the language id comes from the LanguagesSelect component &ndash;&gt;-->

        <!--&lt;!&ndash;      <label-form @submit="handleHeadlineLabelForm"/> &ndash;&gt;-->
        <!--      &lt;!&ndash; contains two inputs - text, language select &ndash;&gt;-->
        <!--      &lt;!&ndash; props:-->
        <!--        - default languageId-->
        <!--      &ndash;&gt;-->

        <!--      &lt;!&ndash; line 1 &ndash;&gt;-->
        <!--      <v-text-field class="form-control"-->
        <!--                    v-model="headlineLocal"-->
        <!--                    counter="30"-->
        <!--                    :rules="headlineValidation"-->
        <!--                    label="Headline" />-->

        <!--    </div>-->

        <!--    <div class="form-group">-->
        <!--      <v-text-field class="form-control"-->
        <!--                    v-model="bioLocal"-->
        <!--                    counter="150"-->
        <!--                    :rules="bioValidation"-->
        <!--                    label="Bio"></v-text-field>-->
        <!--    </div>-->


      </v-form>
    </v-card-text>

    <v-card-actions>

      <v-btn large block :disabled="!valid || !validHeadlineLabel || !validBioLabel" color="primary" @click="updateDetails">
        {{ $t('update') }}
      </v-btn>
    </v-card-actions>

  </v-card>
</template>


<script>
import {mapActions, mapGetters} from "vuex";
import LanguagesSelect from "../languages/Select";

export default {
  components: {LanguagesSelect},
  data: () => ({
    valid: true,
    fullNameLocal: '',

    headlineLocal: '',
    headlineLocalLanguageId: '',
    biographyLocal: '',
    biographyLocalLanguageId: '',

    validHeadlineLabel: false,
    validBioLabel: false,

    // copy these over to the backend services/apis etc
    headlineValidation: [v => (!v || v?.length <= 30) || 'Maximum 30 characters allowed'],
    biographyValidation: [v => (!v || v?.length <= 150) || 'Maximum 150 characters allowed'],
    fullNameValidation: [v => (!v || v?.length <= 70) || 'Maximum 70 characters allowed'],
  }),

  created(){
   this.fullNameLocal = this.fullname
   this.headlineLocal = this.headline
   this.biographyLocal = this.biography

    //@todo:
   this.languageIdLocal = this.languageId
  },

  methods: {
    ...mapActions({
      updateMe: 'me/updateMe',
    }),

    changeHeadlineLabelForm({ text, languageId }){
      this.headlineLocal = text
      this.headlineLocalLanguageId = languageId

      this.validHeadlineLabel = !!(text && languageId);

    },

    changeBioLabelForm({ text, languageId }){
      this.bioLocal = text
      this.biographyLocalLanguageId = languageId

      this.validBioLabel = !!(text && languageId);
    },

    async updateDetails () {
      const valid = this.$refs.form.validate()
      if (!valid) return
      const update = {
        fullname: this.fullNameLocal,
        headline: {
          text: this.headlineLocal,
          languageId: this.headlineLocalLanguageId

        },
        biography: {
          text: this.bioLocal,
          languageId: this.biographyLocalLanguageId

        },
      }
      await this.updateMe(update);
      this.$emit('close');
    },
  },

  computed: {
    ...mapGetters({
      me: 'me/me',
    }),
    fullname () {
      return (this.me) ? this.me.fullname : undefined;
    },
    headline () {
      return (this.me) ? this.me.headline?.text : undefined;
    },
    biography () {
      return (this.me) ? this.me.biography?.text : undefined;
    },
    languageId () {
      return (this.me) ? this.me.headline?.languageId : undefined;
    },
  },
}
</script>
