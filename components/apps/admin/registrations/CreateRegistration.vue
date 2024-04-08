<template>
  <v-card rounded elevation="4" :loading="loading">
    <v-card-title class="primary">
      <v-icon left>mdi-form-select</v-icon>
      {{$t("admin-create-registration-title")}}
    </v-card-title>
    <v-card-subtitle class="primary">{{ $t('admin-create-registration-subtitle') }}</v-card-subtitle>

    <v-card-text>
      <v-form v-if="!creatingRegistration && !createdRegistration" v-model="valid" ref="form" lazy-validation>
        <v-container fluid>
          <!--Registration Name-->
          <v-row>
            <v-col cols="12" lg="12">
              <v-text-field
                v-model="name"
                :label="nameLabel"
                :hint="nameHint"
                persistent-hint
                clearable
                required
                :rules="[v => !!v || 'Registration Name is required.']"/>
            </v-col>
          </v-row>

          <!--Registration Title-->
          <v-row>
            <v-col cols="12" lg="12">
              <base-label-form
                :text="title"
                :text-label="titleLabel"
                :text-hint="titleHint"
                @change="changeTitle">
              </base-label-form>
            </v-col>
          </v-row>

          <!--Registration Description-->
          <v-row>
            <v-col cols="12" lg="12">
              <base-label-form
                :text="description"
                :text-label="descriptionLabel"
                :text-hint="descriptionHint"
                @change="changeDescription">
              </base-label-form>
            </v-col>
          </v-row>
        </v-container>
      </v-form>

      <!-- CREATING REGISTRATION -->
      <v-container v-if="creatingRegistration" fluid>
        <v-row class="fill-height" align-content="center" justify="center">
          <v-col class="text-subtitle-1 text-center" cols="12">
            {{ $t('admin-creating-registration') }} {{ title }}
          </v-col>
          <v-col cols="6">
            <v-progress-linear indeterminate rounded height="6" />
          </v-col>
        </v-row>
      </v-container>

      <!--CREATED REGISTRATION-->
      <v-container v-if="createdRegistration" fluid>
        <apps-admin-registration-status
         :name="'registration'"
         :status="registrationExecution.status"
         :action="'created'"
        />
      </v-container>

    </v-card-text>

    <!--REGISTRATION ACTIONS -->
    <v-card-actions v-if="!creatingRegistration && !createdRegistration" class="justify-end">
        <v-btn plain large @click="cancel">{{ $t('close') }}</v-btn>
        <v-btn text class="primary" large @click="submit">{{ $t('create') }}</v-btn>
    </v-card-actions>

      <v-card-actions v-if="createdRegistration" class="justify-end">
        <v-btn @click="cancel">{{ $t('cancel') }}</v-btn>
        <v-btn
          v-if="registrationExecution.status === 'SUCCEEDED'"
          :to="{ name: 'apps-admin-registrations-registrationId', params: { registrationId:this.registrationExecution.registrationId } }"
          class="primary">
          {{ $t("view") }}
        </v-btn>
        <v-btn v-if="registrationExecution.status === 'FAILED'" @click="submit"
          class="primary">
          {{ $t("retry") }}
        </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {slugify} from "@/utils/helpers";

export default {
  name: 'CreateRegistration',

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  data: () => ({
    name: undefined,
    title: undefined,
    description: undefined,
    titleLanguageId: undefined,
    descriptionLanguageId: undefined,

    valid:false,
    executionArn: undefined

  }),

  methods: {
    ...mapActions({
      createRegistration: 'apps/admin/registrations/createRegistration',
      load: 'apps/admin/registrations/load',
    }),

    changeTitle({text, languageId}) {
      this.title = text
      this.titleLanguageId = languageId
    },
    changeDescription({text, languageId}) {
      this.description = text
      this.descriptionLanguageId = languageId
    },

    cancel () {
      this.$emit('close');
      this.reset();
    },

    reset () {
      this.name = undefined;
      this.title = undefined;
      this.description = undefined;
      this.titleLanguageId = undefined;
      this.descriptionLanguageId = undefined;
      this.executionArn = undefined;
    },

    async submit() {
      if (!this.valid) return;
      const update = {
        name: this.name,
        title: {
          text: this.title,
          languageId: this.titleLanguageId
        },
        description: {
          text: this.description,
          languageId: this.descriptionLanguageId
        }
      }
      const creatingRegistration = await this.createRegistration(update);
      if (creatingRegistration) {
        const {executionArn} = creatingRegistration;
        this.executionArn = executionArn;
      }
    },

  },
  computed: {
    ...mapGetters({
      loading: 'apps/admin/registrations/loading',
      loaded: 'apps/admin/registrations/loaded',
      creatingRegistrationWithExecutionArn: 'apps/admin/registrations/creatingRegistrationWithExecutionArn',
    }),

    nameAsSlug () {
      if (this.name) {
        return slugify(this.name);
      }
    },

    descriptionLabel () {
      return this.$i18n.t('registration-description');
    },

    descriptionHint () {
      return this.$i18n.t('this-is-the-description-of-the-registration');
    },

    nameLabel () {
      return this.$i18n.t('registration-name');
    },

    nameHint () {
      return this.$i18n.t('this-is-the-name-of-the-registration');
    },

    titleLabel () {
      return this.$i18n.t('registration-title');
    },

    titleHint () {
      return this.$i18n.t('this-is-the-title-of-the-registration');
    },

    registrationExecution () {
      return (this.executionArn) ? this.creatingRegistrationWithExecutionArn(this.executionArn) : undefined;
    },

    creatingRegistration () {
      return (this.registrationExecution) ? this.registrationExecution.creating : undefined;
    },

    createdRegistration() {
      return (this.registrationExecution) ? this.registrationExecution.created : undefined;
    },

  },
}
</script>

