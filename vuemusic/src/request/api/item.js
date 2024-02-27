import { server } from '../index.js'

// 获取个点详情页的数据
export function getMusicItemList(id) {
  return server({
    method: 'GET',
    url: '/playlist/detail',
    params: {
      id,
    },
  })
}

// 获取歌曲的所有歌曲
export function getItemList(id) {
  return server({
    method: 'GET',
    url: '/playlist/track/all?limit=20&offset=0',
    params: {
      id,
    },
  })
}

// 获取音乐连接
export function getMusicSrc(id) {
  return server({
    method: 'GET',
    url: `/song/url/v1?level=exhigh`,
    params: {
      id
    }
  })
}

// 获取歌曲的歌词/lyric?id=33894312
export function getMusicLyric(id) {
  return server({
    method: 'GET',
    url: '/lyric/new',
    params: {
      id
    }
  })
}


