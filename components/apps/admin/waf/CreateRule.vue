<template>
  <v-card>
    <v-toolbar>

      <!--      <v-btn icon @click="cancel">-->
      <!--        <v-icon>mdi-arrow-left</v-icon>-->
      <!--      </v-btn>-->

      <v-btn icon @click="cancel">
        <v-icon>mdi-earth-off</v-icon>
      </v-btn>

      <v-toolbar-title>{{ $t('create-a-geo-restriction') }}</v-toolbar-title>
    </v-toolbar>

    <!-- the form -->
    <template>

      <!-- help text -->
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <p>
              Select the countries that you would like to restrict access to your venue
            </p>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-autocomplete
              v-model="localCountryCodes"
              :items="items"
              :disabled="isUpdating"
              filled
              chips
              label="Select Countries"
              item-text="text"
              item-value="code"
              multiple
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="removeCountry(data.item)"
                >
                  {{ data.item.text }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template>
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.text"></v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-btn block
               large
               @click="submit"
               :loading="submitting"
               :disabled="submitting">{{ $t('submit')}}</v-btn>
      </v-card-actions>
    </template>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CreateRule",

  data: () => ({
    submitting: false,
    debug: false,
    isUpdating: false,
    localCountryCodes: [],
    items: [
      { code: "AF", text: "Afghanistan - AF" },     { code: "AX", text: "Aland Islands - AX" },
      { code: "AL", text: "Albania - AL" },         { code: "DZ", text: "Algeria - DZ" },
      { code: "AS", text: "American Samoa - AS" },  { code: "AD", text: "Andorra - AD" },
      { code: "AO", text: "Angola - AO" },          { code: "AI", text: "Anguilla - AI" },
      { code: "AQ", text: "Antarctica - AQ" },      { code: "AG", text: "Antigua and Barbud - AG" },
      { code: "AR", text: "Argentina - AR" },       { code: "AM", text: "Armenia - AM" },
      { code: "AW", text: "Aruba - AW" },           { code: "AU", text: "Australia - AU" },
      { code: "AT", text: "Austria - AT" },         { code: "AZ", text: "Azerbaijan - AZ" },
      { code: "BS", text: "Bahamas - BS" },         { code: "BH", text: "Bahrain - BH" },
      { code: "BD", text: "Bangladesh - BD" },      { code: "BB", text: "Barbados - BB" },
      { code: "BY", text: "Belarus - BY" },         { code: "BE", text: "Belgium - BE" },
      { code: "BZ", text: "Belize - BZ" },          { code: "BJ", text: "Benin - BJ" },
      { code: "BM", text: "Bermuda - BM" },         { code: "BT", text: "Bhutan - BT" },
      { code: "BO", text: "Bolivia, Plurinationa - BO" }, { code: "BQ", text: "Bonaire, Sint Eustat- BQ" },
      { code: "BA", text: "Bosnia and Herzegovin - BA" }, { code: "BW", text: "Botswana - BW" },
      { code: "BV", text: "Bouvet Island - BV" },   { code: "BR", text: "Brazil - BR" },
      { code: "IO", text: "British Indian Ocean Territory - IO" }, { code: "BN", text: "Brunei Darussalam - BN" },
      { code: "BG", text: "Bulgaria - BG" },        { code: "BF", text: "Burkina Faso - BF" },
      { code: "BI", text: "Burundi - BI" },         { code: "KH", text: "Cambodia - KH" },
      { code: "CM", text: "Cameroon - CM" },        { code: "CA", text: "Canada - CA" },
      { code: "CV", text: "Cape Verde - CV" },      { code: "KY", text: "Cayman Islands - KY" },
      { code: "CF", text: "Central African Republic - CF" }, { code: "TD", text: "Chad - TD" },
      { code: "CL",  text: "Chile - CL" },           { code: "CN", text: "China - CN" },
      { code: "CX", text: "Christmas Island - CX" }, { code: "CC", text: "Cocos (Keeling) Islands - CC" },
      { code: "CO", text: "Colombia - CO" },        { code: "KM", text: "Comoros - KM" },
      { code: "CG", text: "Congo - CG" },           { code: "CD", text: "Congo, the Democraticthe - CD" },
      { code: "CK", text: "Cook Islands - CK" },    { code: "CR", text: "Costa Rica - CR" },
      { code: "CI", text: "Cote D'Ivoire - CI" },   { code: "HR", text: "Croatia - HR" },
      { code: "CU", text: "Cuba - CU" },            { code: "CW", text: "Curacao - CW" },
      { code: "CY", text: "Cyprus - CY" },          { code: "CZ", text: "Czech Republic - CZ" },
      { code: "DK", text: "Denmark - DK" },         { code: "DJ", text: "Djibouti - DJ" },
      { code: "DM", text: "Dominica - DM" },        { code: "DO", text: "Dominican Republic - DO" },
      { code: "EC", text: "Ecuador - EC" },         { code: "EG", text: "Egypt - EG" },
      { code: "SV", text: "El Salvador - SV" },     { code: "GQ", text: "Equatorial Guinea - GQ" },
      { code: "ER", text: "Eritrea - ER" },         { code: "EE", text: "Estonia - EE" },
      { code: "ET", text: "Ethiopia - ET" },        { code: "FK", text: "Falkland Islands (Malvinas) - FK" },
      { code: "FO", text: "Faroe Islands - FO" },   { code: "FJ", text: "Fiji - FJ" },
      { code: "FI", text: "Finland - FI" },         { code: "FR", text: "France - FR" },
      { code: "GF", text: "French Guiana - GF" },   { code: "PF", text: "French Polynesia - PF" },
      { code: "TF", text: "French Southern Territories - TF" }, { code: "GA", text: "Gabon - GA" },
      { code: "GM", text: "Gambia - GM" },          { code: "GE", text: "Georgia - GE" },
      { code: "DE", text: "Germany - DE" },         { code: "GH", text: "Ghana - GH" },
      { code: "GI", text: "Gibraltar - GI" },       { code: "GR", text: "Greece - GR" },
      { code: "GL", text: "Greenland - GL" },       { code: "GD", text: "Grenada - GD" },
      { code: "GP", text: "Guadeloupe - GP" },      { code: "GU", text: "Guam - GU" },
      { code: "GT", text: "Guatemala - GT" },       { code: "GG", text: "Guernsey - GG" },
      { code: "GN", text: "Guinea - GN" },          { code: "GW", text: "Guinea-Bissau - GW" },
      { code: "GY", text: "Guyana - GY" },          { code: "HT", text: "Haiti - HT" },
      { code: "HM", text: "Heard Island and McDonald Islands - HM" }, { code: "VA", text: "Holy See (Vatican City State) - VA" },
      { code: "HN", text: "Honduras - HN" },        { code: "HK", text: "Hong Kong - HK" },
      { code: "HU", text: "Hungary - HU" },         { code: "IS", text: "Iceland - IS" },
      { code: "IN", text: "India - IN" },           { code: "ID", text: "Indonesia - ID" },
      { code: "IR", text: "Iran, Islamic Republic of - IR" }, { code: "IQ", text: "Iraq - IQ" },
      { code: "IE", text: "Ireland - IE" },         { code: "IM", text: "Isle of Man - IM" },
      { code: "IL", text: "Israel - IL" },          { code: "IT", text: "Italy - IT" },
      { code: "JM", text: "Jamaica - JM" },         { code: "JP", text: "Japan - JP" },
      { code: "JE", text: "Jersey - JE" },          { code: "JO", text: "Jordan - JO" },
      { code: "KZ", text: "Kazakhstan - KZ" },      { code: "KE", text: "Kenya - KE" },
      { code: "KI", text: "Kiribati - KI" },        { code: "KP", text: "Korea, Democratic Peoplof - KP" },
      { code: "KR", text: "Korea, Republic of - KR" }, { code: "XK", text: "Kosovo - XK" },
      { code: "KW", text: "Kuwait - KW" },          { code: "KG", text: "Kyrgyzstan - KG" },
      { code: "LA", text: "Lao People's Democratic Republic - LA" }, { code: "LV", text: "Latvia - LV" },
      { code: "LB", text: "Lebanon - LB" },         { code: "LS", text: "Lesotho - LS" },
      { code: "LR", text: "Liberia - LR" },         { code: "LY", text: "Libya - LY" },
      { code: "LI", text: "Liechtenstein - LI" },   { code: "LT", text: "Lithuania - LT" },
      { code: "LU", text: "Luxembourg - LU" },      { code: "MO", text: "Macao - MO" },
      { code: "MK", text: "Macedonia, the Former Yugosof - MK" }, { code: "MG", text: "Madagascar - MG" },
      { code: "MW", text: "Malawi - MW" },          { code: "MY", text: "Malaysia - MY" },
      { code: "MV", text: "Maldives - MV" },        { code: "ML", text: "Mali - ML" },
      { code: "MT", text: "Malta - MT" },           { code: "MH", text: "Marshall Islands - MH" },
      { code: "MQ", text: "Martinique - MQ" },      { code: "MR", text: "Mauritania - MR" },
      { code: "MU", text: "Mauritius - MU" },       { code: "YT", text: "Mayotte - YT" },
      { code: "MX", text: "Mexico - MX" },          { code: "FM", text: "Micronesia, Federated States of - FM" },
      { code: "MD", text: "Moldova, Republic of - MD" }, { code: "MC", text: "Monaco - MC" },
      { code: "MN", text: "Mongolia - MN" },        { code: "ME", text: "Montenegro - ME" },
      { code: "MS", text: "Montserrat - MS" },      { code: "MA", text: "Morocco - MA" },
      { code: "MZ", text: "Mozambique - MZ" },      { code: "MM", text: "Myanmar - MM" },
      { code: "NA", text: "Namibia - NA" },         { code: "NR", text: "Nauru - NR" },
      { code: "NP", text: "Nepal - NP" },           { code: "NL", text: "Netherlands - NL" },
      { code: "NC", text: "New Caledonia - NC" },   { code: "NZ", text: "New Zealand - NZ" },
      { code: "NI", text: "Nicaragua - NI" },       { code: "NE", text: "Niger - NE" },
      { code: "NG", text: "Nigeria - NG" },         { code: "NU", text: "Niue - NU" },
      { code: "NF", text: "Norfolk Island - NF" },  { code: "MP", text: "Northern Mariana Islands - MP" },
      { code: "NO", text: "Norway - NO" },          { code: "OM", text: "Oman - OM" },
      { code: "PK", text: "Pakistan - PK" },        { code: "PW", text: "Palau - PW" },
      { code: "PS", text: "Palestinian Authority - PS" }, { code: "PA", text: "Panama - PA" },
      { code: "PG", text: "Papua New Guinea - PG" }, { code: "PY", text: "Paraguay - PY" },
      { code: "PE", text: "Peru - PE" },            { code: "PH", text: "Philippines - PH" },
      { code: "PN", text: "Pitcairn - PN" },        { code: "PL", text: "Poland - PL" },
      { code: "PT", text: "Portugal - PT" },        { code: "PR", text: "Puerto Rico - PR" },
      { code: "QA", text: "Qatar - QA" },           { code: "RE", text: "Reunion - RE" },
      { code: "RO", text: "Romania - RO" },         { code: "RU", text: "Russian Federation - RU" },
      { code: "RW", text: "Rwanda - RW" },          { code: "BL", text: "Saint Barthelemy - BL" },
      { code: "SH", text: "Saint Helena, Ascensionda Cunha - SH" }, { code: "KN", text: "Saint Kitts and Nevis - KN" },
      { code: "LC", text: "Saint Lucia - LC" },     { code: "MF", text: "Saint Martin (French part) - MF" },
      { code: "PM", text: "Saint Pierre and Miquelon - PM" }, { code: "VC", text: "Saint Vincent and the Grenadines - VC" },
      { code: "WS", text: "Samoa - WS" },           { code: "SM", text: "San Marino - SM" },
      { code: "ST", text: "Sao Tome and Principe - ST" }, { code: "SA", text: "Saudi Arabia - SA" },
      { code: "SN", text: "Senegal - SN" },         { code: "RS", text: "Serbia - RS" },
      { code: "SC", text: "Seychelles - SC" },      { code: "SL", text: "Sierra Leone - SL" },
      { code: "SG", text: "Singapore - SG" },       { code: "SX", text: "Sint Maarten (Dutch part) - SX" },
      { code: "SK", text: "Slovakia - SK" },        { code: "SI", text: "Slovenia - SI" },
      { code: "SB", text: "Solomon Islands - SB" }, { code: "SO", text: "Somalia - SO" },
      { code: "ZA", text: "South Africa - ZA" },    { code: "GS", text: "South Georgia and the SoIslands - GS" },
      { code: "SS", text: "South Sudan - SS" },     { code: "ES", text: "Spain - ES" },
      { code: "LK", text: "Sri Lanka - LK" },       { code: "SD", text: "Sudan - SD" },
      { code: "SR", text: "Suriname - SR" },        { code: "SJ", text: "Svalbard and Jan Mayen - SJ" },
      { code: "SZ", text: "Swaziland - SZ" },       { code: "SE", text: "Sweden - SE" },
      { code: "CH", text: "Switzerland - CH" },     { code: "SY", text: "Syrian Arab Republic - SY" },
      { code: "TW", text: "Taiwan - TW" },          { code: "TJ", text: "Tajikistan - TJ" },
      { code: "TZ", text: "Tanzania, United Republic of - TZ" }, { code: "TH", text: "Thailand - TH" },
      { code: "TL", text: "Timor-Leste - TL" },     { code: "TG", text: "Togo - TG" },
      { code: "TK", text: "Tokelau - TK" },         { code: "TO", text: "Tonga - TO" },
      { code: "TT", text: "Trinidad and Tobago - TT" }, { code: "TN", text: "Tunisia - TN" },
      { code: "TR", text: "Turkey - TR" },          { code: "TM", text: "Turkmenistan - TM" },
      { code: "TC", text: "Turks and Caicos Islands - TC" }, { code: "TV", text: "Tuvalu - TV" },
      { code: "UG", text: "Uganda - UG" },          { code: "UA", text: "Ukraine - UA" },
      { code: "AE", text: "United Arab Emirates - AE" }, { code: "GB", text: "United Kingdom - GB" },
      { code: "US", text: "United States - US" },   { code: "UM", text: "United States Minor Outlying Islands - UM" },
      { code: "UY", text: "Uruguay - UY" },         { code: "UZ", text: "Uzbekistan - UZ" },
      { code: "VU", text: "Vanuatu - VU" },         { code: "VE", text: "Venezuela, Bolivarian Republic of - VE" },
      { code: "VN", text: "Viet Nam - VN" },        { code: "VG", text: "Virgin Islands, British - VG" },
      { code: "VI", text: "Virgin Islands, U.S. - VI" }, { code: "WF", text: "Wallis and Futuna - WF" },
      { code: "EH", text: "Western Sahara - EH" },  { code: "YE", text: "Yemen - YE" },
      { code: "ZM", text: "Zambia - ZM" },          { code: "ZW", text: "Zimbabwe - ZW " }
    ]
  }),

  created() {
    if (! this.loaded && !this.loading) {
      this.load();
    }
  },

  methods: {
    ...mapActions({
      createRule: 'apps/admin/waf/createRule',
      load: 'apps/admin/waf/load',
      reload: 'apps/admin/waf/reload',
      updateCountryCodes: 'apps/admin/waf/updateCountryCodes'
    }),

    reset () {
      this.countryCodes = [];
      this.submitting = false;
    },

    cancel () {
      this.reset();
      this.$emit('close');
    },

    async submit () {
      this.submitting = true;
      await this.createRule(this.countryCodes);
      this.submitting = false;
    },

    removeCountry (item) {
      const index = this.countryCodes.indexOf(item.code);
      if (index >= 0) this.countryCodes.splice(index, 1)
    },
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/waf/loading',
      loaded: 'apps/admin/waf/loaded',
      countryCodes: 'apps/admin/waf/countryCodes',
    }),

    nameLabel () {
      return this.$i18n.t('name');
    },

    nameHint () {
      return this.$i18n.t('name-hint');
    },

    namePlaceholder () {
      return this.$i18n.t('name-placeholder');
    },
  },
  watch: {
    isUpdating (val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000)
      }
    },
    localCountryCodes (val) {
      this.updateCountryCodes(val);
    },
    countryCodes (val) {
      this.localCountryCodes = val;
    }
  },
}
</script>
