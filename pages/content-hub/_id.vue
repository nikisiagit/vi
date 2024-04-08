<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-breadcrumbs divider="/"
                       class="pl-0"
                       :items="[
                         {
                           text: 'Content Hub',
                           disabled: false,
                           exact: true,
                           to: {name: 'content-hub'},
                           icon: 'mdi-arrow-left-circle'
                         },
                         // {
                         //   text: 'Some_Text',
                         //   disabled: true,
                         //   exact: true,
                         // }
                        ]" >
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item :to="item.to" :exact="item.exact" :disabled="item.disabled">
              <v-icon size="1.2rem" left v-show="item.icon"> {{ item.icon }} </v-icon>
              <h3>{{ item.text }}</h3>
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </v-col>
    </v-row>

    <v-row no-gutters>

      <!-- Video Content Type -->
      <template v-if="content.type === 'video'">
        <v-col cols="12">

          <iframe width="100%"
                  height="600px"
                  src="https://www.youtube.com/embed/MMN1fEVkjJc"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen>
          </iframe>

        </v-col>

        <v-col cols="12">
          <v-card flat>
            <v-card-text class="text-center">
              <v-btn icon large>
                <h1>
                  😍
                </h1>
              </v-btn>

              <v-btn icon large>
                <h1>
                  😆
                </h1>
              </v-btn>

              <v-btn icon large>
                <h1>
                  😲
                </h1>
              </v-btn>

              <v-btn icon large>
                <h1>
                  😡
                </h1>
              </v-btn>

              <v-btn icon large>
                <h1>
                  👍
                </h1>
              </v-btn>

              <v-btn icon>
                <v-icon>
                  mdi-plus
                </v-icon>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </template>
      <!--/End Video Content Type -->

      <!-- File Content Type -->
      <template v-if="content.type === 'file'">
        <v-col cols="12">

          <v-card color="transparent">
            <v-card-text class="pa-0">
              <v-img
                src="https://picsum.photos/1920/1080?random"
                gradient="to right, #77777754, #454545b3"
                :height="$vuetify.breakpoint.mdAndUp ? '320': null"
                aspect-ratio="1.7"
                class="rounded-lg"
              >
                <v-container class="white--text">
                  <v-row no-gutters>
                    <v-col cols="12" lg="6">
                      <v-img
                        src="https://picsum.photos/1920/1080?random"
                        class="elevation-4 ma-auto"
                        width="90%"
                      />
                    </v-col>

                    <v-col cols="12" lg="6">

                      <v-list color="transparent" class="glass-effect">
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>
                              {{ $t('File_Format') }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                              {{ 'pdf' }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>
                              {{ $t('File_Size') }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                              {{ 4355 + 'kb' }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>
                              {{ $t('File_Name') }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                              {{ 'night_clubs-and-venues' }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>

                      <v-container class="hidden-md-and-down">
                        <v-btn color="primary" fab small>
                          <v-icon>
                            mdi-download
                          </v-icon>
                        </v-btn>
                      </v-container>

                    </v-col>

                  </v-row>

                </v-container>

              </v-img>

              <div class="hidden-md-and-up">
                <v-btn
                  color="primary"
                  fab
                  dark
                  small
                  absolute
                  bottom
                  right
                >
                  <v-icon>mdi-download</v-icon>
                </v-btn>
              </div>
            </v-card-text>
          </v-card>

        </v-col>

      </template>
      <!--/ End File Content Type -->

    </v-row>

    <v-row>
      <v-col cols="12" lg="12">

        <v-list color="transparent">
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                Gavin Newman
              </v-list-item-title>
              <v-list-item-subtitle>
                24 April 2022
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-row
                align="center"
                justify="end"
              >
                <v-col>
                  <!-- plus -->
                  <v-btn icon small outlined class="mr-1">
                    <v-icon small>mdi-plus</v-icon>
                  </v-btn>

                  <!-- thumbs up -->
                  <v-btn icon small outlined class="mr-1">
                    <v-icon small>mdi-thumb-up</v-icon>
                  </v-btn>

                  <!-- share -->
                  <v-btn icon small outlined>
                    <v-icon small>mdi-share</v-icon>
                  </v-btn>

                </v-col>

              </v-row>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-row>
          <v-col>
            <v-card-title>
              {{ $t('Event_Burnouts') }}
            </v-card-title>

            <v-card-text>
              <p class="text--primary">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </v-card-text>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card-text>
              <p class="text-body-1 font-weight-medium">
                consumption time: 20 minutes
              </p>


              <v-chip
                class="mr-2"
                color="secondary darken-4"
              >
                {{ $t('wellbeing') }}
              </v-chip>

              <v-chip
                class="mr-2"
                color="secondary darken-4"
              >
                {{ $t('lifestyle') }}
              </v-chip>

              <v-chip
                class="mr-2"
                color="secondary darken-4"
              >
                {{ $t('HR') }}
              </v-chip>

              <v-chip
                class="mr-2"
                color="secondary darken-4"
              >
                {{ $t('pyromaniacs') }}
              </v-chip>

            </v-card-text>

          </v-col>
        </v-row>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ContentHubDetails',
  data() {
    return {
      content: {
        type: 'video', // 'video'
      }
    }
  }
}
</script>
