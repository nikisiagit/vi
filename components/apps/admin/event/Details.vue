<!--
Admin Event Details

A smart component that renders the details of the specified Event.
-->
<template>
  <v-card :loading="loading">
    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-calendar</v-icon>
      {{ $t('event-details') }}
      <v-spacer />
      <!-- reload -->
      <v-btn icon :loading="loading" :disabled="loading" @click="reload">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>

      <!-- help -->
<!--      <v-btn icon @click="showHelp = !showHelp">-->
<!--        <v-icon>mdi-help-circle</v-icon>-->
<!--      </v-btn>-->
    </v-card-title>

    <!-- help -->
<!--    <v-slide-y-transition>-->
<!--      <v-container fluid v-if="showHelp">-->
<!--        <v-row>-->
<!--          <v-col class="px-4">-->
<!--            <p>{{ $t('admin-event-details-help') }}</p>-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--      </v-container>-->
<!--    </v-slide-y-transition>-->

    <v-list two-line>
      <!-- avatar -->
      <v-list-item>
        <v-list-item-avatar>
          <apps-admin-event-avatar :event-id="eventId" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ $t(titleId) }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-event-title') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- title id -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ titleId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-event-title-id') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="primary" @click="onEdit('title')">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <!-- description id -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ descriptionId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-event-description-id') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="primary" @click="onEdit('description')">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <!-- tag ids -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>
            <v-chip label v-for="tag in tagIds" class="mr-2">
              {{ tag }}
            </v-chip>
          </v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-event-tag-ids') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="primary" @click="onEdit('tags')">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <!-- theme id -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ themeId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-event-theme-id') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="primary" @click="onEdit('theme')">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <!-- start date time -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ startDateTime }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-event-start-date-time') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="primary" @click="onEdit('event-dates')">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <!-- end date time -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ endDateTime }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-event-end-date-time') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="primary" @click="onEdit('event-dates')">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>


      <!-- currency id -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ currencyId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-event-currency-id') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="primary" @click="onEdit('currency')">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <!-- timezone id -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ timezoneId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-event-timezone-id') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="primary" @click="onEdit('timezone')">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <!-- language id -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ languageId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-event-language-id') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="primary" @click="onEdit('language')">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <!-- format -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ format }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-event-format') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="primary" @click="onEdit('format')">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <!-- address -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ addressId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-event-address-id') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="primary" @click="onEdit('address')">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <!-- created at -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ createdAt }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-event-created-at') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- created by -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ createdBy }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-event-created-by') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- last modified at -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ lastModifiedAt }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-event-last-modified-at') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- last modified by -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ lastModifiedBy }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-event-last-modified-by') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- deleting at -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ deletingAt }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-event-deleting-at') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- deleted by -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ deletedBy }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-event-deleted-by') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

    </v-list>

<!--    <v-container fluid v-if="false">-->
<!--      <v-row class="mb-3">-->
<!--        <v-col cols="12" md="4">-->
<!--          <v-list>-->
<!--            &lt;!&ndash; SETTINGS &ndash;&gt;-->
<!--            <v-subheader>{{ $t('settings') }}</v-subheader>-->

<!--            &lt;!&ndash; title and description &ndash;&gt;-->
<!--            <template v-if="titleId">-->
<!--              <v-dialog v-model="updateTitleDialog"-->
<!--                        overlay-color="accent"-->
<!--                        max-width="800px">-->
<!--                <template v-slot:activator="{on, attrs}">-->
<!--                  <apps-admin-label-list-item :label-id="titleId" v-bind="attrs" v-on="on"/>-->
<!--                </template>-->
<!--                <apps-admin-label-update-label :label-id="titleId" @close="updateTitleDialog = false;" />-->
<!--              </v-dialog>-->
<!--            </template>-->

