import { defineStore } from 'pinia'

import { ref } from 'vue'

const useOnlinePlayStore = defineStore('onlinePlay', () => {
  const onlinePlay = ref({
    /** 是否显示在线播放组件 */
    isShowOnlinePlay: true,

  })

  /**
   * 打开网站
   */
  const openSite = (event: MouseEvent, siteItem: OnlinePlayConfigType.SiteItem) => {
    event.preventDefault()
    const { hostname } = siteItem

    window.open(`https://${hostname}`, '_blank')
  }

  return {
    onlinePlay,
    openSite,
  }
})

export default useOnlinePlayStore
