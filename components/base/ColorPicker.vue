<template>
  <v-menu ref="colorMenu"
          v-model="menuOpen"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="hexa"
        :label="label"
        :hint="hint"
        persistent-hint
        readonly
        clearable
        v-bind="attrs"
        v-on="on"
        @click:clear="clear"
      >
        <template v-slot:prepend>
          <v-icon :color="`${hexa}`" v-if="hasIcon">
            mdi-square-rounded
          </v-icon>
<!--        <template v-slot:prepend-inner>-->
<!--          <v-chip-->
<!--            v-if="color && color.hexa"-->
<!--            class="ma-2"-->
<!--            :color="`${color.hexa}`"-->
<!--            label-->
<!--            text-color="white"-->
<!--            style="height: 1.5rem"-->
<!--          />-->
        </template>


      </v-text-field>
    </template>

    <v-card>
      <v-card-text>
        <v-color-picker
          mode="hexa"
          v-if="menuOpen"
          v-model="pickerColor"
          @update:color="onColorChange"
          dot-size="25"
          hide-canvas
          hide-mode-switch
          show-swatches
          swatches-max-height="200"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="warning" @click="onReset">
          {{ $t('Reset') }}
        </v-btn>

        <v-btn text color="primary" @click="menuOpen = false">
          {{ $t('Close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: 'ColorPicker',
  props: {
    label: {
      type: String
    },

    hint: {
      type: String
    },

    // clear: {
    //   type: Boolean
    // },

    color: {
      type: String,
      required: false,
    },

    hasIcon: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      menuOpen: false,
      pickerColor: undefined,
      hexa: undefined,
      localColor: undefined
    }
  },

  computed: {
    colorWithHexa(){
      // @todo...
      return this.color && this.color.length < 8 ? `${this.color}FF`: this.color
    }
  },

  methods: {
    onReset(){
      // change current value to old color
      this.hexa = this.localColor
      this.pickerColor = this.localColor; //this.colorWithHexa;

      if ( this.localColor ) {
        this.$emit('change-color', this.localColor)
      }
    },

    onColorChange (colour) {
      this.$emit('change-colour', colour?.hexa)
      // console.log(`on color change`);
      // if ( this.pickerColor ) {
      //   this.$emit('change-colour', this.pickerColor);
      //   // console.log(`on color change - ${JSON.stringify(this.pickerColor)}`);
      // }
    },

    clear () {
      this.$emit('change-colour', undefined)
    }
  },

  // created() {
  //   this.pickerColor = this.color; //this.colorWithHexa;
  //
  //   if (this.pickerColor) {
  //     this.hexa = this.pickerColor.hexa ? this.pickerColor.hexa : this.pickerColor;
  //
  //     // create local copy of the current color from parent
  //     this.localColor = this.hexa;
  //   } else {
  //     this.hexa = undefined;
  //     this.localColor = undefined;
  //   }
  // },

  updated(){
    if ( ! this.localColor ) {
      // create local copy of the current color from parent
      this.localColor = this.color;
    }
  },

  watch: {
    color: {
      deep: true,
      immediate: true,
      handler(){
        this.pickerColor = this.color; //this.colorWithHexa;

        if (this.pickerColor) {
          this.hexa = this.pickerColor.hexa ? this.pickerColor.hexa : this.pickerColor;
        }  else {
          this.hexa = undefined;
        }
      }
    },

    pickerColor () {
      if (this.pickerColor) {
        this.hexa = this.pickerColor.hexa ? this.pickerColor.hexa : this.pickerColor;
      }
      // @todo: remove if the stepper area-component works correctly
      // if (this.hexa) {
      //   this.$emit('change-color', this.hexa)
      // }
    },

    menuOpen() {
      if (! this.menuOpen) {
        if (this.hexa) {
          this.$emit('on-close-change-color', this.hexa)
        }
      }
    },

    // clear() {
    //   if (this.clear) {
    //     this.color = undefined;
    //
    //     this.hexa = undefined
    //     this.pickerColor = undefined
    //   }
    // }
  },
}
</script>
