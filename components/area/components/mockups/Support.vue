<template>
  <v-sheet>
    <v-toolbar elevation="0" class="pa-0 ma-0">
      <v-toolbar-title class="font-weight-medium">
        <v-icon left>mdi-lifebuoy</v-icon>
        {{ $t('Support') }}
      </v-toolbar-title>
    </v-toolbar>

    <v-container>
      <v-row>
        <v-col>
          <v-card-text class="pt-0">
            Have you got a question? Start a live chat with a Support agent.

            <v-spacer></v-spacer>
            <v-btn class="mt-4" text color="primary">
              <v-icon left>mdi-message-plus</v-icon>
              Live Chat
            </v-btn>
          </v-card-text>
        </v-col>
      </v-row>

      <v-row>
        <v-col>

          <v-list subheader>
            <v-subheader>
              <h4>Other ways to get in touch:</h4>
            </v-subheader>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ supportData.supportEmail }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('Email') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <a :href="supportData.supportFaqs.link">{{ supportData.supportFaqs.text }}</a>
                </v-list-item-title>
                <v-list-item-subtitle>{{ $t('FAQs') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <a :href="supportData.supportCommunity.link">{{ supportData.supportCommunity.text }}</a>
                </v-list-item-title>
                <v-list-item-subtitle>{{ $t('Community Help') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  name: "Support",
  computed: {
    eventId () {
      return this.$route.params.eventId || undefined;
    },

    qParameters(){
      return this.$route.query
    },

    isUniProDemo(){
      return this.qParameters['d'] && this.qParameters['d'] === 'uni'
    },

    supportData(){
      if (this.isUniProDemo) {
        return {
          supportEmail: 'info@uol.edu.pk',
          supportFaqs: {
            link: 'https://www.london.ac.uk/contact-us',
            text: 'london.ac.uk/faqs'
          },
          supportCommunity: {
            link: 'https://www.london.ac.uk/contact-us',
            text: 'london.ac.uk/community-support'
          }
        }
      }

      return {
        supportEmail: 'help@eventheads.com',
        supportFaqs: {
          link: 'https://eventheads.ivent-hq.com',
          text: 'eventheads.com/faqs'
        },
        supportCommunity: {
          link: 'https://eventheads.ivent-hq.com',
          text: 'eventheads.com/community-support'
        }
      }
    }
  },
  data(){
    return {
    }
  },
};
</script>
