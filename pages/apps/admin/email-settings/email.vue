<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>
          <v-icon left>mdi-email</v-icon>
          {{ $t('Email') }}
        </h2>
      </v-col>

      <v-col align="end">
        <v-btn width="100" color="primary">
          {{ $t('Save') }}
        </v-btn>
      </v-col>
    </v-row>

    <v-divider class="my-5"/>

    <v-row >
      <v-col cols="12" lg="6">

        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>
                <v-icon left>
                  mdi-email-newsletter
                </v-icon>
                {{ $t('Email_Template') }}
              </v-card-title>

              <v-card-subtitle>{{ $t('Email_Template_Subtitle') }}</v-card-subtitle>

              <v-divider></v-divider>

              <v-card-text>
                <v-form v-model="emailTemplateFormValid" ref="emailTemplateForm" lazy-validation>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="12" lg="12" align="end">
                        <v-btn text color="primary">
                          <v-icon left>
                            mdi-cog
                          </v-icon>
                          {{ defaultEmailSettingsLabel }}
                        </v-btn>
                      </v-col>

                      <v-col cols="12" lg="12">
                        <v-list-item-subtitle class="subtitle-1 font-weight-bold">
                          {{ fromAddressLabel }}
                        </v-list-item-subtitle>
                        <span>
                          {{ emailTemplate.fromAddress }}
                        </span>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12" lg="12">
                        <v-list-item-subtitle class="subtitle-1 font-weight-bold">
                          {{ fromNameLabel }}
                        </v-list-item-subtitle>
                        <span>
                          {{ emailTemplate.fromName }}
                        </span>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12" lg="12">
                        <v-text-field  v-model="emailTemplate.subject"
                                       :label="emailSubjectLabel"
                                       :hint="emailSubjectHint"
                                       persistent-hint
                                       required
                                       clearable
                        />
                      </v-col>
                    </v-row>


                    <v-row>
                      <v-col cols="12" lg="12">
                        <v-list-item-subtitle class="subtitle-1 font-weight-bold">
                          {{ audienceLabel }}
                        </v-list-item-subtitle>
                        <span>
                          {{ emailTemplate.audience }}
                        </span>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12" lg="12">

                        <v-list-item-subtitle class="subtitle-1 font-weight-bold">
                          {{ triggerLabel }}
                        </v-list-item-subtitle>
                        <span>
                          {{ emailTemplate.trigger }}
                        </span>

                      </v-col>
                    </v-row>

                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12">
            <v-card>
              <v-card-title>
                <v-icon left>
                  mdi-email-edit
                </v-icon>
                {{ $t('Change_Email_Body') }}
              </v-card-title>

              <v-card-subtitle>{{ $t('Change_Email_Body_Subtitle') }}</v-card-subtitle>

              <v-divider></v-divider>

              <v-card-text class="pa-0">
                <v-container>
                  <v-row>
                    <v-col>
                      <pro-text-editor
                        v-model="content"
                        placeholder="Write something…"
                        no-footer
                        :card-props="{ flat: true }"
                      >
                      </pro-text-editor>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

      </v-col>

      <v-col cols="12" lg="6">
        <v-card height="100%">
          <v-card-title>

            <v-row>
              <v-col cols="8">
                <v-icon left>
                  mdi-eye
                </v-icon>
                {{ $t('Live_Preview') }}
              </v-col>

              <v-col cols="4" align="end">
                <v-btn outlined>
                  <v-icon left>
                    mdi-email-fast
                  </v-icon>
                  {{ $t('Send_Test_Email') }}
                </v-btn>
              </v-col>
            </v-row>

          </v-card-title>
          <v-card-subtitle>
            {{ $t('Live_Preview_Subtitle') }}
          </v-card-subtitle>

          <v-divider></v-divider>

          <v-card-text style="height: calc(100% - 90px)" :style="{'background-color': emailTemplate.bodyBackgroundColor }">

            <v-container>
              <v-row>
                <v-col cols="12">

                  <v-img :src="emailTemplate.headerImg"></v-img>
                  <v-sheet light class="pa-4" min-height="400">
                    <div
                      v-html="content"
                    />

                    <template v-if="false">
                      <h1>HTML content Preview (payload)</h1>
                      <hr>

                      <div
                        v-text="content"
                      />
                    </template>
                  </v-sheet>

                  <v-sheet class="pa-4" :color="emailTemplate.footerBackgroundColor" v-html="emailTemplate.footerContent" />

                </v-col>
              </v-row>
            </v-container>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProTextEditor from "../../../../components/proTextEditor";
