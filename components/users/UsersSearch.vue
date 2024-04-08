<template>
  <!-- users search card form/inputs -->
  <v-card rounded>

    <v-card-title>
      {{ $t('users-search')}}
    </v-card-title>

    <v-container fluid>
      <v-row no-gutters>
        <v-col>
          <v-text-field v-model="searchLocale"
                        clearable
                        dense
                        outlined hide-details
                        append-icon="mdi-magnify"
                        :label="$t('Search')"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>

<!--  <v-autocomplete-->
<!--    v-bind="$attrs"-->
<!--    v-on="$listeners"-->
<!--    ref="userSearchRef"-->
<!--    v-model="userSelected"-->
<!--    :loading="isLoading"-->
<!--    :items="admins"-->
<!--    :search-input.sync="search"-->
<!--    :prepend-icon="prependIcon"-->
<!--    cache-items-->
<!--    flat-->
<!--    hide-no-data-->
<!--    clearable-->
<!--    return-object-->
<!--    item-text="profileId"-->
<!--    item-value="profileId"-->
<!--  >-->
<!--    <template slot="item" slot-scope="data">-->
<!--      <v-list-item-content >-->
<!--        {{ data.item.profileId }}-->

<!--        <small class="text&#45;&#45;disabled">-->
<!--          {{ data.item.email }}-->
<!--        </small>-->
<!--      </v-list-item-content>-->
<!--    </template>-->
<!--  </v-autocomplete>-->
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UsersSearch",
  // props: {
  //   value: {
  //     type: [Object, String],
  //     required: false,
  //   },
  //   prependIcon: {
  //     type: String,
  //     default: "mdi-account-search"
  //   },
  // },
  data() {
    return {
      searchLocale: '',
    };
  },
  watch: {
    searchLocale(){
      this.getAllUsers(this.searchLocale)
    }
  },
  // computed: {
  //   ...mapGetters({
  //     admins: 'customers/customers', //@todo: allUsers in the venue?
  //   }),
  // },
  // watch: {
  //   async search (searchValue) {
  //     console.log("value of the search [searchValue]: ", searchValue) //@todo: pass value to endpoint to-do search server-side
  //
  //     if (typeof searchValue !== 'string') return
  //
  //     if (this.isLoading) return
  //
  //     this.isLoading = true
  //
  //     await this.loadAdmins() // @todo: loadAllUsers in the venue (ucas)?
  //
  //     this.isLoading = false
  //
  //   },
  // },

  // destroyed() {
  //   this.onClear()
  // },

  methods: {
    ...mapActions({
      getAllUsers: 'users/getAllUsers',
    }),
  //
  //   onClear() {
  //     this.search = ''
  //     this.userSelected = ''
  //     this.$emit("clear");
  //   },
  //
  }
};
</script>
