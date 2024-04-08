<template>
  <v-autocomplete
    :loading="loading"
    :items="users"
    color="white"
    item-text="fullname"
    item-value="fullname"
    :label="$attrs['label'] ? $attrs['label']: userLabel"
    :hint="$attrs['hint'] ? $attrs['hint']: userHint"
    clearable
    required
    persistent-hint
    v-bind="$attrs"
    v-on="$listeners"></v-autocomplete>
</template>
<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Select",
  props: {
    value: {
      type: String,
      required: false,
    }
  },

  async created () {
    if (!this.loaded && ! this.loading) {
      await this.load();
    }
  },

  data: () => ({
    fullname: undefined,
  }),

  methods: {
    ...mapActions({
      load: 'apps/admin/users/load',
    }),
  },

  computed: {
    ...mapGetters({
      loaded: 'apps/admin/users/loaded',
      loading: 'apps/admin/users/loading',
      users: 'apps/admin/users/users',
    }),

    userLabel () {
      return this.$i18n.t('user-label');
    },

    userHint () {
      return this.$i18n.t('user-hint');
    }
  },
}
</script>
