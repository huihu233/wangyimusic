<script setup>
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useMusicStore } from '@/store/index'
import { getMusicSrc } from '@/request/api/item.js'
import MusicDetail from '../item/MusicDetail.vue'

const { playList, playListIndex, isbtnShow, detailShow } = storeToRefs(
  useMusicStore()
)
const { changeIsbtnShow, updateDetailShow, getLyric, updateCurrentTime } = useMusicStore()

// 音乐标签
let audio = ''
// 定时器
let interVal = null

// 修改播放按钮
const musicPlay = () => {
  audio = document.querySelector('#audio')
  if (isbtnShow.value) {
    audio.load()
    audio.play()
    changeIsbtnShow(false) // 将暂停改为播放
    updateTime()           // 监听播放时间
  } else {
    audio.pause()
    changeIsbtnShow(true)  // 将播放改为暂停
    clearInterval(interVal)// 清除定时器    
  }

  audio.addEventListener('ended', (event) => {
    musicPlay()
    clearInterval(interVal) // 清除定时器  
  })
}

// 监听播放时间
const updateTime = () => {
  if(audio) {
    interVal = setInterval(() => {
      // console.log(audio.currentTime);
      updateCurrentTime(audio.currentTime)
    }, 1000);
  }
}
 
/**
 *  关于获取歌曲连接不能自动更新解决办法
 *  使用 watch 监听 playList 即可。
 */
let MusicSrc = ref('')
onMounted(async () => {
  let {
    data: { data },
  } = await getMusicSrc(playList.value[playListIndex.value].id)
  MusicSrc.value = data[0].url

  // 加载歌词
  getLyric()         
})


// 监听 palyList 来更新歌曲链接
watch(
  [playList, playListIndex],
  async () => {
    let {
      data: { data },
    } = await getMusicSrc(playList.value[playListIndex.value].id)
    MusicSrc.value = data[0].url
    // 更改后自动播放
    audio.autoplay = true
    // 只有是暂停时 才改成播放按钮
    if (isbtnShow.value) {
      changeIsbtnShow(false)
    }

    // 更新歌词
    getLyric()
    // 监听播放时间
    updateTime()

  },
  {
    deep: true,
  }
)
</script>

<template>
  <div class="FooterMusic">
    <div class="footerLeft" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div class="">
        <p>{{ playList[playListIndex].name }}</p>
        <span>横滑切换上下首</span>
      </div>
    </div>
    <div class="footerRight">
      <svg
        class="icon liebiao"
        aria-hidden="true"
        @click="musicPlay"
        v-if="isbtnShow"
      >
        <use xlink:href="#icon-bofanganniu"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true" @click="musicPlay" v-else>
        <use xlink:href="#icon-weibiaoti--"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
    <!-- 播放器 -->
    <audio id="audio" ref="audio" :src="MusicSrc"></audio>
    <!-- 歌单详情页 -->
    <van-popup
      v-model:show="detailShow"
      position="bottom"
      :style="{ width: '100%', height: '100%' }"
    > 
      <!-- 歌单详情页内容 -->
      <MusicDetail 
        :musicList="playList[playListIndex]"
        :play="musicPlay"
        :isbtnShow="isbtnShow"
        >
      </MusicDetail>
    </van-popup>
  </div>
</template>

<style scoped lang="less">
.FooterMusic {
  width: 100%;
  height: 1.4rem;
  position: fixed;
  bottom: 0px;
  background-color: #fff;
  border-top: 1px solid #999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .footerLeft {
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      margin: 0 0.4rem;
    }
  }
  .footerRight {
    width: 20%;
    margin-right: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>
