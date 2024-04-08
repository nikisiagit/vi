<template>
  <v-list two-line subheader >

    <v-list-item>
      <v-list-item-content>
        <v-row>
          <v-col cols="6">
            <v-list-item-title>
              Maximum participants
            </v-list-item-title>
            <v-list-item-subtitle>
              Set the maximum number of participants allowed in a room at the same time.
            </v-list-item-subtitle>
          </v-col>

          <v-col cols="6">
            <v-text-field
              type="number"
              placeholder="Enter maximum participants"
              counter="200"
              required
            />
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>

    <v-divider  />

  </v-list>
</template>

<script>
export default {
  name: "CreateRoomAdvancedSettings",

}
</script>
