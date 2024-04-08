<template>
  <v-autocomplete
    v-bind="$attrs"
    v-on="$listeners"
    ref="userSearchRef"
    v-model="userSelected"
    :loading="isLoading"
    :items="admins"
    :search-input.sync="search"
    :prepend-icon="prependIcon"
    cache-items
    flat
    hide-no-data
    clearable
    return-object
    item-text="userId"
    item-value="userId"
  >
    <template slot="item" slot-scope="data">
      <v-list-item-content >
        {{ data.item.userId }}

        <small class="text--disabled">
          {{ data.item.email }}
        </small>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UsersSearch",
  props: {
    value: {
      type: String,
      required: false,
    },
    prependIcon: {
      type: String,
      default: "mdi-account-search"
    },
  },
  data() {
    return {
      isLoading: false,
      search: '',
      userSelected: '',
    };
  },
  computed: {
    ...mapGetters({
      admins: 'apps/admin/users/usersusers', //@todo: allUsers in the venue?
    }),
  },
  watch: {
    async search (searchValue) {
      console.log("value of the search [searchValue]: ", searchValue) //@todo: pass value to endpoint to-do search server-side

      if (typeof searchValue !== 'string') return

      if (this.isLoading) return

      this.isLoading = true

      await this.loadAdmins() // @todo: loadAllUsers in the venue (ucas)?

      this.isLoading = false

    },
  },

  // destroyed() {
  //   this.onClear()
  // },

  methods: {
    ...mapActions({
      loadAdmins: 'apps/admin/users/load',
    }),

    onClear() {
      this.search = ''
      this.userSelected = ''
      this.$emit("clear");
    },

  }
};
</script>
