<!--
Daily App

-->
<template>
  <v-container class="fill-height" fluid v-if="roomUrl && roomName">

<!--    <v-row>-->
<!--      <v-col>-->

<!--     -->
<!--        <v-sheet width="100%"-->
<!--                 height="100%"-->
<!--                 elevation="1"-->
<!--                 rounded="lg"-->
<!--                 :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">-->


<!--          <v-container fluid class="fill-height">-->

<!--            <v-row>-->
<!--              <v-col>-->
<!--               -->
<!--              </v-col>-->
<!--            </v-row>-->

<!--            </v-container>-->
<!--        </v-sheet>-->
<!--      </v-col>-->

<!--      </v-row>-->




    <apps-admin-daily-call-frame
      :status="status"
      :url="roomUrl"
      :roomName="roomName"
      @change-status-call="changeStatusCall"
    />

  </v-container>


</template>

<script>

export default {
  name: "DailyApp",
  props: {
    roomUrl: {
      type: String
    },

    roomName: {
      type: String
    }

  },
  data() {
    return {
      status: "home", // status of the call can be: ["home", "call"]

    };
  },

  methods: {
    changeStatusCall(status){
      this.status = status

      if( status === 'home')
        this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
}
</style>
