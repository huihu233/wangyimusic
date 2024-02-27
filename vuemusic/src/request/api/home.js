import { server } from "../index.js"

// 获取轮播图
export function getBanner() {
  return server({
    method: 'GET',
    url: '/banner?type=2',
  })
}

// 获取发现好歌单
export function getMusicList() {
  return server({
    method: 'GET',
    url: '/personalized',
    params: {
      limit: 10
    }
  })
}




