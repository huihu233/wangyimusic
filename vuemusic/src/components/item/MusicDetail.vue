<script setup>
import { storeToRefs } from 'pinia'
import { useMusicStore } from '@/store/index'
import { ref, computed } from 'vue'
import 'animate.css'

const { updateDetailShow } = useMusicStore()
const { isbtnShow, musiclyric, currentTime } = storeToRefs(useMusicStore())

const props = defineProps(['musicList', 'play'])

// 判断是否切换歌词
const isLyricShow = ref(true)

// 切换歌词界面
const toggleLyricView = () => {
  isLyricShow.value = !isLyricShow.value
}

// 处理歌词信息
const musicLyricFilter = computed(() => {
  let arr
  if (musiclyric) {
    arr = musiclyric.value.split(/[(\n\n)\r\n]/).map((item, index) => {
      let regextext = item.split(/\[(.*?)\]\s*(.*)/)

      let time = regextext[1] ? regextext[1] : ''
      let min = Number(time.slice(0, 2))
      let sec = Number(time.slice(3, time.length))
      let ms = parseInt(min * 60 * 1000 + sec * 1000)
      let clyric = regextext[2] ? regextext[2] : ''

      return {
        time: ms,
        musicText: clyric,
      }
    })

    arr.forEach((item, index) => {
      if(index === arr.length - 1) {
        item.next = 0
      } else {
        item.next = arr[index+1].time
      }
    })

  }

  // 处理空行
  return arr.filter((item, index) => {
    return item.musicText
  })
})

console.log(musicLyricFilter);


</script>

<template>
  <img :src="musicList.al.picUrl" class="detailBackImg" alt="" />
  <div class="detailTop">
    <div class="detailTopLeft">
      <svg class="icon liebiao" aria-hidden="true" @click="updateDetailShow">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <div class="detailTitle">
        <Vue3Marquee>
          <p>{{ musicList.al.name }}</p>
        </Vue3Marquee>
        <div class="detailAuthor">
          <div class="authorbox">
            <span class="sing" v-for="item in musicList.ar" :key="item">
              {{ item.name }}
            </span>
          </div>
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-youjiantou1"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="detailTopRight">
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <Transition 
    enter-from-class="animate__animated animate__slideInDown"
    >
    <div class="detailContent" @click="toggleLyricView" v-show="!isLyricShow">
      <img
        src="@/assets/needle-ab.png"
        alt=""
        class="img_needle"
        :class="{ img_needle_active: !isbtnShow }"
      />
      <img src="@/assets/cd.png" alt="" class="img_cd" />
      <img
        :src="musicList.al.picUrl"
        alt=""
        class="img_ar"
        :class="{ img_ar_active: !isbtnShow, img_ar_paused: isbtnShow }"
      />
    </div>
  </Transition>
  <Transition enter-from-class="animate__animated animate__fadeOut">
    <!-- 歌词部分 -->
    <div class="musicLyric" @click="toggleLyricView" v-show="isLyricShow">
      <ul>
        <li v-for="item in musicLyricFilter" :class="{active: (currentTime * 1000 >= item.time && currentTime * 1000 < item.next)}">
          {{ item.musicText }}
        </li>
      </ul>
    </div>
  </Transition>

  <div class="detailFooter">
    <div class="footerTop">
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <svg class="icon liebiao minsing" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-yinlechangpian"></use>
      </svg>
      <svg class="icon liebiao minsing" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-liebiao-"></use>
      </svg>
    </div>
    <div class="footerContent"></div>
    <div class="footer">
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <svg
        class="icon liebiao maxsing"
        v-show="isbtnShow"
        @click="play"
        aria-hidden="true"
      >
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg
        class="icon liebiao maxsing"
        v-show="!isbtnShow"
        @click="play"
        aria-hidden="true"
      >
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
  </div>
</template>

<style scoped lang="less">
.detailBackImg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(2rem);
}
.detailTop {
  width: 100%;
  height: 1rem;
  box-sizing: border-box;
  padding: 0.2rem;
  margin: 0.4rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .icon {
    fill: #fff;
    width: 0.8rem;
    height: 0.8rem;
  }

  .detailTopLeft {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    svg {
      margin-right: 0.4rem;
    }
    .detailTitle {
      min-width: 2rem;
      max-width: 3rem;
      p {
        font-size: 0.4rem;
      }
      .detailAuthor {
        display: flex;
        align-items: center;
        color: #999;
        .authorbox {
          max-width: 2rem;
          // width: 2rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          .sing::after {
            content: '、';
          }
          .sing:last-child {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-right: 0.2rem;
          }
          .sing:last-child::after {
            content: '';
          }
        }
        .icon {
          width: 0.4rem;
          height: 0.4rem;
          fill: #999;
        }
      }
    }
  }
}
.detailContent {
  width: 100%;
  height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    top: 10%;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-10deg);
    transition: all 2s;
  }
  .img_needle_active {
    transform: rotate(0deg);
  }
  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_ar infinite linear 10s;
  }
  .img_ar_active {
    animation-play-state: running;
  }
  .img_ar_paused {
    animation-play-state: paused;
  }
  @keyframes rotate_ar {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
.musicLyric {
  width: 100%;
  height: 10rem;
  overflow: auto;
  box-sizing: border-box;
  padding: 0 0.6rem;
  li {
    color: #ccc;
    text-align: center;
    margin-bottom: 0.4rem;
    font-size: 0.4rem;
  }
  .active {
    color: #fff;
    font-size: .5rem;
  }
}

.footerTop {
  width: 100%;
  height: 1.6rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  // margin-top: 0.9rem;
  .icon {
    width: 0.8rem;
    height: 0.8rem;
    fill: #fff;
  }
  .icon.minsing {
    width: 0.7rem;
    height: 0.7rem;
  }
}

.footer {
  width: 100%;
  height: 1.6rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  bottom: 0.6rem;
  .icon {
    width: 0.8rem;
    height: 0.8rem;
    fill: #fff;
  }
  .icon.maxsing {
    width: 1.2rem;
    height: 1.2rem;
  }
}
</style>
