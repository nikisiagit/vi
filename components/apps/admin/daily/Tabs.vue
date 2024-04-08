<!--
Venue App (Admin) Registrations - Tabs

A smart component that renders the RegistrationsApp Tabs (internal) Nav.

-->
<template>
  <v-card rounded>
    <template>
      <v-tabs v-model="model" color="primary" >

        <v-tab>{{ $t('daily') }}</v-tab>

      </v-tabs>

      <v-tabs-items v-model="model">

        <v-tab-item>

          <v-sheet width="100%"
                   height="100%"
                   elevation="1"
                   rounded="lg"
                   :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'"
          >

            <v-container fluid class="fill-height">

              <v-row>
                <v-col>
                  <apps-admin-daily-search />
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <apps-admin-daily-list />
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
