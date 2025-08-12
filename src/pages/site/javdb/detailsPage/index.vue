<!------  2025-08-12---16:47---星期二  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { getTagArray } from '@/utils'

/**
 *  是否显示 提示更新中文磁链按钮
 */
const isVideoHaveChineseTorrent = ref(false)

/**
 *  磁链列表
 */
const torrentList = ref<TorrentType[]>([])

/**
 *  是否显示自定义磁链列表
 */
const isShowTorrentList = ref(false)

/**
 * 获取页面中的磁链列表
 */
function getTorrentList() {
  /**
   *  列表容器
   */
  const magnetsContent = document.getElementById('magnets-content')

  if (!magnetsContent || !magnetsContent.children.length) {
    return
  }

  /**
   *  磁链列表
   */
  const items = Array.from(magnetsContent.querySelectorAll('.columns'))

  items.forEach((item: any) => {
    const name = item.querySelector('.name')?.textContent?.trim() || ''

    const url = item.querySelector('.copy-to-clipboard').dataset.clipboardText || ''

    const size = Number.parseFloat(
      item
        .querySelector('.meta')
        ?.textContent
        ?.trim()
        .match(/(\d+(\.\d+)?)GB/)?.[1] || '0',
    )

    const time = item.querySelector('.time')?.textContent?.trim() || ''

    const tagArray = getTagArray(name)

    const torrentListItem: TorrentType = {
      url,
      name,
      size,
      time,
      tagArray,
    }

    torrentList.value.push(torrentListItem)

    if (name.includes('-c') || name.includes('-C')) {
      isVideoHaveChineseTorrent.value = true
    }
  })
  console.log('%c Line:107 🍅 torrentList.value', 'color:#3f7cff', torrentList.value)
  const noBottom = document.querySelector('.no-bottom')

  if (noBottom) {
    noBottom.insertAdjacentHTML('afterend', '<div id="TorrentList"></div>')

    isShowTorrentList.value = true
  }
}

onMounted(() => {
  getTorrentList()

  // main()
})
</script>

<template>
  <!-- 自定义磁链列表 -->
  <TorrentList
    v-if="isShowTorrentList"
    to="#TorrentList"
    scroll-target=".video-panel"
    :torrent-list="torrentList"
  />
</template>

<style lang="scss" scoped>

</style>
