<template>
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-advertisements</v-icon>
      {{ $t('advertisements') }}

      <v-spacer />

      <v-btn rounded :loading="loading" :disabled="loading" @click="reload">
        <v-icon left>mdi-refresh</v-icon>{{ $t('reload') }}
      </v-btn>

      <v-dialog v-model="createAdvertisementDialog" max-width="800px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ml-3" rounded v-bind="attrs" v-on="on">
            <v-icon left>mdi-advertisements</v-icon>
            {{ $t('create-advertisement') }}
          </v-btn>
        </template>
        <apps-admin-advertisements-create-advertisement @close="createAdvertisementDialog = false;"/>
      </v-dialog>

      <!--            <v-menu bottom left>-->
      <!--              <template v-slot:activator="{on, attrs}">-->
      <!--                <v-btn icon v-bind="attrs" v-on="on">-->
      <!--                  <v-icon>mdi-dots-vertical</v-icon>-->
      <!--                </v-btn>-->
      <!--              </template>-->
      <!--              <v-list>-->
      <!--                &lt;!&ndash; create an advertisement &ndash;&gt;-->
      <!--                <v-list-item link :to="{name: 'apps-admin-advertisements-create'}">-->
      <!--                  <v-list-item-content>-->
      <!--                    <v-list-item-title>{{ $t('create-advertisement') }}</v-list-item-title>-->
      <!--                    <v-list-item-subtitle>{{ $t('create-advertisement') }}</v-list-item-subtitle>-->
      <!--                  </v-list-item-content>-->
      <!--                </v-list-item>-->
      <!--              </v-list>-->
      <!--            </v-menu>-->

    </v-card-title>

    <v-card-subtitle>{{ $t('advertisements') }}</v-card-subtitle>

    <v-card-text>
      <v-list>
        <apps-admin-advertisement-nav-list-item
          v-for="advertisement in advertisements"
          :key="advertisement.advertisementId"
          :name="advertisement.name" />
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "List",

  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/advertisements/load',
    })
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/advertisements/loading',
      loaded: 'apps/admin/advertisements/loaded',
      advertisements: 'apps/admin/advertisements/advertisements',
      numberOfAdvertisements: 'apps/admin/advertisements/numberOfAdvertisements'
    })
  },
}
</script>

