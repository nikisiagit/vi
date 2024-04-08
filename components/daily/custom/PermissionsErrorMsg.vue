<template>
  <div class="wrapper">
    <div class="permissions-card">
      <h2>Camera or mic blocked</h2>
      <v-btn color="warning" @click="tryAgain">Try again</v-btn>
      <a
        href="https://help.daily.co/en/articles/2528184-unblock-camera-mic-access-on-a-computer"
        rel="noreferrer noopener"
        target="_blank"
      >
        Get help
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "PermissionsErrorMsg",
  props: ["reset"],
  methods: {
    tryAgain() {
      this.reset();
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.permissions-card {
  background-color: #2b3f56;
  border-radius: 16px;
  margin: 10px 20px;
  flex: 1 1 350px;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2px 0;
  aspect-ratio: 16/9;
}

</style>
