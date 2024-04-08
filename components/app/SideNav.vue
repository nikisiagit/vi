<template>
  <div>
    <!-- (static mini drawer) - main navbar. (chats/notifications)  -->
    <v-navigation-drawer
      :mini-variant="mini"
      mini-variant-width="64"
      app
    >

      <div class="d-flex flex-column fill-height" >

        <v-list class="py-0" two-line>

          <v-list-item link :to="{name: 'index'}" exact>
            <v-list-item-icon class="my-auto ">
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('home') }}</v-list-item-title>
              <v-list-item-subtitle>{{ $t('home-subtitle') }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            link
            @click="toggleContextDrawer('search')"
            :class="contextType === 'search' ? listItemActive: null"
          >
            <v-list-item-icon class="my-auto">
              <v-icon>mdi-magnify</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('search') }}</v-list-item-title>
              <v-list-item-subtitle>{{ $t('search-search') }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>


        <div class="mt-auto">
          <v-list two-line>
            <v-list-item
              link
              @click="toggleContextDrawer('admin')"
              :class="contextType === 'admin' ? listItemActive: null"
            >
              <v-list-item-icon class="my-auto ">
                <v-icon>mdi-shield-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('admin') }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('admin') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-list class="py-0" two-line>
            <v-list-item
              link
              exact
              @click="toggleContextDrawer('calendar')"
              :class="contextType === 'calendar' ? listItemActive: null"
            >
              <v-list-item-icon class="my-auto ">
                <v-icon>mdi-calendar</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('calendar') }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('calendar') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>


            <v-list-item link exact>
              <v-list-item-icon class="my-auto ">
                <v-icon>mdi-lifebuoy</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('support') }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('support') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link exact>
              <v-list-item-icon class="my-auto ">
                <v-icon>mdi-forum</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('chat') }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('chat') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link :to="{name: 'me'}" exact>
              <v-list-item-icon class="my-auto ">
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('me') }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('me-subtitle') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item exact>
              <v-list-item-icon class="my-auto ">
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('logout') }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('logout') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item exact v-if="false">
              <v-list-item-icon class="my-auto ">
                <v-icon>mdi-login</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('login') }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('login') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item exact @click="toggleMini">
              <v-fade-transition mode="out-in">

                <v-list-item-icon v-if="! mini" key="mini" class="my-auto ">
                  <v-icon>mdi-chevron-left</v-icon>
                </v-list-item-icon>

                <v-list-item-icon v-else key="notMini" class="my-auto ">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-fade-transition>

              <v-list-item-content>
                <v-list-item-title>{{ $t('close')}}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('close')}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

          </v-list>
        </div>

      </div>


    </v-navigation-drawer>
    <!-- / (static mini drawer) - main navbar. (chats/notifications) -->

    <v-navigation-drawer
      v-if="! $vuetify.breakpoint.mobile"
      v-model="contextDrawer"
      class="ml-15"
      app
      clipped
      color="transparent"

      :temporary="! mini"
      :hide-overlay="false"
      width="400"
    >

      <v-slide-x-reverse-transition>
        <v-card height="100%" tile flat v-if=" contextType === 'search'">
          <v-toolbar flat>
            <v-toolbar-title>search</v-toolbar-title>
            <v-spacer />
            <v-icon @click="closeContextDrawer" right>mdi-arrow-left</v-icon>
          </v-toolbar>

          <v-card-text>
            content search goes here...
          </v-card-text>
        </v-card>
      </v-slide-x-reverse-transition>


      <v-slide-x-reverse-transition>
        <v-card height="100%" tile flat v-if="contextType === 'admin'">
          <v-toolbar flat>
            <v-toolbar-title>admin</v-toolbar-title>
            <v-spacer />
            <v-icon @click="closeContextDrawer" right>mdi-arrow-left</v-icon>
          </v-toolbar>

          <v-card-text class="pa-0">
            <apps-admin-nav-list></apps-admin-nav-list>
          </v-card-text>
        </v-card>

      </v-slide-x-reverse-transition>

      <v-slide-x-reverse-transition>
        <v-card height="100%" tile flat v-if="contextType === 'calendar'">
          <v-toolbar flat>
            <v-toolbar-title>calendar</v-toolbar-title>
            <v-spacer />
            <v-icon @click="closeContextDrawer" right>mdi-arrow-left</v-icon>
          </v-toolbar>

          <v-card-text class="pa-0">

          </v-card-text>
        </v-card>

      </v-slide-x-reverse-transition>

    </v-navigation-drawer>
  </div>

