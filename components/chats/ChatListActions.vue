<template>
  <v-list>
    <v-list-item @click="">
      <v-list-item-avatar>
        <v-icon>mdi-eye-off</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          Mark as unread
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item @click="">
      <v-list-item-avatar>
        <v-icon>mdi-pin</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          Pin
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item @click="">
      <v-list-item-avatar>
        <v-icon>mdi-delete</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          Delete chat
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

  </v-list>
</template>

<script>
export default {
  name: 'ChatListActions',
}
</script>
