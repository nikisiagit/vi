<template>
  <v-select
    v-model="valueLocal"
    :loading="loading"
    clearable
    :items="roles"
    item-text="name"
    item-value="roleId"
    :label="rolesLabel"
    :hint="rolesHint"
    required
    multiple
    persistent-hint
    :attrs="$attrs"
    v-bind="$attrs"
    v-on="$listeners"
  >
<!--    chips-->

<!--    <template v-slot:append-outer>-->
<!--      <v-btn icon @click="load" :loading="loading" :disabled="loading">-->
<!--        <v-icon>mdi-refresh</v-icon>-->
<!--      </v-btn>-->
<!--    </template>-->
  </v-select>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Select",

  // props: {
  //   value: {
  //     type: String
  //   },
  // },

  async created () {
    this.valueLocal = this.value;

    if (! this.loading && ! this.loaded) {
      await this.load();
    }
  },

  data: () => ({
    valueLocal: undefined,
  }),

  computed: {
    ...mapGetters({
      roles: 'apps/admin/region/roles/roles',
      loading: 'apps/admin/region/roles/loading',
      loaded: 'apps/admin/region/roles/loaded',
    }),

    rolesLabel () {
      return this.$i18n.t('roles-label');
    },

    rolesHint () {
      return this.$i18n.t('roles-hint');
    },
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/region/roles/load',
      // reload: 'apps/admin/region/roles/reload',
    }),
  }
}
</script>
