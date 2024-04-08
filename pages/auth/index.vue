<template>
  <v-container fluid>

    <!-- auth'ed -->
    <v-row>
      <v-col cols="12" md="4">
        <auth-sign-out />
      </v-col>

      <v-col cols="12" md="4">
        <auth-change-email />
      </v-col>

      <v-col cols="12" md="4">
        <auth-change-password />
      </v-col>
    </v-row>

    <!-- unauth'ed with account -->
    <v-row>
      <v-col cols="12" md="4">
        <auth-sign-in />
      </v-col>

      <v-col cols="12" md="4">
        <auth-new-password-required />
      </v-col>


      <v-col cols="12" md="4">
        <auth-forgot-password />
      </v-col>
    </v-row>

    <!-- unauth'ed without account -->
    <v-row>
      <v-col cols="12" md="4">
        <auth-sign-up />
      </v-col>

      <v-col cols="12" md="4">
        <auth-sign-up-confirm />
      </v-col>

      <v-col cols="12" md="4">
        <auth-sign-up-resend />
      </v-col>
    </v-row>

    <!-- debug -->
    <v-row>
      <v-col cols="12" md="4">
        <auth-debug />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "index"
}
</script>
