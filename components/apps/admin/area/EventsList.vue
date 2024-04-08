<template>
  <v-card outlined :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-toolbar flat>
      <v-icon left>mdi-calendar</v-icon>

      <v-toolbar-title>
        {{ $t('events-list') }}
      </v-toolbar-title>
      <v-spacer />

      <v-btn rounded :loading="loading" :disabled="loading" @click="reload">
        <v-icon left>mdi-refresh</v-icon>{{ $t('reload') }}
      </v-btn>

    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-container fluid>

          <v-row>
            <v-col>

              {{ $t('events-filters') }}

              <div>
                <v-btn-toggle
                  class="mt-2"
                  v-model="eventsFiltersEnabled"
                  mandatory
                  dense
                  color="primary accent-3"
                >

                  <v-btn :value="true">
                    {{ $t('ON') }}
                  </v-btn>

                  <v-btn :value="false">
                    {{ $t('OFF') }}
                  </v-btn>

                </v-btn-toggle>
              </div>

            </v-col>

            <v-col>
              {{ $t('events-sort-by') }}

              <div>
                <v-radio-group v-model="eventsSortBy" column>
                  <v-radio :label="latestLabel" value="desc"></v-radio>
                  <v-radio :label="oldestLabel" value="asc"></v-radio>
                  <v-radio :label="alphabeticallyLabel" value="alphabetically"></v-radio>
                </v-radio-group>
              </div>

            </v-col>
          </v-row>

        </v-container>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn block @click="submit" :disabled="updatingComponent && updatingComponent.updating" :loading="updatingComponent && updatingComponent.updating">
        {{ $t('update') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "EventsList",
  props: {
    areaId: {
      type: String
    }
  },
  computed: {
    ...mapGetters({
      componentWithAreaIdAndComponentType: 'apps/admin/areas/componentWithAreaIdAndComponentType',

      updatingComponentWithExecutionArn: 'apps/admin/areas/updatingComponentWithExecutionArn',
    }),

    latestLabel () {
      return this.$i18n.t('latest-first');
    },

    oldestLabel () {
      return this.$i18n.t('oldest-first');
    },

    alphabeticallyLabel () {
      return this.$i18n.t('alphabetically');
    },

    eventsListComponent () {
      return (this.areaId) ? this.componentWithAreaIdAndComponentType(this.areaId, 'eventslist') : undefined;
    },

    componentId () {
      return (this.eventsListComponent) ? this.eventsListComponent.componentId : undefined;
    },

    updatingComponent () {
      return (this.executionArn) ? this.updatingComponentWithExecutionArn(this.executionArn) : undefined;
    },

    loaded () {
      return (this.eventsListComponent) ? this.eventsListComponent.loaded : false;
    },

    loading () {
      return (this.eventsListComponent) ? this.eventsListComponent.loading : true;
    },

    error () {
      return (this.eventsListComponent) ? this.eventsListComponent.error : undefined;
    }
  },
  data: () => ({
    valid: true,

    eventsFiltersEnabled: true,
    eventsSortBy: 'desc', // asc - desc - alphabetically?

    executionArn: undefined,
  }),
  watch: {
    eventsListComponent(){
      this.eventsFiltersEnabled = this.eventsListComponent?.eventsFiltersEnabled
      this.eventsSortBy = this.eventsListComponent?.eventsSortBy
    }
  },
  methods: {
    ...mapActions({
      load: 'apps/admin/areas/loadComponentWithComponentId',

      updateComponent: 'apps/admin/areas/updateComponent'
    }),

    async reload () {
      return await this.load({
        areaId: this.areaId,
        componentId: this.componentId
      });
    },

    reset () {
      this.valid = true

      this.eventsFiltersEnabled = true
      this.eventsSortBy = 'desc'

      this.$refs.form.reset();
    },

    async submit () {
      // after rules has been added, it requires to update the template to pick up validation.
      this.$nextTick(async () => {
        if (! this.$refs.form.validate()) {
          this.valid = false;
          return;
        }

        this.valid = true;

        // update events list
        this.eventsListToUpdate = {
          eventsFiltersEnabled: this.eventsFiltersEnabled,
          eventsSortBy: this.eventsSortBy,
        }

        const updatingComponent = await this.updateComponent({
          componentId: this.componentId,
          areaId: this.areaId,
          ...this.eventsListToUpdate
        })

        if (updatingComponent) {

          const {executionArn, startDate} = updatingComponent;

          //@todo: handle errors
          //@todo: show messages success/failure

          this.executionArn = executionArn;
        } else {
          console.log("throw error from step function...")
        }

      })
    },
    cancel () {
      this.$emit('cancel');
      this.$emit('reset');
    },
  }
}
</script>
