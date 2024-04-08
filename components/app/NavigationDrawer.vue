<template>
  <v-navigation-drawer v-model="drawer" app clipped permanent>
    <v-list>

      <v-list-item link :to="{name: 'index'}" exact>
        <v-list-item-avatar>
          <v-icon>mdi-home</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ $t('home') }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('home-subtitle') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link :to="{name: 'me'}" exact>
        <v-list-item-avatar>
          <v-icon>mdi-account-circle</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ $t('me') }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('me-subtitle') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <apps-admin-venue-nav-list-item />
      <apps-admin-events-nav-list-item />
      <apps-admin-rooms-nav-list-item />
      <apps-admin-contents-nav-list-item />
      <apps-admin-users-nav-list-item />
      <apps-admin-chats-nav-list-item />

      <apps-admin-languages-nav-list-item />

      <apps-admin-tickets-nav-list-item />
      <apps-admin-addresses-nav-list-item />
      <apps-admin-themes-nav-list-item />
      <apps-admin-tags-nav-list-item />
      <apps-admin-resources-nav-list-item />
      <apps-admin-advertisements-nav-list-item />
      <apps-admin-integrations-nav-list-item />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "navigation-drawer",

  data: () => ({
    drawer: false,
  })
}
</script>
