<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  playlist: {
    default: JSON.parse(sessionStorage.getItem('itemDetail'))
  }
})

// 处理播放量为万为单位
const changeCount = (num) => {
  if (num >= 100000000) {
    return (num / 100000000).toFixed(2) + '亿'
  } else {
    return (num / 1000000).toFixed(2) + '万'
  }
}

</script>

<template>
  <div class="itemMusicTop">
    <img :src="playlist.coverImgUrl" class="bgimg">
    <div class="itemLeft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="itemRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
       <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
  </div>
  <div class="itemMusicContent">
    <div class="contentLeft">
      <img :src="playlist.coverImgUrl" alt="" />
      <div class="palyCount">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gl-play-copy"></use>
        </svg>
        <span>{{ changeCount(playlist.playCount) }}</span>
      </div>
    </div>
    <div class="contentRight">
      <p class="rightP_one">{{ playlist.name }}</p>
      <div class="right_img">
        <img :src="playlist.creator?.backgroundUrl" alt="" />
        <span>{{ playlist.creator?.nickname }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </div>
      <p class="rightP_two">
        <span>{{ playlist.description }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </p>
    </div>
  </div>
  <div class="itemMusicEnd">
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
      </svg>
      <span>{{ playlist.commentCount  }}</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>{{ playlist.shareCount }}</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <span>下载</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-show_duoxuan"></use>
      </svg>
      <span>多选</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.itemMusicTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding: .2rem;
  position:relative;
  box-sizing: border-box;
  .bgimg {
    width: 100%;
    height: 11rem;
    position: fixed;
    z-index: -1;
    filter: blur(20px);
  }
  .itemLeft,.itemRight {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 .2rem;
    span {
      font-size: 20px;
      color: #fff;
    }
    .icon {
      fill: #fff; // 填充颜色
    }
  }
}
.itemMusicContent {
  width: 100%;
  height: 3.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 10px;
  padding-bottom: 0;
  .contentLeft {
    width: 45%;
    height: 100%;
    position: relative;
    img {
      width: 100%;
      border-radius: .2rem;
    }
    .palyCount {
      position: absolute;
      display: flex;
      align-items: center;
      top: .2rem;
      right: .2rem;
      color: #fff;
      span {
        margin-left: 4px;
      }
    }
  }
  .contentRight {
    width: 50%;
    height: 100%;
    color: #fff;
    .rightP_one {
      font-size: 18px;
      height: 1rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .right_img {
      display: flex;
      height: .9rem;
      overflow: hidden;
      text-overflow: ellipsis;
      align-items: center;
      color: #ccc;
      margin: 10px 0;
      .icon {
        fill: #ccc;
      }
      img {
        width: .9rem;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
    .rightP_two {
      font-size: 14px;
      height: .8rem;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #ccc;
    }
  }
}

.itemMusicEnd {
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #fff;
  fill: #fff;
  margin-bottom: .4rem;
  .footerItem {
    width: 25%;
    text-align: center;
    .icon {
      width: .6rem;
      height: .6rem;
    }
    span {
      display: block;
      margin-top: .1rem;
    }
  }
}
</style>
