<template>
  <v-list :width="$vuetify.breakpoint.mobile ? 'auto': 250">
    <v-list-item nuxt :to="{ name: 'index' }">
      <v-list-item-icon>
        <v-icon>
          mdi-home
        </v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>
          Home
        </v-list-item-title>
        <v-list-item-subtitle>
          home
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

<!--    <v-list-item>-->
<!--      <v-list-item-icon>-->
<!--        <v-icon>-->
<!--          mdi-animation-play-->
<!--        </v-icon>-->
<!--      </v-list-item-icon>-->
<!--      <v-list-item-content>-->
<!--        <v-list-item-title >-->
<!--          Content-->
<!--        </v-list-item-title>-->
<!--        <v-list-item-subtitle>-->
<!--          content-->
<!--        </v-list-item-subtitle>-->
<!--      </v-list-item-content>-->
<!--    </v-list-item>-->

<!--    <v-list-item>-->
<!--      <v-list-item-icon>-->
<!--        <v-icon>-->
<!--          mdi-account-group-->
<!--        </v-icon>-->
<!--      </v-list-item-icon>-->
<!--      <v-list-item-content>-->
<!--        <v-list-item-title>-->
<!--          Community-->
<!--        </v-list-item-title>-->
<!--        <v-list-item-subtitle>-->
<!--          community-->
<!--        </v-list-item-subtitle>-->
<!--      </v-list-item-content>-->
<!--    </v-list-item>-->
  </v-list>
</template>

<script>
export default {
  name: 'HomeNavList',
}
</script>
