<template>
  <v-select
    v-model="advertisementId"
    item-text="name"
    item-value="advertisementId"
    :loading="loading"
    :items="advertisements"
    :label="advertisementLabel"
    :hint="advertisementHint"
    :atts="$attrs"
    persistent-hint
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-slot:item="{on, attrs, item}">
      <v-list-item two-line v-bind="attrs" v-on="on">
        <v-list-item-content>
          <v-list-item-title>{{ $t(item.name) }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.advertisementId }}</v-list-item-subtitle>
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
    advertisementId: undefined,
  }),

  watch: {
    value: {
      immediate: true,
      handler () {
        this.advertisementId = this.value;
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
      load: 'apps/admin/advertisements/load',
      reload: 'apps/admin/advertisements/reload',
    })
  },

  computed: {
    ...mapGetters({
      advertisements: 'apps/admin/advertisements/advertisements',
      loading: 'apps/admin/advertisements/loading',
      loaded: 'apps/admin/advertisements/loaded',
    }),

    advertisementLabel () {
      return this.$i18n.t('advertisement-label');
    },

    advertisementHint () {
      return this.$i18n.t('advertisement-hint');
    },
  },
}
</script>
