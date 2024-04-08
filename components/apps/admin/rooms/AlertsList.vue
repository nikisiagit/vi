<template>
  <v-list>
    <apps-admin-rooms-alert-list-item
      v-for="(alert, index) in alerts"
      :key="index"
      :alerts="alert.alerts"
      :generated="alert.generated"
      :type="alert.type"
    />
  </v-list>
</template>

<script>
export default {
  name: "AlertList",
  props: {
    alerts: {
      type: Array,
      required: true,
    },
  },
};
</script>


