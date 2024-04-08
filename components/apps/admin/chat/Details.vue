<template>
  <v-card>
    <v-toolbar flat>
      <v-icon left>mdi-pound</v-icon>
      <v-toolbar-title>{{ chatId }}</v-toolbar-title>
    </v-toolbar>

    <v-container fluid>
      <v-row>
        <v-col>
          <v-list>
            <v-subheader>preview/summary</v-subheader>

            <!-- a list item -->
<!--            <venue-chat-list-item :chat-id="chatId" />-->
<!--            <component-chat-list-item />-->
            <v-list-item>
              <v-list-item-avatar>
                <v-avatar color="primary">
                  <v-icon>mdi-pound</v-icon>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
<!--                <pre>{{ chat }}</pre>-->
<!--                <v-list-item-title>{{ text }}</v-list-item-title>-->
<!--                <v-list-item-title>{{ text }}</v-list-item-title>-->
<!--                <v-list-item-subtitle>{{ description }}</v-list-item-subtitle>-->
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-row>
        <v-col cols="12" md="6">
          <v-list>
            <!-- SETTINGS -->
            <v-subheader>{{ $t('settings') }}</v-subheader>

            <template v-if="titleId">
              <v-dialog v-model="updateTitleDialog"
                        overlay-color="accent"
                        max-width="800px">
                <template v-slot:activator="{on, attrs}">
                  <apps-admin-label-list-item :label-id="titleId" v-bind="attrs" v-on="on"/>
                </template>
                <apps-admin-label-update-label :label-id="titleId" @close="updateTitleDialog = false;" />
              </v-dialog>
            </template>
            <!-- title -->
            <v-list-item ripple v-if="false">
              <v-list-item-avatar>
                <v-avatar>
                  <v-icon>mdi-format-title</v-icon>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ $t('title') }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('title') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <!-- description id -->
            <template v-if="descriptionId">
              <v-dialog v-model="updateDescriptionDialog"
                        overlay-color="accent"
                        max-width="800px">
                <template v-slot:activator="{on, attrs}">
                  <apps-admin-label-list-item :label-id="descriptionId" v-bind="attrs" v-on="on"/>
                </template>
                <apps-admin-label-update-label :label-id="descriptionId" @close="updateDescriptionDialog = false;" />
              </v-dialog>
            </template>
            <!-- description -->
            <v-list-item ripple v-if="false">
              <v-list-item-avatar>
                <v-avatar>
                  <v-icon>mdi-format-text</v-icon>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ $t('description') }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('description') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>


            <!-- tags -->
            <v-subheader>{{ $t('tagging') }}</v-subheader>
            <template>
              <v-dialog v-model="updateTagIdsDialog"
                        overlay-color="accent"
                        max-width="800px">
                <template v-slot:activator="{on, attrs}">
                  <v-list-item v-bind="attrs" v-on="on">
                    <v-list-item-avatar>
                      <v-icon>mdi-tag-multiple</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{ tagIds }}</v-list-item-title>
                      <v-list-item-subtitle>{{ $t('event-tag-ids') }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
                <apps-admin-chat-update-tag-ids :chat-id="chatId" @close="updateTagIdsDialog = false"/>
              </v-dialog>
            </template>

            <!-- tagIds -->
            <v-subheader v-if="false">tagging</v-subheader>
            <v-list-item ripple v-if="false">
              <v-list-item-avatar>
                <v-avatar>
                  <v-icon>mdi-tag-multiple</v-icon>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ $t('tag-ids') }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('tag-ids') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <!-- theming/branding - look and feel -->
            <v-subheader>{{ $t('theme') }}</v-subheader>
            <v-dialog v-model="themeDialog" overlay-color="accent">
              <template v-slot:activator="{on, attrs}">
                <v-list-item v-bind="attrs" v-on="on" ripple exact>
                  <v-list-item-avatar>
                    <v-icon>mdi-palette</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ $t('label:region:app:admin:chat-theme-title') }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ $t('label:region:app:admin:chat-theme-subtitle') }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <apps-admin-event-update-theme @close="themeDialog = false" />
            </v-dialog>
          </v-list>
        </v-col>

        <v-col cols="12" md="6">
          <v-list>
            <!-- BORING ADMIN STUFF -->
            <v-subheader>{{ $t('advanced') }}</v-subheader>
            <!-- boring admin stuff -->
            <!-- name -->
            <v-list-item>
              <v-list-item-avatar>
                <v-icon>mdi-link</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ name }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('name') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <!-- audit -->
            <!-- createdBy -->
<!--            <apps-admin-profile-nav-list-item :profile-id="createdBy" />-->

            <v-list-item>

              <v-list-item-avatar>
<!--                <apps-admin-profile-avatar :profile-id="createdBy" />-->
                <v-avatar>
                  <v-icon>mdi-account</v-icon>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ createdBy }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('event-created-by') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <!-- created at -->
            <v-list-item>
              <v-list-item-avatar>
                <v-icon>mdi-clock</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ createdAt }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('event-created-at') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <!-- last modified at -->
            <v-list-item>
              <v-list-item-avatar>
                <v-icon>mdi-clock</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ lastModifiedAt }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('event-last-modified-at') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>


            <!-- deleting state -->
            <v-list-item>
              <v-list-item-avatar>
                <v-icon>mdi-account</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ deletedBy }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('event-deleted-by') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-avatar>
                <v-icon>mdi-clock</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ deletingAt }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('event-deleting-at') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <!-- @todo add the delete button here -->

          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Details",

  props: {
    chatId: {
      type: String,
      required: true,
    },
  },

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    chatId: {
      handler () {
        if (! this.loaded && ! this.loading) {
          this.load();
        }
      },
    },
  },

  methods: {
    ...mapActions({
      loadChatWithChatId: 'apps/admin/chats/loadChatWithChatId',
    }),


    async load () {
      return await (this.chatId) ? this.loadChatWithChatId(this.chatId) : undefined;
    }
  },

  computed: {
    ...mapGetters({
      chatWithChatId: 'apps/admin/chats/chatWithChatId',
    }),

    chat () {
      return (this.chatId) ? this.chatWithChatId(this.chatId) : undefined;
    },

    name () {
      return (this.chat) ? this.chat.name : undefined;
    },

    titleId () {
      return (this.chat) ? this.chat.titleId : undefined;
    },

    descriptionId () {
      return (this.chat) ? this.chat.descriptionId : undefined;
    },

    tagIds () {
      return (this.chat) ? this.chat.tagIds : [];
    },

    createdBy () {
      return (this.chat) ? this.chat.createdBy : undefined;
    },

    createdAt () {
      return (this.chat) ? this.chat.createdAt : undefined;
    },

    lastModifiedAt () {
      return (this.chat) ? this.chat.lastModifiedAt : undefined;
    },
  }

}
</script>
