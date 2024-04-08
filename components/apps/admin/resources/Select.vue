<template>
  <v-select
    v-model="resourceId"
    item-text="name"
    item-value="resourceId"
    :loading="loading"
    :items="resources"
    :label="resourceLabel"
    :hint="resourceHint"
    :atts="$attrs"
    persistent-hint
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-slot:item="{on, attrs, item}">
      <v-list-item two-line v-bind="attrs" v-on="on">
        <v-list-item-content>
          <v-list-item-title>{{ $t(item.name) }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.resourceId }}</v-list-item-subtitle>
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
    value: {
      type: String,
    },
  },

  data: () => ({
    resourceId: undefined,
  }),

  watch: {
    value: {
      immediate: true,
      handler () {
        this.resourceId = this.value;
      }
    }
  },

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/resources/load',
      reload: 'apps/admin/resources/reload',
    })
  },

  computed: {
    ...mapGetters({
      resources: 'apps/admin/resources/resources',
      loading: 'apps/admin/resources/loading',
      loaded: 'apps/admin/resources/loaded',
    }),

    resourceLabel () {
      return this.$i18n.t('resource-label');
    },

    resourceHint () {
      return this.$i18n.t('resource-hint');
    },
  },
}
</script>
