<!--
Venue (Admin) - WAF Page

The WAF Page is used by Admins to Geo restrictions to their partition.
-->
<template>
  <v-container fluid>
    <v-row>
      <v-col>

        <!--
        Venue App (Admin) - Waf

        The app is nested inside a "glass" container.
        -->
        <v-sheet width="100%"
                 height="100%"
                 elevation="1"
                 rounded="lg"
                 :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">
          <v-container fluid class="fill-height">

            <!--
            Waf Rules

            -->
            <v-row>
              <v-col>
                <apps-admin-waf-create-rule />
              </v-col>
            </v-row>

          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "index",
  layout: 'admin',
}
</script>
