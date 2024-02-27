import { getMusicSrc } from "../request/api/item"


// 处理播放量为万为单位
export const useChangeCount = (num) => {
  if (num >= 100000000) {
    return (num / 100000000).toFixed(2) + '亿'
  } else if(num >= 1000000) {
    return(num / 1000000).toFixed(2) + '万'
  } else {
    return (num / 10000).toFixed(2) + '万'
  }
}

