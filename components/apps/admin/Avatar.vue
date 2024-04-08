<template>
<!--  <div>-->
    <v-btn fab icon :to="{ name: 'apps-admin' }">
      <v-avatar size="48" color="lime darken-1" >
        <v-icon dark>mdi-shield-crown-outline</v-icon>
      </v-avatar>
    </v-btn>

<!--    <div class="text-subtitle-2">-->
<!--      <nuxt-link :to="{ name: 'apps-admin' }" class="text-decoration-none">-->
<!--        {{ $t('admin') }}-->
<!--      </nuxt-link>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
export default {
  name: "Avatar",

}
</script>

