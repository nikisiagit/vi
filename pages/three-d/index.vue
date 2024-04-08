<template>
  <div>
    <v-row>
      <v-col>
        <three-d-premium-booth />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Index",
  pageTransition: {
    name: 'page',
    mode: 'out-in'
  }
}
</script>
