<template>
  <v-container>
    <v-row>
      <v-col>
        <v-system-bar>
          <small>{{ $t('preview') }}</small>
          <v-spacer></v-spacer>

          <v-icon size=".8rem">mdi-square</v-icon>

          <v-icon size=".8rem">mdi-circle</v-icon>

          <v-icon size=".8rem">mdi-triangle</v-icon>
        </v-system-bar>
        <v-card elevation="14" width="400" style="zoom: 0.5" :dark="isDark" :light="isLight">
          <v-card-text>

            <v-app-bar :style="{ background: appBarColor }">
              <v-app-bar-nav-icon disabled></v-app-bar-nav-icon>

              <v-toolbar-title>Title</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-responsive max-width="126">
                <v-text-field
                  dense
                  flat
                  hide-details
                  disabled
                  solo-inverted
                  append-icon="mdi-magnify"
                ></v-text-field>
              </v-responsive>

              <v-spacer></v-spacer>


              <v-avatar
                v-for="n in 2"
                :key="n"
                :class="{'mr-3': n !== 3 }"
                color="grey lighten-1"
                size="28"
              ></v-avatar>
            </v-app-bar>

<!--            <v-navigation-drawer width="25%" >-->
<!--              &lt;!&ndash;  &ndash;&gt;-->
<!--              <v-list>-->
<!--                <v-list-item-->
<!--                  v-for="n in 5"-->
<!--                  :key="n"-->
<!--                  link-->
<!--                >-->
<!--                  <v-list-item-content>-->
<!--                    <v-list-item-title>Item {{ n }}</v-list-item-title>-->
<!--                  </v-list-item-content>-->
<!--                </v-list-item>-->
<!--              </v-list>-->
<!--            </v-navigation-drawer>-->

            <v-container>

              <v-row>
                <v-col>
                  <v-skeleton-loader
                    boilerplate
                    type="image"
                    height="100"
                  ></v-skeleton-loader>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-skeleton-loader
                    boilerplate
                    type="image"
                    height="30"
                  ></v-skeleton-loader>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-skeleton-loader
                    boilerplate
                    type="divider, list-item-three-line, divider, list-item-three-line"
                  ></v-skeleton-loader>
                </v-col>
              </v-row>

            </v-container>

            <v-footer padless >
              <v-col class="text-center" cols="12">
                {{ $t('footer') }}
              </v-col>
            </v-footer>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    appBarColor: {
      type: String,
    },
    isDark: {
      type: Boolean,
    },
    isLight: {
      type: Boolean,
    }
  }
}
</script>