<!--            <template v-if="descriptionId">-->
<!--              <v-dialog v-model="updateDescriptionDialog"-->
<!--                        overlay-color="accent"-->
<!--                        max-width="800px">-->
<!--                <template v-slot:activator="{on, attrs}">-->
<!--                  <apps-admin-label-list-item :label-id="descriptionId" v-bind="attrs" v-on="on"/>-->
<!--                </template>-->
<!--                <apps-admin-label-update-label :label-id="descriptionId" @close="updateDescriptionDialog = false;" />-->
<!--              </v-dialog>-->
<!--            </template>-->

<!--            &lt;!&ndash; tags &ndash;&gt;-->
<!--            <v-subheader>{{ $t('tagging') }}</v-subheader>-->
<!--            <template>-->
<!--              <v-dialog v-model="updateTagIdsDialog"-->
<!--                        overlay-color="accent"-->
<!--                        max-width="800px">-->
<!--                <template v-slot:activator="{on, attrs}">-->
<!--                  <v-list-item v-bind="attrs" v-on="on">-->
<!--                    <v-list-item-avatar>-->
<!--                      <v-icon>mdi-tag-multiple</v-icon>-->
<!--                    </v-list-item-avatar>-->
<!--                    <v-list-item-content>-->
<!--                      <v-list-item-title>{{ tagIds }}</v-list-item-title>-->
<!--                      <v-list-item-subtitle>{{ $t('event-tag-ids') }}</v-list-item-subtitle>-->
<!--                    </v-list-item-content>-->
<!--                  </v-list-item>-->
<!--                </template>-->
<!--                <apps-admin-event-update-tag-ids :event-id="eventId" @close="updateTagIdsDialog = false"/>-->
<!--              </v-dialog>-->
<!--            </template>-->

<!--            &lt;!&ndash; theming/branding - look and feel &ndash;&gt;-->
<!--            <v-subheader>{{ $t('theme') }}</v-subheader>-->
<!--            <v-dialog v-model="themeDialog" overlay-color="accent">-->
<!--              <template v-slot:activator="{on, attrs}">-->
<!--                <v-list-item v-bind="attrs" v-on="on" ripple exact>-->
<!--                  <v-list-item-avatar>-->
<!--                    <v-icon>mdi-palette</v-icon>-->
<!--                  </v-list-item-avatar>-->
<!--                  <v-list-item-content>-->
<!--                    <v-list-item-title>-->
<!--                      {{ $t('label:region:app:admin:event-theme-title') }}-->
<!--                    </v-list-item-title>-->
<!--                    <v-list-item-subtitle>-->
<!--                      {{ $t('label:region:app:admin:event-theme-subtitle') }}-->
<!--                    </v-list-item-subtitle>-->
<!--                  </v-list-item-content>-->
<!--                </v-list-item>-->
<!--              </template>-->
<!--              <apps-admin-event-update-theme @close="themeDialog = false" />-->
<!--            </v-dialog>-->

<!--          </v-list>-->
<!--        </v-col>-->

<!--        <v-col cols="12" md="4">-->
<!--          <v-list>-->
<!--            &lt;!&ndash; dates &ndash;&gt;-->
<!--            <v-subheader>{{ $t('dates') }}</v-subheader>-->
<!--            <v-dialog v-model="datesDialog" overlay-color="accent" max-width="800px">-->
<!--              <template v-slot:activator="{on, attrs}">-->
<!--                <v-list-item v-bind="attrs" v-on="on" ripple exact>-->
<!--                  <v-list-item-avatar>-->
<!--                    <v-avatar>-->
<!--                      <v-icon>mdi-calendar-clock</v-icon>-->
<!--                    </v-avatar>-->
<!--                  </v-list-item-avatar>-->
<!--                  <v-list-item-content>-->
<!--                    <v-list-item-title>{{ startDate }} &rightarrow; {{ endDate }}</v-list-item-title>-->
<!--                    <v-list-item-subtitle>{{ $t('event-starts') }} &rightarrow; {{ $t('event-ends') }}</v-list-item-subtitle>-->
<!--                  </v-list-item-content>-->
<!--                </v-list-item>-->
<!--              </template>-->
<!--              <apps-admin-event-update-dates :event-id="eventId" @close="datesDialog = false;" />-->
<!--            </v-dialog>-->

