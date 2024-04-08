<template>
  <v-card>
    <v-card-title>
      <v-icon left>mdi-advertisements</v-icon>
      {{ $t('update-advertisement') }}
    </v-card-title>
    <v-card-text>

      <v-container fluid>
        <v-row>
          <v-col>
            <apps-admin-advertisements-select :value="advertisementId" @change="changeAdvertisement" ></apps-admin-advertisements-select>
          </v-col>
        </v-row>

<!--        <v-row>-->
<!--          <v-col>-->
<!--            debug:-->

<!--            <pre>-->
<!--              {{ updatingComponent }}-->
<!--            </pre>-->
<!--          </v-col>-->
<!--        </v-row>-->
      </v-container>

    </v-card-text>
    <v-card-actions>
      <v-btn text @click="close">{{ $t('close') }}</v-btn>

      <v-spacer />
      <v-btn @click="update" :disabled="updatingComponent && updatingComponent.updating" :loading="updatingComponent && updatingComponent.updating">
        {{ $t('update') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UpdateAdvertisement",
  props: {
    areaId: {
      type: String,
    },
    componentId: {
      type: String,
    }
  },
  data(){
    return {
      advertisementId: undefined,
      executionArn: undefined,
    }
  },
  computed: {
    ...mapGetters({
      updatingComponentWithExecutionArn: 'apps/admin/areas/updatingComponentWithExecutionArn',
    }),

    updatingComponent () {
      return (this.executionArn) ? this.updatingComponentWithExecutionArn(this.executionArn) : undefined;
    },
  },
  watch: {
    updatingComponent({ updating, updated }){
      if (! updating && updated)
        this.close()
    }
  },
  methods: {
    ...mapActions({
      updateComponent: 'apps/admin/areas/updateComponent'
    }),

    async update(){

      const updatingComponent = await this.updateComponent({
        componentId: this.componentId,
        areaId: this.areaId,
        advertisementId: this.advertisementId
      })

      if (updatingComponent) {

        const {executionArn, startDate} = updatingComponent;

        //@todo: handle errors
        //@todo: show messages success/failure

        this.executionArn = executionArn;
      } else {
        console.log("throw error from step function...")
      }
    },

    close(){
      this.$emit('close')
    },

    changeAdvertisement (advertisementId) {
      this.advertisementId = advertisementId;
    },
  },
}
</script>

