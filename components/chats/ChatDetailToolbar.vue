<template>
  <v-card>
    <v-toolbar flat height="65">

      <!-- append anything to the toolbar is is needed -->
      <slot name="toolbar-before" />
      <!-- -->


      <!-- icon group - icon channel or profile avatar-->
      <v-btn
        fab
        color="primary"
        class="mr-3"
        max-height="35"
        max-width="35"
      >
        <base-avatar
          :avatar="avatar"
          size="xs"

          :color="color"
          :icon="icon"

          :status-indicator="!!avatar"
        ></base-avatar>
      </v-btn>

      <v-toolbar-title>
        <strong>{{ title }}</strong>
      </v-toolbar-title>


<!--      <v-spacer></v-spacer>-->

<!--      <chats-avatar-group-->
<!--        flat-->
<!--      />-->

<!--      <v-btn icon>-->
<!--        <v-icon>mdi-dots-vertical</v-icon>-->
<!--      </v-btn>-->

      <!-- append anything to the toolbar is is needed -->
      <slot name="toolbar-after" />
      <!-- -->
    </v-toolbar>

  </v-card>

</template>

<script>
export default {
  name: 'ChatDetailToolbar',
  props: {
    title: {
      type: String,
    },
    icon: {
      type: String,
    },
    color: {
      type: String,
    },
    avatar: {
      type: String
    }
  },
}
</script>
