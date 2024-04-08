<template>
  <v-menu
    offset-y
    left
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        absolute
        top
        class="mt-n3"
        icon
        v-bind="attrs"
        v-on="handleMenu(on, attrs)"
      >
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>


    <v-list>
      <v-list-item
        link
        v-for="(action, i) in actions"
        :key="i"
        :value="action"
      >
        {{ action }}
      </v-list-item>
    </v-list>

  </v-menu>
</template>

<script>
export default {
  name: 'MessageListItemActions',
  props: {
    qaMode: {
      type: Boolean,
    },
    moderationMode: {
      type: Boolean,
    },
  },
  methods: {
    handleMenu(on, attrs){
      this.$emit('menu-opened', attrs['aria-expanded'] === 'true')

      return on
    }
  },
  data(){
    return {
      chatActions: ['Reply', 'Send to Q&A'],
      moderationActions: ['Approve', 'Reject'],
      qaActions: ['Assign'],
    }
  },
  computed: {
    actions(){
      if ( this.qaMode )
        return this.qaActions
      else if ( this.moderationMode )
        return this.moderationActions
      else
        return this.chatActions
    }
  }
}
</script>