<!--  <div v-if="false">-->
<!--    &lt;!&ndash; app navbar: - home, content, community  &ndash;&gt;-->
<!--    <v-list>-->
<!--      <v-list-item  @click="toggleMenu">-->
<!--        <v-list-item-action>-->
<!--          <v-icon> mdi-menu</v-icon>-->
<!--        </v-list-item-action>-->

<!--        <v-list-item-content>-->
<!--          <v-list-item-title>-->
<!--            {{ $t('close') }}-->
<!--          </v-list-item-title>-->
<!--        </v-list-item-content>-->
<!--      </v-list-item>-->

<!--      <v-divider></v-divider>-->

<!--      <v-list-item active-class="primary&#45;&#45;text" exact :to="{ name: 'index' }">-->
<!--        <v-list-item-action>-->
<!--          <v-icon>mdi-home</v-icon>-->
<!--        </v-list-item-action>-->

<!--        <v-list-item-content>-->
<!--          <v-list-item-title>-->
<!--            {{ $t('home') }}-->
<!--          </v-list-item-title>-->
<!--        </v-list-item-content>-->
<!--      </v-list-item>-->

<!--      &lt;!&ndash;              <v-list-item @click="">&ndash;&gt;-->
<!--      &lt;!&ndash;                <v-list-item-action>&ndash;&gt;-->
<!--      &lt;!&ndash;                  <v-icon>mdi-magnify</v-icon>&ndash;&gt;-->
<!--      &lt;!&ndash;                </v-list-item-action>&ndash;&gt;-->

<!--      &lt;!&ndash;                <v-list-item-content>&ndash;&gt;-->
<!--      &lt;!&ndash;                  <v-list-item-title>&ndash;&gt;-->
<!--      &lt;!&ndash;                    {{ $t('search') }}&ndash;&gt;-->
<!--      &lt;!&ndash;                  </v-list-item-title>&ndash;&gt;-->
<!--      &lt;!&ndash;                </v-list-item-content>&ndash;&gt;-->
<!--      &lt;!&ndash;              </v-list-item>&ndash;&gt;-->
<!--    </v-list>-->
<!--    &lt;!&ndash; /app navbar: home, content, community  &ndash;&gt;-->


<!--    &lt;!&ndash; apps available to the user &ndash;&gt;-->
<!--    <v-list >-->
<!--      &lt;!&ndash;                  <v-subheader class="justify-center">&ndash;&gt;-->
<!--      &lt;!&ndash;                    {{ $t('apps').toUpperCase() }}&ndash;&gt;-->
<!--      &lt;!&ndash;                  </v-subheader>&ndash;&gt;-->

<!--      <v-list-item active-class="primary&#45;&#45;text" nuxt :to="{name: 'apps-admin' }">-->
<!--        <v-list-item-action>-->
<!--          <v-icon>-->
<!--            mdi-shield-account-->
<!--          </v-icon>-->
<!--        </v-list-item-action>-->
<!--        <v-list-item-content>-->
<!--          <v-list-item-title>-->
<!--            {{ $t('admin') }}-->
<!--          </v-list-item-title>-->
<!--        </v-list-item-content>-->
<!--      </v-list-item>-->

<!--      &lt;!&ndash;                  <v-list-item @click="">&ndash;&gt;-->
<!--      &lt;!&ndash;                    <v-list-item-action>&ndash;&gt;-->
<!--      &lt;!&ndash;                      <v-icon>&ndash;&gt;-->
<!--      &lt;!&ndash;                        mdi-calendar-account&ndash;&gt;-->
<!--      &lt;!&ndash;                      </v-icon>&ndash;&gt;-->
<!--      &lt;!&ndash;                    </v-list-item-action>&ndash;&gt;-->
<!--      &lt;!&ndash;                    <v-list-item-content>&ndash;&gt;-->
<!--      &lt;!&ndash;                      <v-list-item-title>&ndash;&gt;-->
<!--      &lt;!&ndash;                        {{ $t('organisers') }}&ndash;&gt;-->
<!--      &lt;!&ndash;                      </v-list-item-title>&ndash;&gt;-->
<!--      &lt;!&ndash;                    </v-list-item-content>&ndash;&gt;-->
<!--      &lt;!&ndash;                  </v-list-item>&ndash;&gt;-->
<!--    </v-list>-->
<!--    &lt;!&ndash; /apps available to the user &ndash;&gt;-->

