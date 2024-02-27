import { defineStore } from 'pinia'
import { getMusicLyric } from '../request/api/item'

const useMusicStore = defineStore('useMusicStore', {
  state: () => ({
    playList: [
      // 播放列表
      {
        al: {
          id: 11307,
          name: '红日',
          pic: 109951168437454510,
          picUrl:
            'https://p2.music.126.net/ijz9xCWE_56-60MmHN-s8A==/109951168437454514.jpg',
          pic_str: '109951168437454514',
        },
        ar: [
          {
            alias: [],
            id: 3699,
            name: '李克勤',
          },
        ],
        id: 115502,
        name: '红日',
      },
    ],
    playListIndex: 0, // 默认下标
    isbtnShow: true, // 暂定按钮显示
    detailShow: false, // 歌曲详情页的显示
    musiclyric: '', // 歌曲歌词
    currentTime: 0, // 当前时间
  }),

  getters: {},

  actions: {
    // 更改 播放/暂停按钮
    changeIsbtnShow(val) {
      this.isbtnShow = val
    },
    // 赋值歌单列表
    updatePlayList(value) {
      this.playList = value
    },
    updatePlayListIndex(index) {
      this.playListIndex = index
    },
    // 展示歌曲详情页
    updateDetailShow() {
      this.detailShow = !this.detailShow
    },
    // 获取歌曲歌词
    async getLyric() {
      const result = await getMusicLyric(this.playList[this.playListIndex].id)
      this.musiclyric = result.data.lrc.lyric
    },
    updateCurrentTime(time) {
      this.currentTime = time
    }
  },
})

export { useMusicStore }
