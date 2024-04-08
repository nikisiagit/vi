 <template>
<!--  <v-card width="100%" flat rounded="lg">-->
  <v-card>
    <v-card-text>

<!--      <v-row no-gutters>-->
<!--        <v-col>-->
<!--          <v-text-field-->
<!--            v-model.lazy.trim="search"-->
<!--            clearable-->
<!--            dense-->
<!--            outlined-->
<!--            hide-details-->
<!--            append-icon="mdi-magnify"-->
<!--            :label="$t('Search')"-->
<!--          ></v-text-field>-->
<!--        </v-col>-->
<!--      </v-row>-->

      <v-row no-gutters>
        <v-col>
          <v-list dense>
            <v-list-item v-if="person.fullname !== 'Gavin Newman'" v-for="(person, pIndex) in list" :key="pIndex">
              <v-list-item-icon tile>
                <base-profile-preview
                  :userId="person.userId"
                  :fullname="person.fullname"
                  :headline="person.headline"
                  :avatar="person.avatar" />
<!--                <v-img-->
<!--                  class="rounded-lg"-->
<!--                  :src="person.avatar"-->
<!--                ></v-img>-->
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ person.fullname }}</v-list-item-title>
                <v-list-item-subtitle>{{ person.headline }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action v-if="person.addConnection && !contactAdded">
                <v-btn icon>
                  <v-icon v-if="! contactAdded">mdi-account-plus-outline</v-icon>
                  <v-icon v-else>mdi-account-minus</v-icon>
                </v-btn>
              </v-list-item-action>

              <v-list-item-action v-if="person.addConnection && contactAdded">
                <v-btn icon v-if="contactAdded">
                  <v-icon >mdi-message</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "PeopleList",
  props: {
    noFilters: {
      type: Boolean,
      default: true
    },
    contactAdded: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      search: '',
      list: [
        {
          userId:"1",
          fullname: 'Marvin McKinney',
          headline: 'Product Manager at Google',
          avatar: 'https://cdn.hubilo.com/speaker/2116606/150/1549_8254_024241001636454559.png',
          addConnection: true,
        },
        {
          userId: "2",
          fullname: 'Jenny Wilson',
          headline: 'UX Designer at Glassdoor',
          avatar: 'https://silicon.createx.studio/assets/img/team/26.jpg',
          addConnection: true,
        },
        {
          userId: "3",
          fullname: 'Jerome Bell',
          headline: 'Strategic Advisor at Shopify',
          avatar: 'https://cdn.hubilo.com/speaker/2116606/150/1207_7616_896656001637156224.png',
          addConnection: true,
        },
        {
          userId: "4",
          fullname: 'Ralph Edwards',
          headline: 'Founder & CEO at Strapi',
          avatar: 'https://silicon.createx.studio/assets/img/team/24.jpg',
          addConnection: true,
        },
        {
          userId: "5",
          fullname: 'Gavin Newman',
          headline: 'CEO and Co-founder at iVent',
          avatar: 'https://ivent-hq.com/wp-content/uploads/2021/07/Gav-Selfie-ForWeb-1.png',
          addConnection: false,
        },
        {
          userId: "6",
          fullname: 'Albert McKinney',
          headline: 'Principal Consultant at Stretto Inc.',
          avatar: 'https://silicon.createx.studio/assets/img/team/25.jpg',
          addConnection: true,
        },
      ],
    }
  },
  computed: {

    eventId () {
      return this.$route.params.eventId || undefined;
    },
  },

};
</script>
