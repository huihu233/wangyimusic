<script setup >
  import { onMounted, reactive } from 'vue'
  import {useRoute} from 'vue-router'
  import { getMusicItemList, getItemList } from '@/request/api/item.js'
  import itemMusicTop from '@/components/item/ItemMusicTop.vue'
  import itemMusicList from '@/components/item/ItemMusicList.vue'

  const route = useRoute()

  // 获取 歌单详情页 id
  const id = route.query.id

  // 歌单详情页数据
  const musicItemData = reactive({
    // 介绍信息
    page: {},
    // 歌曲列表
    musicList: []
  })

  onMounted( async () => {
    const {data: {playlist}} = await(getMusicItemList(id))
    const musicList = await(getItemList(id))
    
    // 获取歌单详情页
    musicItemData.page = playlist
    // 获取歌单的歌曲
    musicItemData.musicList = musicList.data.songs
    // 防止数据丢失 存储到 sessionStorage
    sessionStorage.setItem('itemDetail', JSON.stringify(musicItemData.page))

  })
  
</script>

<template>
  <itemMusicTop :playlist="musicItemData.page"></itemMusicTop>
  <itemMusicList :musicList="musicItemData.musicList" :subscribedCount="musicItemData.page.subscribedCount"></itemMusicList>
</template>

<style scoped>

</style>