<!--    <v-divider></v-divider>-->

<!--    &lt;!&ndash; navbar: secondary - chats, notifications &ndash;&gt;-->
<!--    <v-list>-->
<!--      <v-list-item link>-->
<!--        <v-list-item-action>-->
<!--          <v-icon>-->
<!--            mdi-forum-->
<!--          </v-icon>-->
<!--        </v-list-item-action>-->

<!--        <v-list-item-content>-->
<!--          <v-list-item-title>-->
<!--            {{ $t('chats') }}-->
<!--          </v-list-item-title>-->
<!--        </v-list-item-content>-->
<!--      </v-list-item>-->

<!--      <v-list-item link>-->
<!--        <v-list-item-action>-->
<!--          <v-icon>-->
<!--            mdi-bell-->
<!--          </v-icon>-->
<!--        </v-list-item-action>-->

<!--        <v-list-item-content>-->
<!--          <v-list-item-title>-->
<!--            {{ $t('notifications') }}-->
<!--          </v-list-item-title>-->
<!--        </v-list-item-content>-->
<!--      </v-list-item>-->
<!--    </v-list>-->
<!--    &lt;!&ndash; /navbar: secondary - chats, notifications &ndash;&gt;-->

<!--    &lt;!&ndash; navbar: profile, logout &ndash;&gt;-->
<!--    <v-list>-->
<!--      <v-list-item nuxt :to="{ name: 'me' }">-->
<!--        &lt;!&ndash;                <base-avatar&ndash;&gt;-->
<!--        &lt;!&ndash;                  size="xs"&ndash;&gt;-->
<!--        &lt;!&ndash;                  avatar="https://randomuser.me/api/portraits/women/75.jpg"&ndash;&gt;-->
<!--        &lt;!&ndash;                  :label="'Mary Johnson'"&ndash;&gt;-->
<!--        &lt;!&ndash;                  :status-indicator="true"&ndash;&gt;-->
<!--        &lt;!&ndash;                  status-indicator-color="green"&ndash;&gt;-->
<!--        &lt;!&ndash;                />&ndash;&gt;-->

<!--        <me-avatar></me-avatar>-->

<!--      </v-list-item>-->

<!--      &lt;!&ndash; logout &ndash;&gt;-->
<!--      <v-divider></v-divider>-->
<!--      <v-list-item @click="logout">-->
<!--        <v-list-item-action>-->
<!--          <v-icon>-->
<!--            mdi-logout-->
<!--          </v-icon>-->
<!--        </v-list-item-action>-->
<!--        <v-list-item-content>-->
<!--          <v-list-item-title>-->
<!--            {{ $t('logout') }}-->
<!--          </v-list-item-title>-->
<!--        </v-list-item-content>-->
<!--      </v-list-item>-->
<!--    </v-list>-->
<!--    &lt;!&ndash; /navbar: profile, logout &ndash;&gt;-->
<!--  </div>-->
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'SideNav',
  props: {},
  data () {
    return {
      contextDrawer: false,
      contextType: null,

      mini: true,
    }
  },
  computed: {
    listItemActive(){
      return 'v-list-item--active primary--text'
    }
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    }),

    closeContextDrawer(){
      this.contextDrawer = false
      this.contextType = ''
    },

    toggleContextDrawer(contextType){
      if (! this.contextDrawer || contextType === this.contextType) {
        this.contextDrawer = ! this.contextDrawer
      }

      // clean context when switching
      if (contextType === this.contextType) {
        this.contextType = ''
      } else {
        this.contextType = contextType
      }
    },

    toggleMini(){
      this.mini = ! this.mini
    }
  }
}
</script>
