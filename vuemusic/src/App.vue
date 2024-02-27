<script setup>
  import { RouterView } from 'vue-router'
  import FooterMusic from '@/components/item/FooterMusic.vue';
</script>

<template>
  <RouterView></RouterView>
  <!-- <Suspense>
    <component :is="FooterMusic">
    </component>    
  </Suspense> -->
  <FooterMusic></FooterMusic>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon {
  width: .4rem;
  height: .4rem;
}
a {
  text-decoration: none;
  color: #000;
}
ul,ol {
  list-style: none;
}
</style>
