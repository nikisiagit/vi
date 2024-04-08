<template>
  <v-list class=" pt-4 px-6">
    <!-- ${$vuetify.theme.dark ? 'black--text': 'white--text '} -->
    <v-list-item
      class="mb-2 rounded-lg"
      :class="$route.name === 'events-eventId-lobby' ? ` primary lighten-4 primary--text text--darken-1`: 'primary--text'"
      :exact-active-class="`${$vuetify.theme.dark ? 'primary lighten-1': 'primary'}`" link :to="{
        name: 'events-eventId-lobby',
        params: {eventId: this.eventId}
      }">
      <v-list-item-content>
        <v-list-item-title >
          <h3 class="ml-2">
          {{ $t('Welcome') }}
          </h3>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item
      class="mb-2 rounded-lg"
      :class="$route.name === 'events-eventId-lobby-2' ? ` primary lighten-4 primary--text text--darken-1`: 'primary--text'"
      :exact-active-class="`${$vuetify.theme.dark ? 'primary lighten-1': 'primary'}`" link :to="{
        name: 'events-eventId-lobby-2',
        params: {eventId: this.eventId}
      }">
      <v-list-item-content>
        <v-list-item-title><h3 class="ml-2">{{ $t('Welcome-2') }}</h3></v-list-item-title>
      </v-list-item-content>
    </v-list-item>


    <v-list-item
      class="mb-2 rounded-lg"
      :class="$route.name === 'events-eventId-schedule' ? ` primary lighten-4 primary--text text--darken-1`: 'primary--text'"
      :exact-active-class="`${$vuetify.theme.dark ? 'primary lighten-1': 'primary'}`" link :to="{
        name: 'events-eventId-schedule',
        params: {eventId: this.eventId}
      }">
      <v-list-item-content>
        <v-list-item-title><h3 class="ml-2">{{ $t('Schedule') }}</h3></v-list-item-title>
      </v-list-item-content>
    </v-list-item>


    <v-list-item class="mb-2 rounded-lg"      :class="$route.name === 'events-eventId-exhibitors' ? ` primary lighten-4 primary--text text--darken-1`: 'primary--text'"
                       :exact-active-class="`${$vuetify.theme.dark ? 'primary lighten-1': 'primary'}`" link :to="{
        name: 'events-eventId-exhibitors',
        params: {eventId: this.eventId}
      }">
      <v-list-item-content>
        <v-list-item-title><h3 class="ml-2">{{ $t('Exhibitors') }}</h3></v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item class="mb-2 rounded-lg"     :class="$route.name === 'events-eventId-networking' ? ` primary lighten-4 primary--text text--darken-1`: 'primary--text'"
                      :exact-active-class="`${$vuetify.theme.dark ? 'primary lighten-1': 'primary'}`" link :to="{
        name: 'events-eventId-networking',
        params: {eventId: this.eventId}
      }">
      <v-list-item-content>
        <v-list-item-title><h3 class="ml-2">{{ $t('Networking') }}</h3></v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item class="mb-2 rounded-lg"      :class="$route.name === 'events-eventId-resources' ? ` primary lighten-4 primary--text text--darken-1`: 'primary--text'"
                       :exact-active-class="`${$vuetify.theme.dark ? 'primary lighten-1': 'primary'}`" link :to="{
        name: 'events-eventId-resources',
        params: {eventId: this.eventId}
      }">
      <v-list-item-content>
        <v-list-item-title><h3 class="ml-2">{{ $t('Resources') }}</h3></v-list-item-title>
      </v-list-item-content>
    </v-list-item>

  </v-list>
</template>

<script>
export default {
  computed: {
    eventId(){
      return this.$route.params.eventId
    }
  }
}
</script>
