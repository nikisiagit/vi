export default {
  computed: {

  },
  methods: {
    addAlpha(color, opacity = 0.8) {
      // coerce values so ti is between 0 and 1.
      const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
      return color + _opacity.toString(16).toUpperCase();
    },

    getContrast(hexcolor){
      // If a leading # is provided, remove it
      if (hexcolor.slice(0, 1) === '#') {
        hexcolor = hexcolor.slice(1);
      }

      // If a three-character hexcode, make six-character
      if (hexcolor.length === 3) {
        hexcolor = hexcolor.split('').map(function (hex) {
          return hex + hex;
        }).join('');
      }

      // Convert to RGB value
      var r = parseInt(hexcolor.substr(0,2),16);
      var g = parseInt(hexcolor.substr(2,2),16);
      var b = parseInt(hexcolor.substr(4,2),16);

      // Get YIQ ratio
      var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

      // Check contrast
      return (yiq >= 128) ? 'black' : 'white';
    },

    getComponentVTheme(vuetifyColor, textColor = '', needTransparency = false){
      const { isDark, themes } = this.$vuetify.theme;

      const vColor = isDark ? themes.dark[vuetifyColor]: themes.light[vuetifyColor];

      return {
        color: needTransparency ? this.addAlpha(vColor) : vColor,
        textColor: textColor,
        contrast: `${this.getContrast(vColor)}--text`
      }
    },

    getCustomComponentVTheme(backgroundTheme, textColor = '', needTransparency = false){
      const { isDark } = this.$vuetify.theme;
      const backgroundColor = 'background'

      const vColor = isDark ? backgroundTheme.dark[backgroundColor]: backgroundTheme.light[backgroundColor];

      return {
        color: needTransparency ? this.addAlpha(vColor) : vColor,
        textColor: textColor,
        contrast: `${this.getContrast(vColor)}--text`
      }
    },
  },
}
