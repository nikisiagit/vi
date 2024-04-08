<template>
  <v-select
    v-model="timezoneId"
    :items="timezones"
    item-text="name"
    item-value="timezoneId"

    :label="$attrs['label'] ? $attrs['label']: timezoneLabel"
    :hint="$attrs['hint'] ? $attrs['hint']: timezoneHint"
    required
    persistent-hint
    @change="$emit('input', timezoneId)"
    v-bind="$attrs"
    v-on="$listeners"
  >

    <!-- (UTC {{ item.utc }}) {{ item.name }}-->
    <template v-slot:item="{on, attrs, item}">
      <v-list-item two-line v-bind="attrs" v-on="on">
        <v-list-item-content>
          <v-list-item-title>({{ item.utc }}) {{ $t(item.name) }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.timezoneId }}</v-list-item-subtitle>
<!--          <v-list-item-subtitle>{{ item.utc }}</v-list-item-subtitle>-->
        </v-list-item-content>
      </v-list-item>
    </template>

  </v-select>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
// import {TIMEZONES_NAMESPACE} from "../constants";

export default {
  name: "SelectTimezones",
  props: {
    value: {
      type: String
    },
    prependIcon: {
      type: String,
      default: "mdi-translate"
    },
  },
  data: () => ({
    valid: true,
    timezoneId: '',
  }),
  async created(){
    this.timezoneId = this.value

    if (! this.loaded && ! this.loading) {
      await this.load();

      // this.timezones.map(t => t.display_text = `(${t.utc}) ${t.name}`)
    }

  },
  methods: {
    ...mapActions({
      load: 'load',
    }),
  },
  computed: {
    ...mapGetters({
      loading: 'loading',
      loaded: 'loaded',
      timezones: 'timezones',
    }),

    timezoneLabel () {
      return this.$i18n.t('Timezone_Label');
    },

    timezoneHint () {
      return this.$i18n.t('Timezone_Hint');
    },

    timezoneRules() {
      //TODO: Handle i18n.
      return [
        v => !!v || 'Timezone_Is_Required', // @todo make i18n compat
      ]
    },
  }
}
</script>
