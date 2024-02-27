<script setup>
import { reactive, onMounted } from 'vue'
import { server } from '@/request/index.js'
import { getBanner } from '@/request/api/home.js'

let state = reactive({
  images: [],
})

// 获取轮播图
onMounted(async () => {
  // 获取轮播图数据
  const { data: banners } = await getBanner()
  state.images = banners.banners
})
</script>

<template>
  <!-- 轮播图 -->
  <div>
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      :lazy-reader="true"
    >
      <van-swipe-item v-for="item in state.images" :key="item">
        <img :src="item.pic" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style scoped lang="less">
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #fff;
  .van-swipe__indicator--active {
    background-color: red;
  }
}
.van-swipe {
  width: 100%;
  height: 3rem;
  .van-swipe-item {
    padding: 0 0.2rem;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 0.2rem;
  }
}



</style>
