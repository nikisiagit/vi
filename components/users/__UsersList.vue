<template>
  <v-list two-line>

    <!-- List with users (No Clickable users list) -->
    <template v-if="! isClickable" v-for="(user, index) in users">
      <v-list-item :key="index+randomNumber" >

        <v-list-item-content>
          <v-list-item-title>
            <slot name="tag" v-bind:user="user"></slot>

            {{ user.name}}
          </v-list-item-title>


          <v-list-item-subtitle v-text="user.email"></v-list-item-subtitle>

          <slot name="customSubtitle" v-bind:user="user"></slot>

        </v-list-item-content>

        <v-list-item-action>
          <v-container>
            <v-row>
              <slot name="customActions" v-bind:user="user"></slot>

              <v-col>
                <v-btn
                  icon
                  color="error"
                  @click.stop="removeUser(user)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>

        </v-list-item-action>
      </v-list-item>

      <v-divider
        v-if="index < users.length - 1"
        :key="index"
      ></v-divider>
    </template>
    <!-- /List with users (No Clickable users list) -->

    <!--  List with users selected (Clickable users list) -->
    <template v-if="isClickable">
      <v-list-item-group
        v-model="usersSelected"
        :active-class="activeClass"
        @change="$emit('input', usersSelected)"
        multiple
      >

        <template v-for="(user, index) in users">
          <v-list-item :key="user.profileId" :value="user.profileId">
            <template v-slot:default="{ active }">

              <v-list-item-icon
                class="mb-auto mr-2"
                v-show="activeItemIcon && inactiveItemIcon"
              >
                <v-icon
                  v-if="!active"
                  color="grey lighten-1"
                >
                  {{ inactiveItemIcon }}
                </v-icon>

                <v-icon
                  v-else
                  color="yellow darken-3"
                >
                  {{ activeItemIcon }}
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>
                  <slot name="tag" v-bind:user="user"></slot>

                  {{ user.name}}
                </v-list-item-title>

                <v-list-item-subtitle v-text="user.email"></v-list-item-subtitle>

              </v-list-item-content>

              <v-list-item-action>

                <v-container>
                  <v-row>
                    <slot name="customActions"></slot>

                    <v-col>
                      <v-btn
                        icon
                        color="error"
                        @click.stop="removeUser(user)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>

              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider
            v-if="index < users.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </template>
  </v-list>

  <!-- / List with users selected (Clickable users list) -->

</template>

<script>

export default {
  name: "UsersList",
  props: {
    value: {
      type: Array, // Array of profileIds should be selected
      required: false,
    },
    users: {
      type: Array,
      required: true
    },
    activeItemIcon: {
      type: String,
      required: false,
    },
    inactiveItemIcon: {
      type: String,
      required: false,
    },
    activeClass: {
      type: String,
      required: false,
    },
    isClickable: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      usersSelected: [], // array of profileIds
    };
  },
  created(){
    this.usersSelected = this.value
  },

  computed: {
    randomNumber(){
      return Math.floor(Math.random() * 10000)
    },
  },

  methods: {
    removeUser(user){
      this.$emit('remove-user', user)
    },
  }
};
</script>
