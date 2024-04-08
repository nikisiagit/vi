<template>
  <v-container fluid>
    <!-- title -->
    <v-row>
      <v-col>
        <apps-admin-rooms-title />
      </v-col>
    </v-row>

    <!-- tabs -->
    <v-row>
      <v-col>
        <apps-admin-rooms-tabs @join-daily-room="(daily) => $emit('join-daily-room', daily)"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "IndexApp",

}
</script>

