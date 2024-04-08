<template>
  <v-card>
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>
    <v-card-title>
      <v-icon left>mdi-account-circle</v-icon>
      {{ $t('update-admin') }}
    </v-card-title>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ isAdminLocal }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('Admin') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn-toggle class="ml-auto"
                        :value="isAdminLocal"
                        @change="handleChange"
                        mandatory>
            <v-btn :value="true"
                   :loading="submitting"
                   :disabled="submitting">
              <v-icon>mdi-check</v-icon>
            </v-btn>
            <v-btn :value="false"
                   :loading="submitting"
                   :disabled="submitting">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UpdateAdmin",
  props: {
    isAdmin: {
      default: false,
      type: Boolean,
      required: true,
    },
     userId: {
      type: String,
      required: true,
     }
  },
  data: () => ({
    valid: true,
    submitting: false,
    isAdminLocal: false,
  }),

  created() {
    this.isAdminLocal = this.isAdmin;
  },

  watch: {
    isAdmin: {
      handler () {
        this.isAdminLocal = this.isAdmin;
      },
    }
  },

  methods: {
    ...mapActions({
      updateUser: 'apps/admin/users/updateUser',
    }),

    handleChange(value) {
      this.isAdminLocal = value;
      this.submit()
    },

    async submit () {
      try {
        const userUpdate = {
          userId : this.userId,
          isAdmin: this.isAdminLocal
        }
        this.submitting = true;
        await this.updateUser(userUpdate)
        this.submitting = false;

      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>
