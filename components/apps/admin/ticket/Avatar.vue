<template>
  <base-avatar icon="mdi-ticket"
               size="xs"
               color="primary" />
</template>
<script>
import BaseAvatar from "../../../base/Avatar";

export default {
  name: "Avatar",
  components: {BaseAvatar},
  props: {
    ticketId: {
      type: String,
      required: true,
    }
  },
}
</script>