<!--            &lt;!&ndash; tickets ?? &ndash;&gt;-->
<!--            <v-subheader>{{ $t('tickets') }}</v-subheader>-->
<!--            <v-list-item>-->
<!--              <v-list-item-avatar>-->
<!--                <v-avatar>-->
<!--                  <v-icon>mdi-ticket</v-icon>-->
<!--                </v-avatar>-->
<!--              </v-list-item-avatar>-->
<!--              <v-list-item-content>-->
<!--                <v-list-item-title>{{ $t('event-tickets') }}</v-list-item-title>-->
<!--                <v-list-item-subtitle>{{ $t('event-tickets') }}</v-list-item-subtitle>-->
<!--              </v-list-item-content>-->
<!--            </v-list-item>-->

<!--            &lt;!&ndash; format &ndash;&gt;-->
<!--            <v-subheader>{{ $t('format') }}</v-subheader>-->
<!--            <v-list-item>-->
<!--              <v-list-item-avatar>-->
<!--                <v-avatar>-->
<!--&lt;!&ndash;                  <v-icon>mdi-map-marker-distance</v-icon>&ndash;&gt;-->
<!--                  <v-icon>mdi-web</v-icon>-->
<!--                </v-avatar>-->
<!--              </v-list-item-avatar>-->
<!--              <v-list-item-content>-->
<!--                <v-list-item-title>{{ format }}</v-list-item-title>-->
<!--                <v-list-item-subtitle>{{ $t('event-format') }}</v-list-item-subtitle>-->
<!--              </v-list-item-content>-->
<!--            </v-list-item>-->

<!--            &lt;!&ndash; address etc &ndash;&gt;-->
<!--            <v-list-item v-if="false">-->
<!--              <v-list-item-avatar>-->
<!--                <v-avatar>-->
<!--                  <v-icon>mdi-map-marker</v-icon>-->
<!--                </v-avatar>-->
<!--              </v-list-item-avatar>-->
<!--              <v-list-item-content>-->
<!--                <v-list-item-title>{{ addressId }}</v-list-item-title>-->
<!--                <v-list-item-subtitle>{{ $t('event-address-id') }}</v-list-item-subtitle>-->
<!--              </v-list-item-content>-->
<!--            </v-list-item>-->

