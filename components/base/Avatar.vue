<template>
  <div>
    <!-- WITH status indicator -->
    <v-badge
      v-show="statusIndicator"
      bottom
      bordered
      :color="statusIndicatorColor"
      :offset-x="retrieveSize.offsetX"
      :offset-y="retrieveSize.offsetY"
      :dot="size === 'sm' || size === 'xs'">
      <v-avatar
        :color="color"
        :size="retrieveSize.avatar"
        class="rounded-pill"
        @click="onClick">
        <v-img v-if="avatar" :src="avatar"></v-img>
        <v-icon  v-else-if="icon" :size="retrieveSize.icon">
          {{ icon }}
        </v-icon>
        <span v-else class="font-weight-medium" :class="retrieveSize.label">{{ initials(label) }}</span>
      </v-avatar>
    </v-badge>

    <!-- WITHOUT status indicator -->
<!--      :color="!avatar ? color  || 'primary': ''"-->
<!--      class="rounded-pill"-->
    <v-avatar
      v-show="! statusIndicator"
      :color="color"
      :size="retrieveSize.avatar"
      @click="onClick">
      <v-img v-if="avatar" :src="avatar"/>
      <v-icon :size="retrieveSize.icon" v-else-if="icon">
        {{ icon }}
      </v-icon>
      <span class="font-weight-medium" :class="retrieveSize.label" v-else>{{ initials(label) }}</span>
    </v-avatar>
  </div>
</template>

<script>
export default {
  name: "BaseAvatar",
  props: {
    avatar: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    statusIndicator: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      // default: 'mdi-account-circle'
    },
    color: {
      type: String,
      // default: 'primary'
    },
    size: {
      type: String,
      default: 'md' // sm, md, lg, xs, xl
    },
    statusIndicatorColor: {
      type: String,
      default: 'green'
    },
    onClick: {
      type: Function,
      default: () => {},
      required: false,
    }
  },
  watch: {
    color: {
      handler () {
        console.log(`## BASE AVATAR COLOR UPDATED`);
      },
    }
  },
  data(){
    return {}
  },
  computed: {
    retrieveSize () {
      switch (this.size) {
        case 'xs':
          return {
            avatar: '2rem',
            icon: '1.8rem',
            label: 'text-h6',
            offsetX: '10',
            offsetY: '10'
          }

        case 'sm':
          return {
            avatar: '3rem',
            icon: '2.5rem',
            label: 'text-h5',
            offsetX: '10',
            offsetY: '10'
          }

        case 'md':
          return {
            avatar: '6rem',
            icon: '5rem',
            label: 'text-h4',
            offsetX: '28',
            offsetY: '28'
          }

        case 'lg':
          return {
            avatar: '8rem',
            icon: '7rem',
            label: 'text-h3',
            offsetX: '28',
            offsetY: '28'
          }

        case 'xl':
          return {
            avatar: '14rem',
            icon: '13rem',
            label: 'text-h3',
            offsetX: '40',
            offsetY: '40'
          }

        default:
          console.warn("Avatar Invalid size.")
      }
    }
  },
  methods: {
    initials(label) {
      if ( ! label || ! Object.keys(label).length) {
        return undefined;
      }

      let arrName = label.split(" ");
      let fistNameLetter = label.charAt(0);
      let lastNameLetter = arrName.length > 1 ? arrName[arrName.length - 1].charAt(0): '';
      return (fistNameLetter + lastNameLetter).toUpperCase();
    },
  }
}
</script>
