<template>
  <v-select
    v-model="timezoneId"
    :loading="loading"
    clearable
    :items="timezones"
    item-text="name"
    item-value="timezoneId"
    :label="timezoneLabel"
    :hint="timezoneHint"
    required
    persistent-hint
    :attrs="$attrs"
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

<!--    <template v-slot:append-outer>-->
<!--      <v-btn icon @click="reload" :loading="loading" :disabled="loading">-->
<!--        <v-icon>mdi-refresh</v-icon>-->
<!--      </v-btn>-->
<!--    </template>-->
  </v-select>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Select",

  props: {
    value: {
      type: String
    },
  },

  async created () {
    this.timezoneId = this.value;

    if (! this.loading && ! this.loaded) {
      await this.load();
    }
  },

  data: () => ({
    timezoneId: undefined,
  }),

  watch: {
    value () {
      this.timezoneId = this.value;
    }
  },

  computed: {
    ...mapGetters({
      timezones: 'apps/admin/region/timezones/timezones',
      loading: 'apps/admin/region/timezones/loading',
      loaded: 'apps/admin/region/timezones/loaded',
    }),

    timezoneLabel () {
      return this.$i18n.t('timezone-label');
    },

    timezoneHint () {
      return this.$i18n.t('timezone-hint');
    },
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/region/timezones/load',
      reload: 'apps/admin/region/timezones/reload',
    }),
  }
}
</script>
