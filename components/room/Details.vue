<template>
  <v-card height="150" class="d-flex flex-column">
    <v-card-title>
      {{ textLocal }}
    </v-card-title>

    <v-card-subtitle>
      {{ descriptionLabelText }}
    </v-card-subtitle>

    <v-card-text class="mt-auto text-left">
      <v-chip v-if="chatId" small label color="deep-orange lighten-2" class="mt-2 white--text">
        <v-icon left small>mdi-forum</v-icon>
        Chat
      </v-chip>

      <v-chip v-if="dailyRoomId" small label color="deep-purple lighten-2" class="mt-2 white--text">
        <v-icon left small>mdi-video</v-icon>
        Daily
      </v-chip>

      <div v-if="createdBy">
        {{ $t('created-by') }} {{ createdBy }}
      </div>
    </v-card-text>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "RoomDetails",
  props: {
    roomId: {
      type: String,
    },
    titleId: {
      type: String
    },
    descriptionId: {
      type: String
    },
    chatId: {
      type: String
    },
    dailyRoomId: {
      type: String
    },
    createdBy: {
      type: String
    }
  },
  watch: {
    titleId: {
      immediate: true,
      handler () {
        if (this.titleId) {
          if (! this.labelLoading && ! this.labelLoaded) {
            this.loadLabelWithLabelId(this.titleId);
          }
        }
      }
    },

    descriptionId: {
      immediate: true,
      handler () {
        if (this.descriptionId) {
          if (! this.descriptionLabelLoading && ! this.descriptionLabelLoaded) {
            this.loadLabelWithLabelId(this.descriptionId);
          }
        }
      }
    },

    text: {
      immediate: true,
      handler () {
        this.textLocal = this.text;
      }
    },

    descriptionLabelText: {
      immediate: true,
      handler () {
        this.descriptionTextLocal = this.descriptionLabelText;
      }
    },
  },

  methods: {
    ...mapActions({
      loadLabelWithLabelId: 'apps/admin/labels/loadLabelWithLabelId',
    }),
  },

  computed: {
    ...mapGetters({
      labelWithLabelId: 'apps/admin/labels/labelWithLabelId',
    }),

    // the Label

    label () {
      return (this.titleId) ? this.labelWithLabelId(this.titleId) : undefined;
    },

    labelLoading () {
      return (this.label) ? this.label.loading : false;
    },

    labelLoaded () {
      return (this.label) ? this.label.loaded : false;
    },

    text () {
      return (this.label) ? this.label.text : undefined;
    },

    languageId () {
      return (this.label) ? this.label.languageId : undefined;
    },

    // the description Label

    descriptionLabel () {
      return (this.descriptionId) ? this.labelWithLabelId(this.descriptionId) : undefined;
    },

    descriptionLabelLoading () {
      return (this.descriptionLabel) ? this.descriptionLabel.loading : false;
    },

    descriptionLabelLoaded () {
      return (this.descriptionLabel) ? this.descriptionLabel.loaded : false;
    },

    descriptionLabelText () {
      return (this.descriptionLabel) ? this.descriptionLabel.text : undefined;
    },

    descriptionLabelLanguageId () {
      return (this.descriptionLabel) ? this.descriptionLabel.languageId : undefined;
    },

  },

  data: () => ({
    textLocal: undefined,
    descriptionTextLocal: undefined,
  }),
}
</script>
