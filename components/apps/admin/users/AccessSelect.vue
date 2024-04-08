<template>
  <v-select
    v-model="level"
    :loading="loading"
    clearable
    :items="levels"
    item-text="name"
    item-value="value"
    :label="accessLabel"
    :hint="accessHint"
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
          <v-list-item-subtitle>{{ item.value }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-select>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "AccessSelect",

  props: {
    value: {
      type: String,
    },
  },

  created () {
    this.level = this.value;
  },

  watch: {
    value: {
      immediate: true,
      handler () {
        this.level = this.value;
      }
    }
  },

  computed: {
    accessLabel () {
      return this.$i18n.t('access-label');
    },

    accessHint () {
      return this.$i18n.t('access-hint');
    }
  },

  data: () => ({
    level: undefined,

    loading: false,
    levels: [
      {
        name: 'public',
        value: 'public'
      },
      {
        name: 'private',
        value: 'private'
      },
      {
        name: 'invite-only',
        value: 'invite-only'
      },
    ],
  }),
}
</script>
