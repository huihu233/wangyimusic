import { createRouter, createWebHistory } from "vue-router"
import Home from '@/views/Home.vue'
import ItemMusic from '@/views/ItemMusic.vue'
// 四个主要页面
import discover from '@/views/mainPage/discover.vue'
import my from '@/views/mainPage/my.vue'
import hamlet from '@/views/mainPage/hamlet.vue'
import video from '@/views/mainPage/video.vue'

// 创建路由器
export const router = createRouter({
  history: createWebHistory(), // 工作模式
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home', // 主页
      component: Home,
      children: [
        {
          path: '/home',
          redirect: '/home/discover',
        },
        {
          name: 'Discvoer',
          path: '/home/discover', // 发现页
          component: discover,
        },
        {
          name: 'My',
          path: '/home/my', // 我的
          component: my,
        },
        {
          name: 'Hamlet',
          path: '/home/hamlet', // 云村
          component: hamlet,
        },
        {
          name: 'Video',
          path: '/home/video', // 视频
          component: video,
        },
      ],
    },
    {
      path: '/ItemMusic', // 推荐详情页
      component: ItemMusic,
    },
  ],
})

