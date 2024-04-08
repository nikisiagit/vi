<template>
  <v-list>
    <apps-admin-user-nav-list-item
      v-for="user in users"
      :key="user.fullname"
      :name="user.fullname"
    />
  </v-list>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NavList",
  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },
  methods: {
    ...mapActions({
      load: 'apps/admin/users/load',
      reload: 'apps/admin/users/reload',
    })
  },
  computed: {
    ...mapGetters({
      users: 'apps/admin/users/users',
      loading: 'apps/admin/users/loading',
      loaded: 'apps/admin/users/loaded',
    })
  },
}
</script>
