<!-- Venue App (Admin) Registration - Tabs | A smart component that renders the Registration Tabs (internal).-->
<template>
  <v-card rounded>
    <template>
      <v-tabs v-model="model" color="primary" >
        <v-tab>{{ $t('details') }}</v-tab>
        <v-tab>{{ $t('fields') }}</v-tab>
        <v-tab>{{ $t('reports') }}</v-tab>
        <v-tab>{{ $t('dashboard') }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="model">

        <!-- DETAILS -->
        <v-tab-item>
          <v-sheet width="100%"
                   height="100%"
                   elevation="1"
                   rounded="lg"
                   :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">
            <v-container fluid class="fill-height">
              <v-row>
                <v-col>
                  <apps-admin-registration-details :registration-id="registrationId"
                    @update-registration-property="openUpdateRegistrationDialog"
                  />
                </v-col>
              </v-row>
            </v-container>

            <!-- Update Registration Dialog -->
            <v-dialog
              v-model="updateRegistrationDialog"
              width="800px">
              <template v-if="updateRegistrationDialog && updateRegistrationProperty === 'name'">
                <apps-admin-registration-update-registration-name
                  :registration-id="registrationId"
                  @close="onClose"
                />
              </template>

              <template v-if="updateRegistrationDialog && updateRegistrationProperty === 'title'">
                <apps-admin-registration-update-registration-title
                  :registration-id="registrationId"
                  @close="onClose"
                />
              </template>

              <template v-if="updateRegistrationDialog &&  updateRegistrationProperty === 'description'">
                <apps-admin-registration-update-registration-description
                  :registration-id="registrationId"
                  @close="onClose"
                />
              </template>
            </v-dialog>
          </v-sheet>
        </v-tab-item>

        <!-- FIELDS -->
        <v-tab-item>
          <v-sheet width="100%"
                   height="100%"
                   elevation="1"
                   rounded="lg"
                   :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">
            <v-container fluid class="fill-height">
              <v-row>
                <v-col>
                  <apps-admin-registration-fields-app :registration-id="registrationId" />
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-tab-item>

        <!-- REPORTS -->
        <v-tab-item>
          <v-sheet width="100%"
                   height="100%"
                   elevation="1"
                   rounded="lg"
                   :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">
            <v-container fluid class="fill-height">
              <v-row>
                <v-col>
                  <apps-admin-registrations-reports />
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-tab-item>

        <!-- DASHBOARD -->
        <v-tab-item>
          <v-sheet width="100%"
                   height="100%"
                   elevation="1"
                   rounded="lg"
                   :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">
            <v-container fluid class="fill-height">
              <v-row>
                <v-col>
                  <apps-admin-registrations-dashboard />
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-tab-item>

      </v-tabs-items>
    </template>

  </v-card>
</template>

<script>

export default {
  name: "Tabs",
  data () {
    return {
      model: 'tab-2',
      updateRegistrationDialog: false,
      updateRegistrationProperty: undefined,
    }
  },
  props: {
    registrationId: {
      type: String,
      required: true,
    },
  },

  methods: {
    openUpdateRegistrationDialog(property){
      this.updateRegistrationProperty = property
      this.updateRegistrationDialog = true;
    },

    onClose(){
      this.updateRegistrationDialog = false;
      this.updateRegistrationProperty = ''
    }
  },

}
</script>

