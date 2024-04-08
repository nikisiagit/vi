<template>
  <v-card>
    <v-card-title>
      {{ $t(`How will attendees access ${title}?`) }}
    </v-card-title>

    <v-card-text>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-container fluid>

          <v-row>
            <v-col cols="12" lg="4">

              {{ currencyId }}<span v-show="$vuetify.breakpoint.mdAndDown">:</span>

              <span v-show="$vuetify.breakpoint.mdAndDown">
                {{ retrieveFormatLabel(format) }}
              </span>

              <div>
                <v-btn-toggle
                  class="mt-2"
                  v-model="format"
                  mandatory
                  dense
                  color="primary accent-3"
                >

                  <v-btn value="virtual">
                    <v-icon :left="$vuetify.breakpoint.mdAndUp">
                      mdi-web
                    </v-icon>
                    <span class="hidden-sm-and-down">{{ virtualFormatLabel }}</span>
                  </v-btn>

                  <v-btn value="in_person">
                    <v-icon :left="$vuetify.breakpoint.mdAndUp">
                      mdi-map-marker-radius
                      <!--                    mdi-account-->
                    </v-icon>
                    <span class="hidden-sm-and-down">{{ inPersonFormatLabel }}</span>
                  </v-btn>

                  <v-btn value="hybrid">
                    <v-icon :left="$vuetify.breakpoint.mdAndUp">
                      mdi-map-marker-distance
                    </v-icon>

                    <span class="hidden-sm-and-down">{{ hybridFormatLabel }}</span>
                  </v-btn>

                </v-btn-toggle>
              </div>

            </v-col>

            <v-col cols="12" lg="12" v-if="format !== 'virtual'">

              <addresses-address-form
                v-if="false"

                ref="addressForm"
                :address="address"
                :language-id="splitLanguage"
                @change-address="changeAddress"
              />

              <apps-admin-addresses-select :rules="[v => !!v || 'An Address is required.']" :value="addressId" @change="changeAddressId" />

            </v-col>

          </v-row>

         <v-row>
           <v-col cols="12" lg="4">

             {{ $t('event-tickets') }}

             <v-row>
               <v-col cols="auto">
                 <v-checkbox
                   class="mt-1"
                   v-model="freeTicket"
                   :label="freeTicketLabel"
                 />
               </v-col>

               <v-col cols="auto">
                 <v-checkbox
                   class="mt-1"
                   v-model="paidTicket"
                   :label="paidTicketLabel"
                 />
               </v-col>
             </v-row>

           </v-col>

           <v-col cols="12" lg="8" v-show="paidTicket">
             <apps-admin-region-currencies-select :value="currencyIdValue" @change="changeCurrency" />
           </v-col>
         </v-row>

          <v-row>
            <v-col cols="12" lg="12">
              <apps-admin-languages-select :value="languageIdValue" @change="changeLanguage" />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <apps-admin-tags-select @change="changeTags" />
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
  name: "EventLocale",
  props: {
    title: {
      type: String,
      required: true
    },
    languageIdValue: {
      type: String,
      required: false
    },
    currencyIdValue: {
      type: String,
      required: false
    }
  },
  computed: {
    splitLanguage(){
      return this.languageIdValue ? this.languageIdValue.split(':')[2]: undefined
    },

    freeTicketLabel () {
      return this.$i18n.t('free');
    },

    paidTicketLabel () {
      return this.$i18n.t('paid');
    },

    inPersonFormatLabel () {
      return this.$i18n.t('in-person');
    },

    virtualFormatLabel () {
      return this.$i18n.t('virtual');
    },

    hybridFormatLabel () {
      return this.$i18n.t('hybrid');
    },

  },
  data: () => ({
    valid: true,

    freeTicket: true,
    paidTicket: true,
    format: 'virtual',
    address: {},

    currencyId: undefined,
    languageId: undefined,


    addressId: undefined,
    tagIds: [],
  }),
  watch: {
    languageIdValue: {
      immediate: true,
      handler(){
        this.languageId = this.languageIdValue
      }
    },
    currencyIdValue: {
      immediate: true,
      handler(){
        this.currencyId = this.currencyIdValue
      }
    }
  },
  methods: {
    changeTags (tagIds = []) {
      this.tagIds = tagIds;
    },

    changeAddressId (addressId) {
      this.addressId = addressId;
    },


    retrieveFormatLabel(id){
      return id === 'in_person' ? this.inPersonFormatLabel: id === 'virtual'? this.virtualFormatLabel: this.hybridFormatLabel
    },

    submit () {

      // if (this.format !== 'virtual' && ! this.$refs.addressForm.$refs.form.validate()) {
      //   return;
      // }

      // after rules has been added, it requires to update the template to pick up validation.
      this.$nextTick(() => {
        if (! this.$refs.form.validate()) {
          this.valid = false;
          return;
        }

        this.valid = true;
        this.$emit('submitted', {
          format: this.format,
          address: this.address,
          ticketAccess: {
            free: this.freeTicket,
            paid: this.paidTicket,
          },
          currencyId: this.currencyId,
          languageId: this.languageId,
          addressId: this.addressId,

          tagIds: this.tagIds
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

    changeCurrency (currencyId) {
      this.currencyId = currencyId;
    },

    changeLanguage (languageId) {
      this.languageId = languageId;
    },

    changeAddress (address) {
      this.address = address
    }
  }
}
</script>
