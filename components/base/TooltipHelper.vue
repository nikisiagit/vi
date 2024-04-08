<template>

  <v-tooltip

    v-model="showTooltip"
    :left="align === 'left'"
    :right="align === 'right'"
    :top="align === 'top'"
    :bottom="align === 'bottom'"
    :content-class="$vuetify.breakpoint.mdAndUp? 'compress-tooltip-txt': null"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        icon
        v-bind="attrs"

        @click="showTooltip = !showTooltip"
      >
        <v-icon >
          {{ icon }}
        </v-icon>
      </v-btn>
    </template>

    <v-row>
      <v-col cols="1" align-self="center">
        <v-icon >
          mdi-robot-confused
        </v-icon>
      </v-col>
      <v-col cols="11" >
        <span v-text="text"/>
      </v-col>
    </v-row>

  </v-tooltip>

<!--  <v-container-->
<!--    fluid-->
<!--    class="text-center"-->
<!--    v-if="showTooltip"-->
<!--  >-->
<!--    <v-row-->
<!--      class="flex"-->
<!--      justify="space-between"-->
<!--    >-->
<!--      <v-col-->
<!--        cols="12"-->
<!--      >-->
<!--        <v-tooltip-->
<!--          v-model="showTooltip"-->
<!--          left-->
<!--          :content-class="$vuetify.breakpoint.mdAndUp? 'compress-tooltip-txt': null"-->
<!--        >-->
<!--          <template v-slot:activator="{ attrs }">-->
<!--            <v-btn-->
<!--              plain-->
<!--              v-bind="attrs"-->
<!--              @click="closeTooltip"-->
<!--            >-->
<!--              <v-icon color="grey lighten-1">-->
<!--                {{ icon }}-->
<!--              </v-icon>-->
<!--            </v-btn>-->
<!--          </template>-->

<!--          <span v-text="text"/>-->

<!--        </v-tooltip>-->
<!--      </v-col>-->

<!--    </v-row>-->
<!--  </v-container>-->
</template>

<script>
export default {
  name: "TooltipHelper",
  props: {
    // showTooltip: {
    //   type: Boolean
    // },
    align: {
      type: String,
      default: 'top'
    },
    text: {
      type: String,
    },
    icon: {
      type: String,
      default: 'mdi-information'
    }
  },
  data(){
    return {
      showTooltip: false,
    }
  },
  methods: {
    closeTooltip(){
      this.$emit('close-tooltip')
    }
  }
}
</script>

<style lang="scss">
.compress-tooltip-txt{
  max-width: 30%;
}
</style>
