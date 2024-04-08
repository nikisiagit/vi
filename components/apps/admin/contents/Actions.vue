<template>
  <div>
    <!-- reload -->
    <v-btn icon @click="reload">
      <v-icon>mdi-refresh</v-icon>
    </v-btn>

    <!-- create -->
<!--     https://vuejs.org/api/built-in-components.html#transition -->
<!--     mode?: 'in-out' | 'out-in' | 'default' -->
    <v-dialog v-model="createContent"
              overlay-opacity="0.5"
              overlay-color="accent"
              max-width="600px"
              transition="slide-y-reverse-transition"
              mode="in-out"
              :fullscreen="isMobile">
      <template v-slot:activator="{on, attrs}">
        <v-btn icon v-bind="attrs" v-on="on" exact>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <apps-admin-contents-create-content @cancel="createContent=false;"/>
    </v-dialog>

    <!-- overflow -->
    <v-btn icon v-if="false">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>

  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Actions",

  data: () => ({
    createContent: false,
  }),

  watch : {
    '$route.hash' (newHash, oldHash) {
      if (newHash === '#create-content') {
        this.createContent = true;
      } else if (oldHash === '#create-content') {
        this.createContent = false;
      }
    },

    createContent: {
      handler () {
        if (this.createContent) {
          this.$router.push('#create-content');
        } else {
          this.$router.back();
        }
      }
    },
  },

  methods: {
    ...mapActions({
      reload: 'apps/admin/contents/reload',
    })
  },

  computed: {
    isMobile () {
      return this.$vuetify.breakpoint.name === 'xs';
    },
  }
}
</script>
