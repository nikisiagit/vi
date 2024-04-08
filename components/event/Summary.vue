<template>
  <v-card color="primary">

    <v-container fluid>
      <v-row>
        <v-col cols="4" md="4" lg="2" xl="2" class="pink">

          <v-card color="">
            <v-card-title v-if="startDateTime">
              {{ startDateTime }}
            </v-card-title>

            <v-card-subtitle v-if="endDateTime">
              {{ endDateTime }}
            </v-card-subtitle>

            <v-card-actions>
              <v-btn icon v-show="true" color="primary">
                <v-icon>
                  mdi-calendar-plus
                </v-icon>
              </v-btn>

              <v-btn icon v-show="true" color="primary">
                <v-icon>
                  mdi-ticket
                </v-icon>
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="8" md="8" lg="10" xl="10">
          <v-card>
            <v-card-title>
              {{ titleId }}
            </v-card-title>
            <v-card-subtitle>
              <v-icon small>
                mdi-map-marker
              </v-icon>
              {{ eventType }} <span v-show="address">- {{ address }}</span>
            </v-card-subtitle>

            <v-card-text>
              <v-row>
                <v-col class="hidden-md-and-down" cols="12" md="7" lg="7">

                  <!-- Don't axe until we create the class to cut a long paragraph -->
                  <v-list-item-subtitle>{{ description }}</v-list-item-subtitle>

                </v-col>

                <v-col cols="12">

                  <v-row>
                    <v-col>
                      <v-avatar size="36px">
                        <v-icon>
                          mdi-account-group
                        </v-icon>
                      </v-avatar>
                      {{ members ? members.length : 0 }}
                    </v-col>
                    <v-col cols="12" md="5" lg="5" align="end">



                      <v-btn class="ml-2" color="primary" rounded>
                        <v-icon :left="$vuetify.breakpoint.mdAndUp">
                          mdi-ticket-confirmation
                        </v-icon>

                        <span class="hidden-md-and-down">
                         {{ $t('tickets') }}
                      </span>
                      </v-btn>

                    </v-col>
                  </v-row>

                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Summary",

  props: {
    eventId: {
      type: String,
      required: true,
    },
  },

  async created () {
    if (this.initialised) {
      if (! this.loaded && ! this.loading) {
        return await this.load();
      }
    }
  },

  watch: {
    initialised: {
      handler () {
        if (this.initialised) {
          if (! this.loaded && ! this.loading) {
            this.load();
          }
        }
      }
    }
  },

  methods: {
    ...mapActions({
      loadEventWithEventId: 'events/loadEventWithEventId',
    }),

    async load () {
      return await (this.eventId) ? this.loadEventWithEventId(this.eventId) : undefined;
    }
  },

  computed: {
    ...mapGetters({
      eventWithEventId: 'events/eventWithEventId',
    }),

    /**
     * The Event.
     *
     * @returns {*|undefined}
     */
    event () {
      return (this.eventId) ? this.eventWithEventId(this.eventId) : undefined;
    },

    /**
     * The titleId.
     *
     * @returns {*|undefined}
     */
    titleId () {
      return (this.event) ? this.event.titleId : undefined;
    },

    /**
     * Return the descriptionId.
     * @returns {*|undefined}
     */
    descriptionId () {
      return (this.event) ? this.event.descriptionId : undefined;
    },

    /**
     * The startDateTime.
     *
     * @returns {*|undefined}
     */
    startDateTime () {
      return (this.event) ? this.event.startDateTime : undefined;
    },

    /**
     * The endDateTime.
     *
     * @returns {*|undefined}
     */
    endDateTime () {
      return (this.event) ? this.event.endDateTime : undefined;
    },
  }
}
</script>
