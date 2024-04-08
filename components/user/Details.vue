<!--
Profile User Details
-->
<template>
  <v-card rounded="0" >
<!--    <template slot="progress">-->
<!--      <v-progress-linear height="4" indeterminate />-->
<!--    </template>-->

    <v-toolbar elevation="0" class="pa-0 ma-0">
      <v-toolbar-title class="font-weight-medium">
        <v-icon left>mdi-account</v-icon>
        {{ $t('Profile') }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="closeSideTemporaryContent"><v-icon>mdi-close</v-icon></v-btn>

    </v-toolbar>

   <div>
     <div>
       <v-list  class="pa-0">

         <!-- avatar -->
         <v-list-item three-line>
           <v-list-item-avatar size="4rem" class="ma-0 mr-1">
             <base-avatar size="sm" statusIndicator :avatar="avatar"></base-avatar>
           </v-list-item-avatar>

           <v-list-item-content>
             <v-list-item-title class="text-h6">
               {{ fullname }}
             </v-list-item-title>
             <v-list-item-subtitle>{{ description }}</v-list-item-subtitle>
             <v-list-item-subtitle class="ml-n2">
               <v-btn icon plain small>
                 <v-icon small>mdi-linkedin</v-icon>
               </v-btn>
               <v-btn icon plain small>
                 <v-icon small>mdi-twitter</v-icon>
               </v-btn>
               <v-btn icon plain small>
                 <v-icon small>mdi-facebook</v-icon>
               </v-btn>
               <v-btn icon plain small>
                 <v-icon small>mdi-web</v-icon>
               </v-btn>
             </v-list-item-subtitle>

           </v-list-item-content>

           <v-list-item-action>
             <v-tooltip bottom nudge-bottom="10" open-on-focus open-delay="300"  transition="slide-y-transition">
               <template v-slot:activator="{ on, attrs }">
                 <v-btn v-bind="attrs"
                        v-on="on" icon >
                   <v-icon>mdi-account-plus-outline</v-icon>
                 </v-btn>
               </template>

               <span>Add to My People</span>
             </v-tooltip>

           </v-list-item-action>
         </v-list-item>
       </v-list>


       <v-container>
         <v-row>
           <v-col align="center">
             <v-tooltip bottom nudge-bottom="10" open-on-focus open-delay="300"  transition="slide-y-transition">
               <template v-slot:activator="{ on, attrs }">
                 <v-btn v-bind="attrs"
                        v-on="on" icon color="primary">
                   <v-icon>
                     mdi-message-outline
                   </v-icon>
                 </v-btn>
               </template>

               <span>Start a chat</span>
             </v-tooltip>


             <v-divider class="d-inline-block" style="padding: 0 1rem 0.3rem 0;"></v-divider>


             <v-tooltip bottom nudge-bottom="10" open-on-focus open-delay="300"  transition="slide-y-transition">
               <template v-slot:activator="{ on, attrs }">
                 <v-btn v-bind="attrs"
                        v-on="on" large icon color="primary">
                   <v-icon>
                     mdi-video-outline
                   </v-icon>
                 </v-btn>
               </template>

               <span>Invite to video call</span>
             </v-tooltip>

             <v-divider class="d-inline-block" style="padding: 0 1rem 0.3rem 0;"></v-divider>

             <v-tooltip bottom nudge-bottom="10" open-on-focus open-delay="300"  transition="slide-y-transition">
               <template v-slot:activator="{ on, attrs }">
                 <v-btn v-bind="attrs"
                        v-on="on" icon color="primary">
                   <v-icon>
                     mdi-calendar-outline
                   </v-icon>
                 </v-btn>
               </template>

               <span>Schedule a Meeting</span>
             </v-tooltip>

           </v-col>
         </v-row>
       </v-container>


     </div>


     <!-- headling and biography -->
     <!--    <v-list two-line subheader>-->
     <!--      <v-subheader >-->
     <!--        <h4>About me</h4>-->
     <!--        <v-divider inset></v-divider>-->
     <!--      </v-subheader>-->
     <!--      <v-list-item>-->
     <!--        <v-list-item-content>-->
     <!--          <v-list-item-title>-->
     <!--            🤘 Master of Puppets-->
     <!--          </v-list-item-title>-->
     <!--          <v-list-item-subtitle>{{ $t('Headline') }}</v-list-item-subtitle>-->
     <!--        </v-list-item-content>-->
     <!--      </v-list-item>-->

     <!--&lt;!&ndash;      <v-list-item>&ndash;&gt;-->
     <!--&lt;!&ndash;        <v-list-item-content>&ndash;&gt;-->
     <!--&lt;!&ndash;          <v-list-item-title class="text-pre-line">&ndash;&gt;-->
     <!--&lt;!&ndash;            Leading specialist in virtual events, CEO at Ivent.&ndash;&gt;-->

     <!--&lt;!&ndash;            University lecturer in online events and listener of Iron Maiden.&ndash;&gt;-->
     <!--&lt;!&ndash;          </v-list-item-title>&ndash;&gt;-->
     <!--&lt;!&ndash;          <v-list-item-subtitle>{{ $t('Bio') }}</v-list-item-subtitle>&ndash;&gt;-->
     <!--&lt;!&ndash;        </v-list-item-content>&ndash;&gt;-->
     <!--&lt;!&ndash;      </v-list-item>&ndash;&gt;-->

     <!--    </v-list>-->


     <v-container>
       <v-row >
         <v-col >
           <v-list outlined subheader class="py-1 rounded-lg">
             <v-subheader class="mt-1">
               <h4>User info</h4>
               <!--              <v-divider inset></v-divider>-->
             </v-subheader>

             <!--        &lt;!&ndash; email &ndash;&gt;-->
             <!--        <v-list-item>-->
             <!--          <v-list-item-content>-->
             <!--            <v-list-item-title>{{ email }}</v-list-item-title>-->
             <!--            <v-list-item-subtitle>{{ $t('Email') }}</v-list-item-subtitle>-->
             <!--          </v-list-item-content>-->
             <!--        </v-list-item>-->

             <!--      &lt;!&ndash; fullname &ndash;&gt;-->
             <!--      <v-list-item>-->
             <!--        <v-list-item-content>-->
             <!--          <v-list-item-title>{{ fullname }}</v-list-item-title>-->
             <!--          <v-list-item-subtitle>{{ $t('fullname') }}</v-list-item-subtitle>-->
             <!--        </v-list-item-content>-->
             <!--      </v-list-item>-->


             <v-list-item>
               <v-list-item-content>
                 <v-list-item-title>{{ 'King Cabbage 🍋' }}</v-list-item-title>
                 <v-list-item-subtitle>{{ $t('Headline') }}</v-list-item-subtitle>
               </v-list-item-content>
             </v-list-item>


             <v-list-item>
               <v-list-item-content>
                 <v-list-item-title>{{ 'Love products. Love tech. Love people.' }}</v-list-item-title>
                 <v-list-item-subtitle>{{ $t('About') }}</v-list-item-subtitle>
               </v-list-item-content>
             </v-list-item>

             <v-list-item>
               <v-list-item-content>
                 <v-list-item-title>{{ 'iVent' }}</v-list-item-title>
                 <v-list-item-subtitle>{{ $t('Company') }}</v-list-item-subtitle>
               </v-list-item-content>
             </v-list-item>


             <!--      <v-list-item>-->
             <!--        <v-list-item-content>-->
             <!--          <v-list-item-title>{{ timeFormat }}</v-list-item-title>-->
             <!--          <v-list-item-subtitle>{{ $t('me-time-format') }}</v-list-item-subtitle>-->
             <!--        </v-list-item-content>-->
             <!--      </v-list-item>-->

             <!-- themeMode -->


             <!--      <v-list-item>-->
             <!--        <v-list-item-content>-->
             <!--          <v-list-item-title>{{ themeMode }}</v-list-item-title>-->
             <!--          <v-list-item-subtitle>{{ $t('me-theme-mode') }}</v-list-item-subtitle>-->
             <!--        </v-list-item-content>-->
             <!--      </v-list-item>-->

           </v-list>

         </v-col>
       </v-row>

     </v-container>
   </div>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UserDetails",

  // async created () {
  //   if (! this.loaded && ! this.loading) {
  //     await this.load();
  //   }
  // },

  data: () => ({

  }),

  methods: {
    ...mapActions({
      closeSideTemporaryContent: 'app/closeSideTemporaryContent',
    }),
  },
  computed: {
    ...mapGetters({
      sideTemporaryUserData: 'app/sideTemporaryUserData'
    }),

    avatar () {
      // return (this.me) ? this.me.avatar : undefined;
      return this.sideTemporaryUserData?.avatar
    },

    description () {
      // return (this.me) ? this.me.email : undefined;
      return this.sideTemporaryUserData?.description
    },

    fullname () {
      // return (this.me) ? this.me.fullname : undefined;
      return this.sideTemporaryUserData?.fullname
    },

  },
}
</script>
