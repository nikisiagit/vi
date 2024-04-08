<template>
  <v-card rounded elevation="4">
    <v-card-title class="primary">
      <v-icon left v-if="alert.type === 'success'">mdi-check</v-icon>
      <v-icon left v-else-if="alert.type === 'error'">mdi-alert-circle</v-icon>
      {{alert.type === 'success' ? $t('Success') : $t('Error')}}
    </v-card-title>
    <v-card-text>
      <h2 class="text-sm-body-1 mt-5">{{ alert.alerts }}</h2>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn @click="cancel">{{ $t('close') }}</v-btn>
      <v-btn class="primary" v-if="alert.type === 'success'">{{ $t('view') }}</v-btn>
      <v-btn class="primary" v-else>{{ $t('retry') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'

export default {
  name: 'ViewAlert',
  props: {
    alert: {
      type: Object,
      default: () => ({
        type: '',
        alerts: '',
      })
    },
  },
  methods: {
    cancel() {
      this.$emit('close');
    }
  }
}
</script>

