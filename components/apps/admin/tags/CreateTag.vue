<template>
  <v-card>
    <v-toolbar>

<!--      <v-btn icon @click="cancel">-->
<!--        <v-icon>mdi-arrow-left</v-icon>-->
<!--      </v-btn>-->

      <v-btn icon @click="cancel">
        <v-icon>mdi-tag-plus</v-icon>
      </v-btn>

      <v-toolbar-title>{{ $t('create-a-tag') }}</v-toolbar-title>
    </v-toolbar>

    <!-- the form -->
    <template v-if="! executionArn">

      <!-- help text -->
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <p>
              Create a new Tag.
            </p>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-text-field
              v-model="name"
              persistent-hint
              persistent-placeholder
              :label="nameLabel"
              :hint="nameHint"
              :placeholder="namePlaceholder"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-btn block
               large
               @click="submit"
               :loading="submitting"
               :disabled="submitting">{{ $t('submit')}}</v-btn>
      </v-card-actions>
    </template>


    <!-- creating the Tag -->
    <template v-if="executionArn">

      <!-- creating -->
      <template v-if="creating">
        <v-container>
          <v-row>
            <v-col>
              <v-progress-linear indeterminate/>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <!-- error -->
      <template v-if="error">
        <v-container>
          <v-row>
            <v-col>
              <v-alert type="error">{{ error }}</v-alert>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <!-- the created Tag -->
      <v-container v-show="tagId">
        <v-row>
          <v-col>
            {{ tagId }}
          </v-col>
        </v-row>
      </v-container>

    </template>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CreateTag",

  data: () => ({
    submitting: false,
    debug: false,
    name: undefined,
    executionArn: undefined,
    startDate: undefined,
  }),

  methods: {
    ...mapActions({
      createTag: 'apps/admin/tags/createTag',
    }),

    reset () {
      this.name = undefined;
      this.executionArn = undefined;
      this.startDate = undefined;
      this.submitting = false;
    },

    cancel () {
      this.reset();
      this.$emit('close');
    },

    async submit () {
      const tagToCreate = {
        name: this.name,
      };

      this.submitting = true;
      const creatingTag = await this.createTag(tagToCreate);
      this.submitting = false;

      let {executionArn, startDate} = creatingTag;

      this.executionArn = executionArn;
      this.startDate = startDate;
    },
  },

  computed: {
    ...mapGetters({
      creatingTagWithExecutionArn: 'apps/admin/tags/creatingTagWithExecutionArn',
    }),

    // CreatingTag

    creatingTag () {
      return (this.executionArn) ? this.creatingTagWithExecutionArn(this.executionArn) : undefined;
    },

    creating () {
      return (this.creatingTag) ? this.creatingTag.creating : false;
    },

    created () {
      return (this.creatingTag) ? this.creatingTag.created : false;
    },

    error () {
      return (this.creatingTag) ? this.creatingTag.error : undefined;
    },

    tagId () {
      return (this.creatingTag) ? this.creatingTag.tagId : undefined;
    },



    // labels

    nameLabel () {
      return this.$i18n.t('name');
    },

    nameHint () {
      return this.$i18n.t('name-hint');
    },

    namePlaceholder () {
      return this.$i18n.t('name-placeholder');
    }
  },
}
</script>
