<template>
  <v-card :loading="loading">

    <v-card-title>
      <v-icon left>mdi-door-sliding</v-icon>
      {{ $t('Rooms') }}
    </v-card-title>

    <v-card-subtitle>{{ $t('Rooms_Subtitle') }}</v-card-subtitle>

    <template slot="progress">
      <v-progress-linear color="primary" height="4" indeterminate />
    </template>

    <v-card-text>
      <div class="text-center">
        <span class="display-1">{{ numberOfRooms }}</span>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-help-circle</v-icon>
          </v-btn>
        </template>
        {{ $t('Rooms_Tooltip') }}
      </v-tooltip>

<!--      <template v-if="! initialised">-->
<!--        <v-tooltip right>-->
<!--          <template v-slot:activator="{ on, attrs }">-->
<!--            <v-btn icon v-bind="attrs" v-on="on" color="warning">-->
<!--              <v-icon right>mdi-alert-circle</v-icon>-->
<!--            </v-btn>-->
<!--          </template>-->
<!--          {{ $t('Uninitialised') }}-->
<!--        </v-tooltip>-->
<!--      </template>-->

      <template v-if="error">
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" color="error">
              <v-icon right>mdi-alert</v-icon>
            </v-btn>
          </template>
          {{ error }}
        </v-tooltip>
      </template>

      <v-spacer />
      <v-btn class="ml-2"
             :loading="loading"
             :disabled="loading"
             @click="$emit('reload')">
        <v-icon left>
          mdi-refresh
        </v-icon>
        {{ $t('Reload') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Id",
  props: {
    numberOfRooms: {
      type: Number
    },
    error: {
      type: String
    },
    loading: {
      type: Boolean
    }
  }
}
</script>

