<template>
  <v-container class="pa-0">
    <v-row justify="center">
      <v-col cols="11" >

        <v-container class="pa-0">
          <v-row >
            <v-col class="font-weight-medium pl-0">

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
                    {{  filterSelected }} <v-icon right> {{ attrs['aria-expanded'] === 'true' ? 'mdi-chevron-up': 'mdi-chevron-down' }} </v-icon>
                  </v-btn>
                </template>


                <v-sheet>
                  <v-list-item-group
                    mandatory
                    v-model="filterSelected"
                    color="primary"
                  >
                    <v-list-item
                      v-for="(filter, i) in filters"
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

        </v-container>
<!--        <v-divider></v-divider>-->

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'QAFilters',
  data(){
    return {
      filters: ['All', 'Unassigned', 'Assigned to me', 'Answered'],
      filterSelected: 'All',
    }
  }
}
</script>
