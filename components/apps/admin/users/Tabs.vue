<!--
[PRO-129] Venue App (Admin) Users - Title

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-129

A smart component that renders the UsersApp Tabs (internal) Nav.

@link https://vuetifyjs.com/en/components/tabs/

Note - we dont need to use v-tabs to do this.
-->
<template>
  <v-card rounded>
    <template>
      <v-tabs v-model="model" color="pink" >

        <v-tab>{{ $t('users') }}</v-tab>
        <v-tab>{{ $t('settings') }}</v-tab>
<!--  https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools-working-with-aws-lambda-triggers.html-->
        <v-tab>{{ $t('triggers') }}</v-tab>

      </v-tabs>

      <v-tabs-items v-model="model" color="">

        <v-tab-item class="">



          <v-sheet width="100%"
                   height="100%"
                   elevation="1"
                   rounded="lg"
                   :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'"
          >

            <v-container fluid class="fill-height">


              <v-row>
                <v-col>
                  <apps-admin-users-search />
                </v-col>
              </v-row>

<!--              <v-row>-->
<!--                <v-col>-->
<!--                  <apps-admin-users-create-user />-->
<!--                </v-col>-->
<!--              </v-row>-->

              <v-row>
                <v-col>
                  <apps-admin-users-list />
                </v-col>
              </v-row>

<!--              <v-row>-->
<!--                <v-col>-->
<!--                  <apps-admin-users-table />-->
<!--                </v-col>-->
<!--              </v-row>-->
            </v-container>
          </v-sheet>
        </v-tab-item>

        <v-tab-item>
          <v-sheet width="100%"
                   height="100%"
                   elevation="1"
                   rounded="lg"
                   :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">
            <v-container fluid class="fill-height">
              <v-row>
                <v-col>
<!--                 <apps-admin-waf-create-rule />
-->
                  <apps-admin-users-details />
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-tab-item>

        <v-tab-item>
          <v-sheet width="100%"
                   height="100%"
                   elevation="1"
                   rounded="lg"
                   :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">
            <v-container fluid class="fill-height">
              <v-row>
                <v-col>

                  <v-card>
                    <v-card-title>
                      <v-icon left>mdi-timetable</v-icon>
                      {{ $t('admin-users-triggers')}}
                    </v-card-title>
                    <v-card-subtitle>
                      {{ $t('admin-users-triggers-subtitle')}}
                    </v-card-subtitle>

                    <!-- todo:implement triggers-->

                  </v-card>
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
      text: 'Lorem ipsum dolor sit amet.',
      text2: 'merve',
    }
  },
}
</script>

<style>
.card_spaces {
  box-shadow: 0 0 1rem 0 rgb(0 0 0 / 20%);
  backdrop-filter:blur(10px);
  padding: 20px;
  background-color: #79d3ca;
}
</style>
