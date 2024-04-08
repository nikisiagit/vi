<template>
  <!-- class="rounded-pill" -->
  <v-alert :class="{ 'rounded-pill': $vuetify.breakpoint.mdAndUp }" transition="slide-x-transition" :icon="icon" text :type="type">
    <v-row align="center">
      <v-col class="grow">
        {{ title }}

        <div>
          <small class="text--disabled">
            {{ text }}
          </small>
        </div>
      </v-col>


      <v-col class="shrink" v-show="actionText">
        <v-btn color="info" plain >
          <strong>{{ actionText }}</strong>
        </v-btn>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
export default {
  name: "PreviewAlert",
  props: {
    title: {
      type: String
    },
    text: {
      type: String
    },
    icon: {
      type: String,
    },
    actionText: {
      type: String,
    },
    type: {
      type: String,
      default: 'info'
    },
  }
}
</script>

<style lang="scss">
.v-alert__wrapper .v-icon {
  align-self: center;
}
</style>
