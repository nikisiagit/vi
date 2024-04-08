<template>
  <v-select
    :loading="loading"
    v-model="timezoneIdLocal"
    :items="timezones"
    item-text="name"
    item-value="timezoneId"
    :label="timezoneLabel"
    :hint="timezoneHint"
    :attrs="$attrs"
    required
    persistent-hint
    clearable
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-slot:item="{on, attrs, item}">
      <v-list-item two-line v-bind="attrs" v-on="on">
        <v-list-item-content>
          <v-list-item-title>{{ $t(item.name) }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.timezoneId }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-select>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Select",

  props: {
    timezoneId: {
      type: String,
      required: false,
    }
  },

  data: () => ({
    timezoneIdLocal: undefined,
  }),

  watch : {
    timezoneId: {
      immediate: true,
      handler () {
        this.timezoneIdLocal = this.timezoneId;
      }
    },
    initialised: {
      handler () {
        if (this.initialised) {
          if (! this.loading && ! this.loaded) {
            this.load();
          }
        }
      }
    },
  },

  async created () {
    if (this.initialised) {
      if (! this.loading && ! this.loaded) {
        await this.load();
      }
    }
  },

  methods: {
    ...mapActions({
      load: 'timezones/load',
      reload: 'timezones/reload',
    }),
  },

  computed: {
    ...mapGetters({
      initialised: 'timezones/initialised',
      loading: 'timezones/loading',
      loaded: 'timezones/loading',
      timezones: 'timezones/timezones',
    }),


    timezoneLabel () {
      return this.$i18n.t('timezone-label');
    },

    timezoneHint () {
      return this.$i18n.t('timezone-hint');
    },
  }
}
</script>
