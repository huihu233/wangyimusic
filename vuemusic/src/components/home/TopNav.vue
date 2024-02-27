<script setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
</script>

<template>
  <div class="topNav">
    <div class="topLeft">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>

    <div class="topContent">
      <span
        @click="router.push({ name: 'My' })"
        :class="{ active: route.name === 'My' }"
        >我的</span
      >
      <span
        @click="router.push({ name: 'Discvoer' })"
        :class="{ active: route.name === 'Discvoer' }"
        >发现</span
      >
      <span
        @click="router.push({ name: 'Hamlet' })"
        :class="{ active: route.name === 'Hamlet' }"
        >云村</span
      >
      <span
        @click="router.push({ name: 'Video' })"
        :class="{ active: route.name === 'Video' }"
        >视频</span
      >
    </div>

    <div class="topRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
  </div>
</template>

<style scoped lang="less">
.topNav {
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .topContent {
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 18px;
    .active {
      font-weight: 600;
    }
  }
}
</style>
