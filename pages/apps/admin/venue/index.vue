<!--
[PRO-240] Venue App (Admin) - Venue

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-240

App Admin - Venue Index Page

A smart component that renders the Admin Venue App.
-->
<template>
  <v-container fluid>
    <v-row>
      <v-col>

        <!--
        Admin Venue App
        -->
        <v-sheet width="100%"
                 height="100%"
                 elevation="1"
                 rounded="lg"
                 :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">
          <v-container fluid class="fill-height">

            <!--
             Title
             -->
            <v-row>
              <v-col cols="12">
                <apps-admin-venue-title />
              </v-col>
            </v-row>


            <v-row>
              <v-col cols="12">
                <apps-admin-venue-tabs>

                  <template v-slot:tab-license>
                    <!--
                    Licence/Account Manager/Support
                    -->
                    <v-row>
                      <v-col cols="12">
                        <apps-admin-venue-licence />
                      </v-col>
                    </v-row>
                  </template>

                  <template v-slot:tab-account-manager>
                    <!--
                    Account Manager
                    -->
                    <v-row>
                      <v-col cols="12">
                        <apps-admin-venue-account-manager />
                      </v-col>
                    </v-row>
                  </template>

                  <template v-slot:tab-details>

                    <!--
                    Details
                    -->
                    <v-row>
                      <v-col cols="12">
                        <apps-admin-venue-details @update-venue-property="openUpdateVenueDialog"/>
                      </v-col>
                    </v-row>


                  </template>

                  <template v-slot:tab-areas>

                    <v-row>
                      <v-col>
                        <apps-admin-areas-list :area-id="areaId"/>
                      </v-col>
                    </v-row>

                  </template>
                </apps-admin-venue-tabs>
              </v-col>
            </v-row>

          </v-container>
        </v-sheet>

      </v-col>
    </v-row>

    <!-- Update Venue Dialog -->
    <v-dialog
      v-model="updateVenueDialog"
      width="800px"
    >

      <template v-if="updateVenueDialog && updateVenueProperty === 'title'">
        <!-- update title -->
        <apps-admin-venue-update-title />
      </template>

      <template v-if="updateVenueDialog && updateVenueProperty === 'description'">
        <!-- update description -->
        <apps-admin-venue-update-description />
      </template>

      <template v-if="updateVenueDialog && updateVenueProperty === 'status'">
        <!-- update status -->
        <apps-admin-venue-update-status />
      </template>

      <template v-if="updateVenueDialog && updateVenueProperty === 'theme'">
        <!-- update theme id -->
        <apps-admin-venue-update-theme-id />
      </template>

      <template v-if="updateVenueDialog &&  updateVenueProperty === 'currency'">
        <!-- currency id -->
        <apps-admin-venue-update-currency-id />
      </template>

      <template v-if="updateVenueDialog &&  updateVenueProperty === 'language'">
        <!-- update language id -->
        <apps-admin-venue-update-language-id />
      </template>

      <template v-if="updateVenueDialog &&  updateVenueProperty === 'timezone'">
        <!-- update timezone id -->
        <apps-admin-venue-update-timezone-id />
      </template>

      <template v-if="updateVenueDialog &&  updateVenueProperty === 'address'">
        <!-- update address id -->
        <apps-admin-venue-update-address-id />
      </template>

    </v-dialog>


<!--    <v-row>-->
<!--      <v-col cols="12" md="4">-->
<!--        <apps-admin-venue-debug />-->
<!--      </v-col>-->
<!--    </v-row>-->

  </v-container>
</template>

<script>

export default {
  name: "index",
  layout: 'default',
  data(){
    return {
      updateVenueDialog: false,
      updateVenueProperty: ''
    }

  },

  methods: {
    openUpdateVenueDialog(property){
      this.updateVenueProperty = property
      this.updateVenueDialog = true;
    },

    onClose(){
      this.updateVenueDialog = false;
      this.updateVenueProperty = ''

    }

  }
}
</script>
