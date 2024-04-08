<!--
Venue App (Admin) Venue - Tabs

A smart component that renders the Tabs (internal) Nav.

-->
<template>
  <v-card rounded>
    <template>
      <v-tabs v-model="model" color="primary" >

        <v-tab>{{ $t('details') }}</v-tab>
        <v-tab>{{ $t('license') }}</v-tab>
        <v-tab>{{ $t('account-manager') }}</v-tab>
        <v-tab>{{ $t('areas') }}</v-tab>

      </v-tabs>

      <v-tabs-items v-model="model">

        <v-tab-item>
          <slot name="tab-details" />
        </v-tab-item>

        <v-tab-item>
          <slot name="tab-license" />
        </v-tab-item>

        <v-tab-item>
          <slot name="tab-account-manager" />
        </v-tab-item>


        <v-tab-item>
          <slot name="tab-areas" />
        </v-tab-item>


      </v-tabs-items>
    </template>

  </v-card>
</template>

<script>
export default {
  name: "VenueTabs",
  data () {
    return {
      model: 0,
    }
  },
}
</script>