<!--            &lt;!&ndash; SETTINGS &ndash;&gt;-->
<!--            &lt;!&ndash; i18n (currency-id, language-id, timezone-id &ndash;&gt;-->
<!--            <v-subheader>{{ $t('i18n') }}</v-subheader>-->
<!--            <v-dialog v-model="i18nDialog" overlay-color="accent" >-->
<!--              <template v-slot:activator="{on, attrs}">-->
<!--                <v-list-item v-bind="attrs" v-on="on" ripple exact>-->
<!--                  <v-list-item-avatar>-->
<!--                    <v-icon>mdi-web</v-icon>-->
<!--                  </v-list-item-avatar>-->
<!--                  <v-list-item-content>-->
<!--                    <v-list-item-title>-->
<!--                      {{ $t('label:region:app:admin:event-i18n-title') }}-->
<!--                    </v-list-item-title>-->
<!--                    <v-list-item-subtitle>-->
<!--                      {{ $t('label:region:app:admin:event-i18n-subtitle') }}-->
<!--                    </v-list-item-subtitle>-->
<!--                  </v-list-item-content>-->
<!--                </v-list-item>-->
<!--              </template>-->
<!--&lt;!&ndash;              <apps-admin-event-update-i18n @close="i18nDialog = false;"/>&ndash;&gt;-->
<!--            </v-dialog>-->

<!--            &lt;!&ndash; i18n &ndash;&gt;-->
<!--            <template v-if="false">-->
<!--              <v-list-item>-->
<!--                <v-list-item-content>-->
<!--                  <v-list-item-title>{{ languageId }}</v-list-item-title>-->
<!--                  <v-list-item-subtitle>{{ $t('event-language-id') }}</v-list-item-subtitle>-->
<!--                </v-list-item-content>-->
<!--              </v-list-item>-->

<!--              <v-list-item>-->
<!--                <v-list-item-content>-->
<!--                  <v-list-item-title>{{ currencyId }}</v-list-item-title>-->
<!--                  <v-list-item-subtitle>{{ $t('event-currency-id') }}</v-list-item-subtitle>-->
<!--                </v-list-item-content>-->
<!--              </v-list-item>-->

<!--              <v-list-item>-->
<!--                <v-list-item-content>-->
<!--                  <v-list-item-title>{{ timezoneId }}</v-list-item-title>-->
<!--                  <v-list-item-subtitle>{{ $t('event-timezone-id') }}</v-list-item-subtitle>-->
<!--                </v-list-item-content>-->
<!--              </v-list-item>-->
<!--            </template>-->

<!--          </v-list>-->
<!--        </v-col>-->

<!--        <v-col cols="12" md="4">-->
<!--          <v-list>-->
<!--            &lt;!&ndash; BORING ADMIN STUFF &ndash;&gt;-->
<!--            <v-subheader>{{ $t('advanced') }}</v-subheader>-->
<!--            &lt;!&ndash; boring admin stuff &ndash;&gt;-->
<!--            &lt;!&ndash; name &ndash;&gt;-->
<!--            <v-list-item>-->
<!--              <v-list-item-avatar>-->
<!--                <v-icon>mdi-link</v-icon>-->
<!--              </v-list-item-avatar>-->
<!--              <v-list-item-content>-->
<!--                <v-list-item-title>{{ name }}</v-list-item-title>-->
<!--                <v-list-item-subtitle>{{ $t('name') }}</v-list-item-subtitle>-->
<!--              </v-list-item-content>-->
<!--            </v-list-item>-->

<!--            &lt;!&ndash; audit &ndash;&gt;-->
<!--            &lt;!&ndash; createdBy &ndash;&gt;-->
<!--            <v-list-item>-->
<!--              <v-list-item-avatar>-->
<!--                <v-icon>mdi-account</v-icon>-->
<!--              </v-list-item-avatar>-->
<!--              <v-list-item-content>-->
<!--                <v-list-item-title>{{ createdBy }}</v-list-item-title>-->
<!--                <v-list-item-subtitle>{{ $t('event-created-by') }}</v-list-item-subtitle>-->
<!--              </v-list-item-content>-->
<!--            </v-list-item>-->

<!--            <v-list-item>-->
<!--              <v-list-item-avatar>-->
<!--                <v-icon>mdi-clock</v-icon>-->
<!--              </v-list-item-avatar>-->
<!--              <v-list-item-content>-->
<!--                <v-list-item-title>{{ createdAt }}</v-list-item-title>-->
<!--                <v-list-item-subtitle>{{ $t('event-created-at') }}</v-list-item-subtitle>-->
<!--              </v-list-item-content>-->
<!--            </v-list-item>-->


<!--            <v-list-item>-->
<!--              <v-list-item-avatar>-->
<!--                <v-icon>mdi-clock</v-icon>-->
<!--              </v-list-item-avatar>-->
<!--              <v-list-item-content>-->
<!--                <v-list-item-title>{{ lastModifiedAt }}</v-list-item-title>-->
<!--                <v-list-item-subtitle>{{ $t('event-last-modified-at') }}</v-list-item-subtitle>-->
<!--              </v-list-item-content>-->
<!--            </v-list-item>-->

<!--            &lt;!&ndash; deleting state &ndash;&gt;-->
<!--            <v-list-item>-->
<!--              <v-list-item-avatar>-->
<!--                <v-icon>mdi-account</v-icon>-->
<!--              </v-list-item-avatar>-->
<!--              <v-list-item-content>-->
<!--                <v-list-item-title>{{ deletedBy }}</v-list-item-title>-->
<!--                <v-list-item-subtitle>{{ $t('event-deleted-by') }}</v-list-item-subtitle>-->
<!--              </v-list-item-content>-->
<!--            </v-list-item>-->

<!--            <v-list-item>-->
<!--              <v-list-item-avatar>-->
<!--                <v-icon>mdi-clock</v-icon>-->
<!--              </v-list-item-avatar>-->
<!--              <v-list-item-content>-->
<!--                <v-list-item-title>{{ deletingAt }}</v-list-item-title>-->
<!--                <v-list-item-subtitle>{{ $t('event-deleting-at') }}</v-list-item-subtitle>-->
<!--              </v-list-item-content>-->
<!--            </v-list-item>-->

<!--          </v-list>-->
<!--        </v-col>-->
<!--      </v-row>-->
<!--    </v-container>-->

<!--    <v-container fluid>-->
<!--      <v-row>-->
<!--        <v-col  class="px-4">-->
<!--          <v-card outlined>-->
<!--            <v-card-actions>-->
<!--              <v-list-item class="error&#45;&#45;text">-->
<!--                <v-list-item-content >-->
<!--                  <v-list-item-title>-->
<!--                    <strong>{{ $t('cancel-event') }}</strong>-->
<!--                  </v-list-item-title>-->
<!--                  <v-list-item-subtitle>{{ $t('cancel-event-subtitle') }}</v-list-item-subtitle>-->
<!--                </v-list-item-content>-->
<!--                <v-list-item-action>-->
<!--                  <v-btn icon @click="openRemoveEventDialog">-->
<!--                    <v-icon color="error">-->
<!--                      mdi-delete-->
<!--                    </v-icon>-->
<!--                  </v-btn>-->
<!--                </v-list-item-action>-->
<!--              </v-list-item>-->
<!--            </v-card-actions>-->
<!--          </v-card>-->
<!--        </v-col>-->
<!--      </v-row>-->
<!--    </v-container>-->
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Details",

  props: {
    eventId: {
      type: String,
      required: true,
    },
  },



  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      loadEventWithEventId: 'apps/admin/events/loadEventWithEventId',
    }),

    async load () {
      return await (this.eventId) ? this.loadEventWithEventId(this.eventId) : undefined;
    },

    async reload () {
      return await this.load();
    },

    onEdit(property){
      this.$emit('update-event-property', property)

    },
  },

  computed: {
    ...mapGetters({
      eventWithEventId: 'apps/admin/events/eventWithEventId',
    }),

    event () {
      return (this.eventId) ? this.eventWithEventId(this.eventId) : undefined;
    },

    name () {
      return this.event?.name
    },

    createdBy () {
      return this.event?.createdBy;
    },

    createdAt () {
      return this.event?.createdAt;
    },

    lastModifiedAt () {
      return this.event?.lastModifiedAt;
    },

    lastModifiedBy () {
      return this.event?.lastModifiedBy;
    },

    deletingAt () {
      return this.event?.deletingAt;
    },

    deletedBy () {
      return this.event?.deletedBy;
    },

    loaded () {
      return (this.event) ? this.event.loaded : false;
    },

    loading () {
      return (this.event) ? this.event.loading : false;
    },

    error () {
      return (this.event) ? this.event.error : undefined;
    },

    titleId () {
      return this.event?.titleId
    },

    descriptionId () {
      return this.event?.descriptionId
    },

    tagIds () {
      return this.event?.tagIds;
    },

    // DATES

    startDateTime () {
      return this.event?.startDateTime
    },

    endDateTime () {
      return this.event?.endDateTime
    },


    format () {
      return this.event?.format;
    },

    addressId () {
      return this.event?.addressId;
    },

    themeId () {
      return this.event?.themeId;
    },

    languageId () {
      return this.event?.languageId;
    },

    currencyId () {
      return this.event?.currencyId;
    },

    timezoneId () {
      return this.event?.timezoneId;
    },
  },

  data: () => ({
    // show the help
    showHelp: true,

    updateTitleDialog: false,

    updateDescriptionDialog: false,

    updateTagIdsDialog: false,

    themeDialog: false,

    datesDialog: false,

    // tagIds
    valid: true,
    tagIdsLocal: [],
  }),
}
</script>

