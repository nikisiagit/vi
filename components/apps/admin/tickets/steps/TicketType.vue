<template>
  <v-card>
    <v-card-title>
      {{ $t(`What type of ticket is this?`) }}
    </v-card-title>

    <v-card-text>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-container fluid>
          <v-row>
            <v-col cols="12" lg="4">

              {{ $t('ticket-type') }}<span v-show="$vuetify.breakpoint.mdAndDown">:</span>

              <span v-show="$vuetify.breakpoint.mdAndDown">
                {{ retrieveTypeLabel(type) }}
              </span>

              <div>
                <v-btn-toggle
                  class="mt-2"
                  v-model="type"
                  mandatory
                  dense
                  color="primary accent-3"
                >

                  <v-btn value="free">
                    <v-icon :left="$vuetify.breakpoint.mdAndUp">
                      mdi-handshake
                    </v-icon>
                    <span class="hidden-sm-and-down">{{ freeLabel }}</span>
                  </v-btn>

                  <v-btn value="paid">
                    <v-icon :left="$vuetify.breakpoint.mdAndUp">
                      mdi-cash
                    </v-icon>
                    <span class="hidden-sm-and-down">{{ paidLabel }}</span>
                  </v-btn>

                </v-btn-toggle>
              </div>

            </v-col>

            <v-col cols="12" lg="4" v-if="type === 'paid'">

              <base-currency-field
                :label="priceLabel + ' *'"
                :hint="priceHint"
                :rules="priceRules"
                required
                ref="currencyField"
                v-model.number="price"

                :language-code="languageCode"
                :prefix="currencyPrefix"
                persistent-hint
                clearable

              >

<!--                <template v-slot:prepend>-->
<!--                  <v-text-field-->
<!--                    disabled-->
<!--                    v-model="currencySelected"-->
<!--                    label="Currency"-->
<!--                    solo-->
<!--                    dense-->
<!--                    outlined-->
<!--                  ></v-text-field>-->
<!--                </template>-->

              </base-currency-field>

            </v-col>

          </v-row>

          <v-row>
            <v-col cols="12" lg="4">

              {{ $t('ticket-access') }}<span v-show="$vuetify.breakpoint.mdAndDown">:</span>

              <span v-show="$vuetify.breakpoint.mdAndDown">
                {{ retrieveAccessLabel(access) }}
              </span>

              <div>
                <v-btn-toggle
                  class="mt-2"
                  v-model="access"
                  mandatory
                  dense
                  color="primary accent-3"
                >

                  <v-btn value="public">
                    <v-icon :left="$vuetify.breakpoint.mdAndUp">
                      mdi-eye
                    </v-icon>
                    <span class="hidden-sm-and-down">{{ publicLabel }}</span>
                  </v-btn>

                  <v-btn value="private">
                    <v-icon :left="$vuetify.breakpoint.mdAndUp">
                      mdi-eye-off
                    </v-icon>
                    <span class="hidden-sm-and-down">{{ privateLabel }}</span>
                  </v-btn>

                </v-btn-toggle>
              </div>

            </v-col>

          </v-row>

          <v-row>
            <v-col cols="12" lg="4">

              {{ $t('ticket-qr-code') }}<span v-show="$vuetify.breakpoint.mdAndDown">:</span>

              <span v-show="$vuetify.breakpoint.mdAndDown">
                {{ retrieveIncludeLabel(QRCode) }}
              </span>

              <div>
                <v-btn-toggle
                  class="mt-2"
                  v-model="QRCode"
                  mandatory
                  dense
                  color="primary accent-3"
                >

                  <v-btn value="include">
                    <v-icon :left="$vuetify.breakpoint.mdAndUp">
                      mdi-qrcode
                    </v-icon>
                    <span class="hidden-sm-and-down">{{ includeLabel }}</span>
                  </v-btn>

                  <v-btn value="do-not-include">
                    <v-icon :left="$vuetify.breakpoint.mdAndUp">
                      mdi-qrcode-remove
                    </v-icon>
                    <span class="hidden-sm-and-down">{{ dontIncludeLabel }}</span>
                  </v-btn>

                </v-btn-toggle>
              </div>

            </v-col>

          </v-row>
        </v-container>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn plain large rounded @click="cancel">{{ $t('cancel') }}</v-btn>
      <v-spacer />

      <v-btn text large class="pa-4" rounded @click="back">
        <v-icon small >
          mdi-arrow-left
        </v-icon>

        <v-spacer></v-spacer>

        {{ $t('back') }}
      </v-btn>
      <v-btn large class="pa-4" rounded @click="submit">
        {{ $t('next') }}

        <v-spacer></v-spacer>
        <v-icon small >
          mdi-arrow-right
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "TicketType",
  props: {},
  computed: {
    freeLabel () {
      return this.$i18n.t('free');
    },

    paidLabel () {
      return this.$i18n.t('paid');
    },

    publicLabel () {
      return this.$i18n.t('public');
    },

    privateLabel () {
      return this.$i18n.t('private');
    },

    includeLabel () {
      return this.$i18n.t('include');
    },

    dontIncludeLabel () {
      return this.$i18n.t('dont-include');
    },

    priceLabel () {
      return this.$i18n.t('ticket-price');
    },

    priceHint () {
      return this.$i18n.t('this-is-the-price-of-the-ticket');
    },

    currencyPrefix(){
      return '£' //@todo: retrieve from Venue currencyId
    },
  },
  data: () => ({
    valid: true,
    priceRules: [],

    type: 'free',
    access: 'public',
    QRCode: 'include',
    price: 0,

    languageCode: 'en',  //@todo: retrieve from Venue languageId
    currencySelected: 'GBP',  //@todo: retrieve from Venue currencyId
  }),
  methods: {
    retrieveTypeLabel(str){
      return str === 'free' ? this.freeLabel: this.paidLabel
    },

    retrieveAccessLabel(str){
      return str === 'public' ? this.publicLabel: this.privateLabel
    },

    retrieveIncludeLabel(str){
      return str === 'include' ? this.includeLabel: this.dontIncludeLabel
    },

    addPriceRules(){
      this.priceRules = [v => !(v <= 0) || 'A Price is required.']
    },

    reset () {
      this.valid = true
      this.pricingType = 'free'
      this.access = 'public'
      this.showQRCode = true
      this.price = 0

      this.$refs.form.reset();
    },

    submit () {
      this.addPriceRules();

      // after rules has been added, it requires to update the template to pick up validation.
      this.$nextTick(() => {
        if (! this.$refs.form.validate()) {
          this.valid = false;
          return;
        }

        this.valid = true;
        this.$emit('submitted', {
          pricingType: this.type,
          access: this.access,
          showQRCode: this.QRCode === 'include',
          price: this.price,
          // currencyId: ''
        });
      })
    },
    cancel () {
      this.$emit('close');
      this.$emit('reset');
    },
    back () {
      this.$emit('back');
    },
  }
}
</script>
