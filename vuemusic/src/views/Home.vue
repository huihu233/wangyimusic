<script setup>
  import { RouterView } from 'vue-router'
  import topNav from '@/components/home/TopNav.vue'
</script>

<template>
  <!-- 导航条 -->
  <topNav></topNav>
  <RouterView></RouterView>
</template>

<style scoped lang="less">
  
</style>