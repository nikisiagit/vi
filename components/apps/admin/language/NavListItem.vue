<template>
  <v-list-item :to="{name: 'apps-admin-languages-languageId', params: {languageId: languageId}}">
    <v-list-item-avatar>
      <apps-admin-language-avatar :language-id="languageId" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ languageId }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('language')}}</v-list-item-subtitle>
    </v-list-item-content>

  </v-list-item>
</template>

<script>
export default {
  name: "NavListItem",

  props: {
    languageId: {
      type: String,
      required: true,
    }
  },


}
</script>
