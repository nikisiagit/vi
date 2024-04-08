<template>
  <v-card class="waiting-card">
    <v-card-title>Waiting for others!</v-card-title>
    <v-card-text class="text-center">
      Invite someone by sharing this link:

      <p>{{ url }}</p>
    </v-card-text>

  </v-card>
</template>

<script>
export default {
  name: "WaitingCard",
  props: ["url"],
};
</script>

<style >
.waiting-card {
  margin: 10px 20px;
  flex: 1 1 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2px 0;
  aspect-ratio: 16/9;
  max-width: 35%;
}

@media only screen and (min-width: 768px) and (max-width: 1223px){
  .tile {
    max-width: 45%;
  }
}

@media only screen and (min-width: 1224px){
  .tile {
    max-width: 35%;
  }
}
</style>
