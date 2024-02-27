<script setup>
import { defineProps } from 'vue'
import { useChangeCount } from '@/hooks/index.js'
import { useMusicStore } from '@/store/index.js'

const { updatePlayList,updatePlayListIndex } = useMusicStore()

const props = defineProps({
  musicList: {
    default: {},
  },
  subscribedCount: {
    default: 0,
    type: Number,
  },
})

function playMusic(val) {

  // 修改歌单列表
  updatePlayList(props.musicList)
  // 修改下标
  updatePlayListIndex(val)

}

</script>

<template>
  <div class="itemMusicList">
    <div class="itemListTop">
      <div class="listLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofanganniu"></use>
        </svg>
        <span
          >播放全部<span>(共{{ musicList.length }}首)</span></span
        >
      </div>
      <div class="listRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiahao"></use>
        </svg>
        <span>收藏({{ useChangeCount(subscribedCount) }})</span>
      </div>
    </div>
    <div class="itemList">
      <div class="item" v-for="(item, i) in musicList" :key="i">
        <div class="itemLeft" @click="playMusic(i)">
          <span class="leftSpan">{{ i + 1 }}</span>
          <div>
            <p>{{ item.name }}</p>
            <span class="sing" v-for="(item1, index) in item.ar" :key="index">{{
              item1.name
            }}</span>
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon bofang" aria-hidden="true" v-if="item.mv != 0">
            <use xlink:href="#icon-shipin"></use>
          </svg>
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.itemMusicList {
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  height: 100%;
  margin-top: -0.2rem;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  .itemListTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .listLeft,
    .listRight {
      display: flex;
      align-items: center;
    }
    .listLeft {
      .icon {
        width: 0.6rem;
        height: 0.6rem;
        margin-right: 0.2rem;
        fill: #999;
      }
      span {
        font-size: 0.35rem;
        font-weight: 600;
        span {
          font-size: 0.3rem;
          color: #999;
          font-weight: 400;
        }
      }
    }
    .listRight {
      height: 100%;
      box-sizing: border-box;
      background-color: red;
      color: #fff;
      fill: #fff;
      padding: 0 0.2rem;
      border-radius: 0.5rem;
      .icon {
        margin-right: 0.1rem;
        width: 0.5rem;
        height: 0.5rem;
      }
      span {
        font-size: 0.35rem;
      }
    }
  }

  .itemList {
    width: 100%;
    padding-bottom: 1.2rem;
    height: 9rem;
    overflow: auto;
    .item {
      width: 100%;
      padding: 0.2rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .itemLeft {
        display: flex;
        align-items: center;
        height: 1rem;
        .leftSpan {
          margin-right: 0.2rem;
          color: #000;
        }
        p {
          width: 4rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 0.4rem;
        }
        .sing {
          color: #ccc;
        }
        .sing::after {
          content: '、';
        }
        .sing:last-child::after {
          content: '';
        }
      }
      .itemRight {
        .icon {
          width: 0.5rem;
          height: 0.5rem;
          fill: #ccc;
          margin-left: 0.2rem;
        }
      }
    }
  }
}
</style>
