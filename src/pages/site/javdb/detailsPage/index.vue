<!------  2025-08-12---16:47---星期二  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { useFolderStore } from '@/stores'

import { addHighlightToElement, getTagArray } from '@/utils'

const folderStore = useFolderStore()

/**
 *  页面视频名称
 */
const pageVideoName = ref<string>('')

/**
 *  是否视频存在中文磁链
 */
const isVideoHaveChineseTorrent = ref(false)

/**
 *  是否显示 提示更新中文磁链按钮
 */
const isShowPendingUpdateChineseButton = ref(false)

/**
 *  是否显示 emby按钮
 */
const isShowEmbyButton = ref(false)

/**
 *  emby已入库列表
 */
const embyCatalogedList = ref<VideoType.Video[]>([])

/**
 *  是否显示自定义磁链列表
 */
const isShowTorrentList = ref(false)

/**
 *  磁链列表
 */
const torrentList = ref<TorrentType[]>([])

/**
 * 获取详情页视频名称
 * @returns 视频标题文本
 */
function getPageVideoName(): string {
  const strongElements = document.querySelectorAll('.video-detail strong')

  console.log('%c Line:51 🥒 strongElements', 'color:#ffdd4d', strongElements)

  if (strongElements.length > 0) {
    const titleText = strongElements[0].textContent
      ?.trim()
      .toLowerCase()
      .replace(/\s+/g, '')

    return titleText || ''
  }

  return ''
}

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

  //  循环磁链列表
  items.forEach((item: any) => {
    const name = item.querySelector('.name')?.textContent?.trim() || ''

    const url = item.querySelector('.copy-to-clipboard').dataset.clipboardText || ''

    const sizeText = item
      .querySelector('.meta')
      ?.textContent
      ?.trim() || ''

    // 兼容 GB 和 MB 格式
    const gbMatch = sizeText.match(/(\d+(\.\d+)?)GB/)

    const mbMatch = sizeText.match(/(\d+(\.\d+)?)MB/)

    let size = 0

    if (gbMatch) {
      size = Number.parseFloat(gbMatch[1])
    }
    else if (mbMatch) {
      // MB 转换为 GB (1 GB = 1024 MB)
      size = Number.parseFloat(mbMatch[1]) / 1024
    }

    // 保留两位小数
    size = Math.round(size * 100) / 100

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

function main() {
  if (!folderStore.folderFileList.length) {
    console.log('%c Line:146 🥃 folderStore.folderFileList', 'color:#ea7e5c', folderStore.folderFileList)
    return
  }

  // 获取视频名称 (小写，去除空格)
  pageVideoName.value = getPageVideoName()

  if (!pageVideoName.value) {
    return
  }

  // 当前视频名称已入库的视频列表
  const matchedVideoList = folderStore.folderFileList.filter(item =>

    item.processedName.includes(pageVideoName.value),
  )

  /**
   *  emby中是否有中文磁链
   */
  const isEmbyHaveChineseTorrent = matchedVideoList.some(item => item.isChinese)

  console.log('%c Line:161 🍊 isEmbyHaveChineseTorrent', 'color:#465975', isEmbyHaveChineseTorrent)

  const videoMetaPanel = document.querySelector('.movie')

  if (matchedVideoList.length) {
    addHighlightToElement(videoMetaPanel)

    embyCatalogedList.value.push(...matchedVideoList)

    isShowEmbyButton.value = true
  }

  // 如果当前视频有中文磁链可用并且 Emby 中已经存在的视频没有中文磁链，则添加提示更新中文磁链按钮
  if (
    isVideoHaveChineseTorrent.value
    && !isEmbyHaveChineseTorrent
    && matchedVideoList.length
  ) {
    isShowPendingUpdateChineseButton.value = true
    console.log('%c Line:179 🌶 isShowPendingUpdateChineseButton', 'color:#93c0a4', isShowPendingUpdateChineseButton)
  }
}

onMounted(() => {
  getTorrentList()

  main()
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

  <!-- //pending -->

  <div
    class="sm-50 fixed left-2 top-60 w-30 lg:w-70 md:w-50"
  >
    <PendingUpdateChineseButton
      v-if="isShowPendingUpdateChineseButton"
      class="w-full"
    />

    <div
      v-if="embyCatalogedList.length"
      class="w-full rounded-2 bg-[#FF8400] p-2"
    >
      <AddedToEmbyButton
        v-for="(item, index) in embyCatalogedList"
        :key="index"
        :video="item"
      />
    </div>
  </div>

</template>

<style lang="scss" scoped>

</style>
