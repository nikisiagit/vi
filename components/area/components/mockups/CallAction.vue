<template>
  <v-card light :rounded="showLabel ? 'lg': 'lg'" :flat="! showLabel">
    <v-card-title v-if="showLabel">
      Get a demo
    </v-card-title>
    <v-card-text>
      <v-container fluid>

        <v-row justify="center">

          <v-col cols="12" align="center">
            <iframe v-if="exhibitorId === 'exhibitor:noonah'" src="https://noonah.com/book-a-demo/" width="100%" height="400px" frameborder="0"></iframe>
            <div v-if="exhibitorId === 'exhibitor:ivent'" id="hubspotForm"></div>
          </v-col>

        </v-row>
      </v-container>

    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CallAction",
  props: {
    // this should come from customization of component in the admin - should contain title - yes - no.
    showLabel: {
      type: Boolean,
      default: true
    }
  },
  created() {
    const script = document.createElement('script');
    script.src='https://js.hsforms.net/forms/v2.js';
    document.body.appendChild(script);

    script.addEventListener('load', () => {
      // @TS-ignore
      if (window.hbspt) {
        // @TS-ignore
        window.hbspt.forms.create({
          region: "na1",
          portalId: "1919950",
          formId: "ae72a9ac-9c41-4eb3-9fbb-8d5967116e6e",
          target: '#hubspotForm'
        })
      }
    });
  },
  computed: {
    eventId () {
      return this.$route.params.eventId || undefined;
    },

    exhibitorId () {
      return this.$route.params.exhibitorId || undefined;
    },
  },
  data(){
    return {
    }
  },
};
</script>
