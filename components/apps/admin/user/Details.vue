<template>
  <div class="details_container">
  <v-card :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>
    <!-- @todo replace with avatar -->
    <v-toolbar flat>
      <v-icon left>mdi-account</v-icon>
      <v-toolbar-title>
        {{ $t('user-details') }}
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon disabled>
        <v-icon>mdi-chat</v-icon>
      </v-btn>
      <v-btn icon :loading="loading" :disabled="loading" @click="reload">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <apps-admin-user-avatar :userId="userId" :name="fullname" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ fullname }}</v-list-item-title>
                <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <!-- fullname - update -->
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ fullname }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('fullname') }}</v-list-item-subtitle>
              </v-list-item-content>
              <!-- @todo add Update Fullname component -->
            </v-list-item>
            <!-- email - update -->
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ email }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('email') }}</v-list-item-subtitle>
              </v-list-item-content>
              <!-- @todo add Update Email component -->
            </v-list-item>
            <!-- ADVANCED - BORING STUFF -->
            <!-- userId -->
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ userId }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('user-id') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <!-- ADVANCED - EVEN MORE BORING STUFF -->
            <!-- auditing -->
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ createdAt }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('createdAt') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ createdBy }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('createdBy') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ lastModifiedAt }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('lastModifiedAt') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <div class="actions_container">
    <apps-admin-user-update-admin :userId="userId" :isAdmin="isAdmin" />
    <apps-admin-user-delete-user :userId="userId" />
  </div>
</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Details",
  props: {
    userId: {
      type: String,
      required: true,
    }
  },

  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    userId: {
      handler () {
        if (! this.loaded && ! this.loading) {
          this.load();
        }
      }
    }
  },

  methods: {
    ...mapActions({
      loadUserWithUserId: 'apps/admin/users/loadUserWithUserId',
    }),

    async load () {
      return await (this.userId) ? this.loadUserWithUserId(this.userId) : undefined;
    },

    async reload () {
      return await this.load();
    },
  },

  computed: {
    ...mapGetters({
      userWithUserId: 'apps/admin/users/userWithUserId',
    }),

    user () {
      return (this.userId) ? this.userWithUserId(this.userId) : undefined;
    },

    loaded () {
      return (this.user) ? this.user.loaded : false;
    },

    loading () {
      return (this.user) ? this.user.loading : false;
    },

    email () {
      return (this.user) ? this.user.email : undefined;
    },
    isAdmin () {
      return (this.user) ? (this.user.hasOwnProperty('isAdmin') ? this.user.isAdmin : false) : undefined;
    },

    fullname () {
      return (this.user) ? this.user.fullname : undefined;
    },

    createdAt () {
      return (this.user) ? this.user.createdAt : undefined;
    },

    createdBy () {
      return (this.user) ? this.user.createdBy : undefined;
    },

    /**
     * Return the last modified at datetime.
     *
     * @returns {*|undefined}
     */
    lastModifiedAt () {
      return (this.user) ? this.user.lastModifiedAt : undefined;
    },
  },
}
</script>

<style>
.details_container {
  display: flex;
  flex-direction: column;
  gap: 2rem
}

.actions_container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
</style>
