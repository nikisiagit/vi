<template>
  <v-list :width="$vuetify.breakpoint.mobile ? 'auto': 250">
<!--    <v-list-item>-->
<!--      <v-list-item-avatar>-->
<!--        <v-icon color="primary">-->
<!--          mdi-shield-account-->
<!--        </v-icon>-->
<!--      </v-list-item-avatar>-->
<!--      <v-list-item-content>-->
<!--        <v-list-item-title class="text-h6">-->
<!--          Admin-->
<!--        </v-list-item-title>-->
<!--        <v-list-item-subtitle>-->
<!--          admin-subtitle-->
<!--        </v-list-item-subtitle>-->
<!--      </v-list-item-content>-->
<!--      <v-list-item-action v-if="closable" @click="$emit('close')">-->
<!--        <v-btn icon>-->
<!--          <v-icon>-->
<!--            mdi-menu-down-->
<!--          </v-icon>-->
<!--        </v-btn>-->
<!--      </v-list-item-action>-->
<!--    </v-list-item>-->

<!--    <v-divider></v-divider>-->

    <apps-admin-venue-nav-list-item />
    <apps-admin-addresses-nav-list-item />
    <apps-admin-themes-nav-list-item />
    <apps-admin-languages-nav-list-item />
    <apps-admin-events-nav-list-item />
    <apps-admin-tickets-nav-list-item />
    <apps-admin-rooms-nav-list-item />
    <apps-admin-users-nav-list-item />
    <apps-admin-tags-nav-list-item />
    <apps-admin-contents-nav-list-item />
    <apps-admin-resources-nav-list-item />
    <apps-admin-advertisements-nav-list-item />
    <apps-admin-integrations-nav-list-item />
  </v-list>
</template>

<script>
export default {
  props: {
    closable: {
      type: Boolean,
      default: true
    }
  }
}
</script>
