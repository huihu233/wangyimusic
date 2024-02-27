<script setup>
import { onMounted, reactive } from 'vue'
import { getMusicList } from '@/request/api/home.js'
import { useChangeCount } from '@/hooks/index.js';

const musicList = reactive({
  data: [],
})

// 获取每日推荐数据
const getMusicListData = async () => {
  const {
    data: { result },
  } = await getMusicList()
  musicList.data = result
}

onMounted(() => {
  getMusicListData()
})
</script>

<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="MusicContent">
      <van-swipe
        class="my-swipe"
        :loop="false"
        :width="150"
        :show-indicators="false"
      >
        <van-swipe-item v-for="item in musicList.data" :key="item.id" @click="$router.push({path: '/ItemMusic', query:{id: item.id}})">
          <img :src="item.picUrl" alt="" />
          <span class="playCount">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-24gl-play"></use>
            </svg>
            {{ useChangeCount(item.playCount) }}
          </span>
          <span class="name">{{ item.name }}</span>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .MusicContent {
    width: 100%;
    height: 3.6rem;
    .van-swipe-item {
      position: relative;
      height: 3.8rem;
      img {
        widows: 100%;
        height: 2.8rem;
        border-radius: 0.2rem;
      }
      .playCount {
        display: flex;
        align-items: center;
        position: absolute;
        z-index: 100;
        right: .4rem;
        top: 1px;
        color: white;
        margin-top: .06rem;
        .icon {
          width: 0.3rem;
          height: 0.3rem;
          margin-right: 4px;
          fill: #fff;
        }
      }
    }
    .name {
      display: block;
      box-sizing: border-box;
      width: 90%;
      bottom: 0;
    }
  }
}
</style>