import {mapActions, mapGetters} from "vuex";
export default {
  name: 'Email',
  components: {ProTextEditor},
  data () {
    return {
      emailTemplateFormValid: true,
      emailTemplate: {
        fromAddress: 'hello@eventheads.ivent-pro.com',
        fromName: 'Ash at EventHeads',
        subject: 'Welcome to our community!',
        audience: 'New User Sign-up',
        trigger: 'When new user account is created in the Venue',

        bodyBackgroundColor: '#D4FCF6',
        // headerImg: require('platform/apps/venue/assets/eventheads-email-header.png'),

        footerBackgroundColor: '#78d5c9',
        footerContent: `
            <p style="text-align: center;">
  <a href="https://vuetifyjs.com/en/features/icon-fonts/#usage" target="__blank" rel="noopener noreferrer nofollow">Powered by Pro</a>
  <a href="https://vuetifyjs.com/en/features/icon-fonts/#usage" target="__blank" rel="noopener noreferrer nofollow">Terms &amp; Conditions</a>
</p>
        `
      },

      // content: "<p>Hi $<strong>{Webinar_</strong><em><strong>Presenter</strong></em><strong>_</strong><em><strong>Name},</strong></em></p><p>You're invited to be a co-presenter on our webinar ${<strong>Webinar_Title</strong>} is on ${<strong>Webinar</strong><em><strong>Date</strong>} at ${<strong>Webinar_Time_With_</strong></em><strong>Timezone</strong>}.</p><hr><blockquote><p><u><strong>Here's some important info:</strong></u></p></blockquote><p>Meet me in the webinar studio at the link below, 30 minutes before the webinar.<br><br>As a presenter, you can use your mic, camera and share your screen. You'll want a few minutes to test things out. We recommend using a <strong>Google Chrome</strong> or <strong>Firefox browser</strong>.<br><br>Access to the studio and the event itself is simple - no, really I mean it. Simply follow this magic link {Email Account Verification} and you will be able to set your profile in minutes - it really is magic! If you get stuck, just give me a nudge at <u>ash@eventheads.com</u>.<br><br>Make sure you close any bandwidth sucking applications running in the background like Dropbox, or Slack. Especially if you have used any other video conferencing apps like Zoom (as they tend to steal cameras and mics).<br><br>That's pretty much it. It should be a great webinar! Can't wait to see you there!<br><br>Till then,<br><br><strong>${Host_Name}</strong></p>"
      content: `
      <p>👋 Hi
        <span class="tag" data-tag-id="1">{{first_name}}</span>,
      </p>
      <p>This is Ash from EventHeads, welcome to our community!
      </p>
      <p>This is an email to confirm your account is now created, make sure to set it up first [link to account setup].
      </p>
      <p>EventHeads is a safe space for anyone who loves awesome events to connect, network and learn from each other.
      </p>
      <p>In this venue we host events: [link to events page]
      </p>
      <p>We also share amazing content in case you missed one of our events: [link to content hub]
      </p>
      <p>Have a browse around [link to venue], book yourself onto the next event [link to next event] and make sure to give me [link to user profile] a shout if you need any help!
      </p>
      <p>Thanks for joining!
      </p>
      <p>Ash, EventHeads
      </p>
      <p>Venue Owner &amp; Community Manager
      </p>
      `
    }
  },
  computed: { // data:image/jpeg;base64,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

    fromAddressLabel () {
      return this.$i18n.t('From_Address');
    },

    fromNameLabel () {
      return this.$i18n.t('From_Name');
    },

    emailSubjectLabel () {
      return this.$i18n.t('Email_Subject');
    },

    emailSubjectHint () {
      return this.$i18n.t('Email_Subject_Hint');
    },

    audienceLabel () {
      return this.$i18n.t('Audience_Label');
    },

    triggerLabel () {
      return this.$i18n.t('Trigger_Label');
    },

    defaultEmailSettingsLabel () {
      return this.$i18n.t('Change_default_email_settings');
    },
  },
  methods: {
    submit(){
      if (! this.$refs.venueForm.validate()) {
        this.venueFormValid = false;
        return;
      }

      this.venueFormValid = true;

      this.$emit('form-submitted')
    },
  }
}
</script>

<style lang="scss">
@import '../../../../node_modules/vuetify/src/components/VBtn/VBtn';

a[data-link-type="button"]{
  @extend .v-btn;
  @extend .v-size--default;
}
</style>
