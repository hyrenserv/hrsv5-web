<template>
  <div class="loading"  v-if="this.$store.state.loading.loadingShow"></div>
</template>

<script>
export default {
  name: "Loading", // 定义的组件名称 使用时写法：loading
};
</script>

<style scoped>
.loading {
  position: fixed;
  left: 50px;
  top: 0;
  background: url("~@/assets/images/loading-ball.svg") center center no-repeat
    rgba(156, 154, 154, 0.6);
  width: 100vw;
  height: 100vh;
  z-index: 10000;
}
</style>