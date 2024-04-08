<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <p>Restricted access</p>
          </v-card-title>
          <v-card-text>
            <h1>This venue is not available in you country bla bla. Make me look cool</h1>
            <p>contact support or whatever we want to say</p>
          </v-card-text>

          <v-card-actions>
            <NuxtLink to="/">
              Support link maybe
            </NuxtLink>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: "restricted",
  layout: "blank"
}
</script>
