<template>
  <v-card>
    <v-toolbar flat>

<!--      <v-btn icon @click="close">-->
<!--        <v-icon left>mdi-close</v-icon>-->
<!--      </v-btn>-->

      <v-icon left>mdi-pound</v-icon>

      <v-toolbar-title>{{ $t('create-chat') }}</v-toolbar-title>
    </v-toolbar>

    <!-- alerts -->
    <v-container fluid v-show="creating || created || error">
      <v-row>
        <v-col class="px-4">
          <v-alert type="info" class="mb-0" v-show="creating">creating chat</v-alert>
          <v-alert type="success" class="mb-0" v-show="created">chat created</v-alert>
          <v-alert type="error" class="mb-0" v-show="error">error</v-alert>
        </v-col>
      </v-row>
    </v-container>

    <!-- form -->
    <template>

      <v-container fluid>
        <v-row>
          <v-col class="px-4">
            <v-text-field v-model="titleLocal"
                          label="titleLabel"
                          hint="titleHint"
                          persistent-hint
                          :disabled="creating"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col class="px-4">
            <v-textarea v-model="descriptionLocal"
                        label="descriptionLabel"
                        hint="descriptionHint"
                        :disabled="creating"
                        persistent-hint />
          </v-col>
        </v-row>

        <v-row>
          <v-col class="px-4">
            <apps-admin-languages-select :value="languageIdLocal"
                                         :disabled="creating"
                                         @change="setLanguageId"/>
          </v-col>
        </v-row>
      </v-container>

      <v-container fluid>
        <v-row>
          <v-col class="px-4">
            <apps-admin-tags-select :tagIds="tagIdsLocal"
                                    :disabled="creating"
                                    @change="setTagIds"/>
          </v-col>
        </v-row>
      </v-container>

      <v-container fluid>
        <v-row>
          <v-col class="d-flex px-4">
            <v-btn @click="cancel">{{ $t('cancel')}}</v-btn>

            <v-spacer />

            <v-btn @click="submit" :loading="creating" :disabled="creating">
              {{ $t('submit')}}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <!-- /form -->

  </v-card>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CreateChat",

  data: () => ({
    currentStep: 1,
    debug: true,

    titleLocal: undefined,
    descriptionLocal: undefined,
    languageIdLocal: undefined,
    tagIdsLocal: [],

    executionArn: undefined,
    startDate: undefined,
  }),

  methods: {
    ...mapActions({
      createChat: 'apps/admin/chats/createChat',
    }),

    /**
     * Close/Cancel the CreateChat.
     */
    close () {
      this.reset();
      this.$emit('close');
    },

    cancel () {
      this.reset();
      this.$emit('close');
    },

    back () {
      this.currentStep = (this.currentStep - 1);
    },

    reset () {
      this.currentStep = 1;
      this.executionArn = undefined;
      this.startDate = undefined;

      this.titleLocal = undefined;
      this.descriptionLocal = undefined;
      this.languageIdLocal = undefined;
      this.tagIdsLocal = [];
    },


    setTagIds (tagIds = []) {
      this.tagIdsLocal = tagIds;
    },

    setLanguageId (languageId = undefined) {
      this.languageIdLocal = languageId;
    },

    async submit () {
      try {
        const chatToCreate = {
          title: {
            text: this.titleLocal,
            languageId: this.languageIdLocal,
          },
          description: {
            text: this.descriptionLocal,
            languageId: this.languageIdLocal,
          },
          tagIds: this.tagIdsLocal,
        };

        console.log(`## CHAT TO CREATE`);
        console.log(chatToCreate);

        const creatingChat = await this.createChat(chatToCreate);
        const {executionArn, startDate} = creatingChat;

        this.executionArn = executionArn;
        this.startDate = startDate;

      } catch (error) {
        console.log(error);
      }
    },
  },

  computed: {
    ...mapGetters({
      creatingChatWithExecutionArn: 'apps/admin/chats/creatingChatWithExecutionArn',
    }),

    /**
     * @returns {*|undefined}
     */
    creatingChat () {
      return (this.executionArn) ? this.creatingChatWithExecutionArn(this.executionArn) : undefined;
    },

    creating () {
      return (this.creatingChat) ? this.creatingChat.creating : false;
    },

    created () {
      return (this.creatingChat) ? this.creatingChat.created : false;
    },

    error () {
      return (this.creatingChat) ? this.creatingChat.error : false;
    },

    chatId () {
      return (this.creatingChat) ? this.creatingChat.chatId : undefined;
    },
  },
}
</script>
