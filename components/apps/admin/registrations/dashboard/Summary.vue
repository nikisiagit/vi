<template>
  <v-list>
    <v-row>
      <v-col>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle>{{$t('total-registered')}}</v-list-item-subtitle>
          <v-list-item-title class="headline mb-1 text-lg-h3">529</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>{{$t('admins')}}</v-list-item-subtitle>
            <v-list-item-title class="headline mb-1">8</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>{{$t('users')}}</v-list-item-subtitle>
            <v-list-item-title class="headline mb-1">521</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
  </v-list>
</template>

<script>
export default {
  name: "Summary",

}
</script>
