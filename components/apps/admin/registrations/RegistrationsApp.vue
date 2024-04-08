<template>
  <v-card rounded>
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

   <v-card-text>
     <!-- title -->
     <v-row>
       <v-col>
         <apps-admin-registrations-title />
       </v-col>
     </v-row>

     <!-- tabs -->
     <v-row>
       <v-col>
         <apps-admin-registrations-tabs />
       </v-col>
     </v-row>
   </v-card-text>

  </v-card>
</template>

<script>
export default {
  name: "RegistrationsApp",
}
</script>

