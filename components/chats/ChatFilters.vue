<template>
  <v-container class="pa-0">
    <v-row justify="center">
      <v-col cols="11" >

        <v-container class="px-0">
          <v-row>
            <v-col cols="6" class="font-weight-medium pl-0">

              <v-tooltip open-on-focus bottom nudge-bottom="10" open-delay="300" z-index="9" transition="slide-y-transition">
                <template v-slot:activator="{ on, attrs }">

                  <span v-bind="attrs"
                       v-on="on">
                    <v-menu
                      offset-y
                      z-index="99"
                      min-width="200"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          text
                          v-bind="attrs"
                          v-on="on"
                        >

                          {{ chatUserFilterSelected }} <v-icon right> {{ attrs['aria-expanded'] === 'true' ? 'mdi-chevron-up': 'mdi-chevron-down' }} </v-icon>
                        </v-btn>
                      </template>


                      <v-sheet>
                        <v-list-item-group
                          mandatory
                          v-model="chatUserFilterSelected"
                          color="primary"
                        >
                          <v-list-item
                            v-for="(filter, i) in chatUsersFilters"
                            :key="i"
                            :value="filter"
                          >
                            {{ filter }} <v-chip class="ml-auto" small color="primary" v-if="filter === 'To moderate'"> <strong>1</strong> </v-chip>
                          </v-list-item>
                        </v-list-item-group>
                      </v-sheet>

                    </v-menu>
                  </span>

                </template>

                <span>View mode</span>
              </v-tooltip>

            </v-col>

            <v-col cols="6" class="text-right" v-if="chatUserFilterSelected === 'Moderated'">
              <v-menu
                offset-y
                left
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    text

                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ chatGlobalFilterSelected }}

                    <v-icon right> {{ attrs['aria-expanded'] === 'true' ? 'mdi-chevron-up': 'mdi-chevron-down' }} </v-icon>
                  </v-btn>
                </template>


                <v-sheet>
                  <v-list-item-group
                    v-if="chatUserFilterSelected === 'Moderated'"
                    mandatory
                    v-model="chatGlobalFilterSelected"
                    color="primary"
                  >
                    <v-list-item
                      v-for="(filter, i) in chatGlobalFilters"
                      :key="i"
                      :value="filter"
                    >
                      {{ filter }}
                    </v-list-item>
                  </v-list-item-group>
                </v-sheet>

              </v-menu>
            </v-col>
          </v-row>

<!--          <v-row class="mt-0">-->
<!--            <v-col>-->
<!--              <v-divider></v-divider>-->
<!--            </v-col>-->
<!--          </v-row>-->

        </v-container>



<!--        <v-chip class="rounded-lg py-4" outlined style="width: 100%" >-->
<!--          <v-container>-->
<!--            <v-row>-->
<!--              <v-col class="font-weight-medium">-->
<!--                <v-icon left small>mdi-eye</v-icon>View mode-->
<!--              </v-col>-->
<!--            </v-row>-->
<!--          </v-container>-->

<!--          <v-menu-->
<!--            offset-y-->
<!--          >-->
<!--            <template v-slot:activator="{ on, attrs }">-->
<!--              <v-btn-->
<!--                plain-->
<!--                absolute-->
<!--                right-->
<!--                small-->
<!--                v-bind="attrs"-->
<!--                v-on="on"-->
<!--              >-->
<!--                {{ chatUserFilterSelected }} <v-icon right> {{ attrs['aria-expanded'] === 'true' ? 'mdi-chevron-up': 'mdi-chevron-down' }} </v-icon>-->
<!--              </v-btn>-->
<!--            </template>-->


<!--            <v-sheet>-->
<!--              <v-list-item-group-->
<!--                mandatory-->
<!--                v-model="chatUserFilterSelected"-->
<!--                color="primary"-->
<!--              >-->
<!--                <v-list-item-->
<!--                  v-for="(item, i) in chatGlobalFilters"-->
<!--                  :key="i"-->
<!--                  :value="item"-->
<!--                >-->
<!--                  {{ item }}-->
<!--                </v-list-item>-->
<!--              </v-list-item-group>-->
<!--            </v-sheet>-->

<!--          </v-menu>-->
<!--        </v-chip>-->


      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ChatFilters',
  data(){
    return {
      chatUsersFilters: ['Moderated', 'To moderate'],
      chatGlobalFilters: ['All', 'Most Liked'],
      chatUserFilterSelected: 'Moderated',
      chatModerationFilterSelected: 'To moderate',
      chatGlobalFilterSelected: 'All',
    }
  },
  watch: {
    chatUserFilterSelected(){
      this.$emit('user-filter-change', this.chatUserFilterSelected)
    }
  }
}
</script>
