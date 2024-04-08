<template>
  <v-list-item>
    <v-list-item-avatar>
      <apps-admin-template-avatar :template-id="templateId" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ templateId }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('template-id') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "NavListItem",

  props: {
    templateId: {
      type: String,
      required: true,
    },
  },

  watch: {
    templateId: {
      handler () {

      }
    },
  },
}
</script>
