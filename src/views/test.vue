<template>
  <div class="main-panel">
    <!-- <keep-alive> -->
      <router-view />
    <!-- </keep-alive> -->
    <!-- <router-view v-show="!$route.meta.isKeepAlive" /> -->
  </div>
</template>

<script>
export default {
  name: "test",
  mounted() {
    // console.log(this.$route);
  }
};
</script>

<style scoped>
</style>
