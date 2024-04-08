<!--
Create Daily Room
-->
<template>
  <!-- Create registration Card -->
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear color="primary" height="4" indeterminate />
    </template>


    <v-toolbar
      dark
      color="primary"
    >

      <v-toolbar-title class="font-weight-bold">
<!--        <v-icon left>mdi-form-select</v-icon>-->
        <v-btn
          icon
          @click="cancel"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        {{ $t('Create-room') }}

      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>

        <v-btn
          text
          @click="submitForm"
        >
          <h3>{{ $t('create') }}</h3>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>


    <v-stepper v-model="currentStep" class="fill-height">
      <v-stepper-header>
        <v-stepper-step :complete="currentStep > 1" step="1" >
          <template>
            <span class="text-center d-block">{{ $t('room-details') }}</span>
            <small>{{ $t('room-details-subtitle')}}</small>
          </template>
        </v-stepper-step>

        <v-divider></v-divider>


      </v-stepper-header>

      <v-stepper-items class="fill-height">




      </v-stepper-items>

    </v-stepper>


    <template>
      <v-tabs
        fixed-tabs
        bg-color="indigo-darken-2"
      >
        <v-tab
        @click="setSection('basic')"
        >
          Basic Room
        </v-tab>
        <v-tab
          @click="setSection('advanced')"
        >
          Advanced Room
        </v-tab>
      </v-tabs>
    </template>

    <v-container>

      <v-expansion-panel>

        <apps-admin-daily-create-room-basic-settings v-if="section === 'basic'" />

        <apps-admin-daily-create-room-advanced-settings v-if="section === 'advanced'" />

      </v-expansion-panel>



    </v-container>


  </v-card>



</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CreateRoom",

  data: () => ({
      section: 'basic'
  }),

  computed: {
  },

  methods: {
    ...mapActions({
    }),

    async setSection(section){
      this.section = section
      console.log(this.section)
    }
  },
}
</script>
