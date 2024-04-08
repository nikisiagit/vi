<template>
  <v-card :rounded="showLabel ? 'lg': 'lg'" :flat="! showLabel">
    <v-card-title v-if="showLabel">
      Book a meeting
    </v-card-title>
    <v-card-text>
      <v-container fluid>

        <v-row justify="center">

          <v-col cols="12" align="center">
            <!-- Cal inline embed code begins -->
            <div class="rounded-lg" style="width:100%;height:100%;overflow:scroll" id="my-cal-inline"></div>
            <script type="text/javascript">
              (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
              Cal("init", {origin:"https://app.cal.com"});

              Cal("inline", {
                elementOrSelector:"#my-cal-inline",
                calLink: "nikita-ovcinnikovs-vz4wde/ivent-demo"
              });

              Cal("ui", {"styles":{"branding":{"brandColor":"#AAB6EB"}}});
            </script>
            <!-- Cal inline embed code ends -->
          </v-col>

        </v-row>
      </v-container>

    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Meetings",
  props: {
    // this should come from customization of component in the admin - should contain title - yes - no.
    showLabel: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    eventId () {
      return this.$route.params.eventId || undefined;
    },
  },
  data(){
    return {
    }
  },
};
</script>
