<template>
  <v-card>
    <v-card-text>
  <v-container>
    <v-row>
      <v-col>
        <template v-if="status === 'SUCCEEDED'">
          <v-alert dense outlined type="success">
            You have successfully created the {{title}} room. Click view to see it in the room area.
          </v-alert>
        </template>

        <template v-if="status === 'FAILED'">
          <v-alert dense outlined type="error">
            Error - we have been unable to create your room. Please click retry to try again.
          </v-alert>
        </template>
      </v-col>
    </v-row>
  </v-container>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn @click="cancel">{{ $t('cancel') }}</v-btn>
      <v-btn
        :to="{ name: 'apps-admin-rooms-roomId', params: { roomId } }"
        class="primary">
       {{ $t("view") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions} from "vuex";

export default {
  props: {
    status: {
      type: String,
      required: true,
    },
    roomId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },

  methods: {
    ...mapActions({
      resetRoomStatus: 'apps/admin/rooms/resetRoomStatus',
    }),
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>

