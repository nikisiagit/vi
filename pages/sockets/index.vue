<!--
Sockets page
-->
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4">
<!--        <v-sheet class="pa-2" rounded :style="'backgroundColor: rgba(0,0,0,0.2)'">-->
          <sockets-list />
<!--        </v-sheet>-->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "index"
}
</script>
