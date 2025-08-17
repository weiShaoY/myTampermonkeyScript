<!------  2025-08-12---16:47---星期二  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { useFolderStore } from '@/stores'

import { getFileTagIconArray } from '@/utils'

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
const embyCatalogedList = ref<FolderConfigType.File[]>([])

/**
 *  是否显示在线播放组件
 */
const isShowOnlinePlay = ref(false)

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
  const selector = 'h1.text-base.lg\\:text-lg.text-nord6'

  const headingElement = document.querySelector(selector)

  return headingElement?.textContent?.trim().split(' ')[0].toLowerCase() || ''
}

/**
 * 获取页面中的磁链列表
 */
function getTorrentList() {
  const table = document.querySelector('div[x-show="currentTab === \'magnets\'"] table') // querySelector 返回匹配指定选择器的文档中的第一个元素。

  if (!table) {
    console.warn('未找到表格')
    return []
  }

  const rows = table.querySelectorAll('tbody tr')

  rows.forEach((row) => {
    const cells = row.querySelectorAll('td')

    // 确保至少有三列
    if (cells.length < 3) {
      console.warn('表格行缺少列，跳过')
      return
    }

    // 获取第一列 a 标签  进行更安全的访问
    const firstCellLink = cells[0].querySelector('a')

    // 使用可选链操作符 ?.  进行更安全的属性访问
    const url = firstCellLink?.href || ''

    const name = firstCellLink?.textContent?.trim() || ''

    const sizeText = cells[1]?.textContent?.trim() || ''

    const sizeMatch = sizeText.match(/(\d+(\.\d+)?)\s*(GB|MB)/i)

    let size = 0

    if (sizeMatch) {
      const value = Number.parseFloat(sizeMatch[1])

      const unit = sizeMatch[3]?.toUpperCase() // 获取单位并转换为大写

      size = unit === 'MB' ? value / 1024 : value

      // 保留两位小数
      size = Math.round(size * 100) / 100
    }

    const time = cells[2]?.textContent?.trim() || ''

    const tagArray = getFileTagIconArray(name)

    //  检查是否存在中文字幕
    const spanElements = cells[0].querySelectorAll('span')

    /**
     *  是否存在中文字幕
     */
    let hasChineseSubtitle = false

    spanElements.forEach((span) => {
      if (span.textContent?.trim() === '字幕') {
        hasChineseSubtitle = true

        //  判断 tagArray 中是否存在 字幕
        if (!tagArray.includes('tag-ziMu')) {
          tagArray.push('tag-ziMu')
        }
      }
    })

    // 判断是否存在中文字幕
    if (hasChineseSubtitle && !isVideoHaveChineseTorrent.value) {
      isVideoHaveChineseTorrent.value = true
    }

    const torrentListItem: TorrentType = {
      url,
      name,
      size,
      time,
      tags: tagArray,
    }

    torrentList.value.push(torrentListItem)
  })

  //  添加挂载点
  const targetElement = document.querySelector('.grid.grid-cols-2.md\\:grid-cols-3.xl\\:grid-cols-4.gap-5')

  if (targetElement) {
    targetElement.insertAdjacentHTML('afterend', '<div id="TorrentList"></div>')
    targetElement.insertAdjacentHTML('afterend', '<div id="OnlinePlay"></div>')

    isShowOnlinePlay.value = true
    isShowTorrentList.value = true
  }
}

function main() {
  if (!folderStore.folderFileList.length) {
    return
  }

  // 获取视频名称 (小写，去除空格)
  pageVideoName.value = getPageVideoName()

  if (!pageVideoName.value) {
    return
  }

  // 当前视频名称已入库的视频列表
  const matchedVideoList = folderStore.folderFileList.filter(item =>
    item.cleanName.includes(pageVideoName.value),
  )

  /**
   *  emby中是否有中文磁链
   */
  const isEmbyHaveChineseTorrent = matchedVideoList.some(item => item.hasChineseSubtitles)

  const highlightElement = document.querySelector('.relative.-mx-4.sm\\:m-0.-mt-6')?.parentNode as HTMLElement

  if (matchedVideoList.length) {
    highlightElement?.classList.add('is-highlight')

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
  }
}

onMounted(() => {
  getTorrentList()

  main()
})
</script>

<template>

  <!-- 挂载到右侧 -->
  <div
    class="sm-50 fixed left-2 top-60 w-30 lg:w-70 md:w-50"
  >
    <!-- emby播放按钮 -->
    <EmbyPlayButton
      v-if="isShowEmbyButton"
      :video-name="pageVideoName"
    />

    <!-- 提示更新中文磁链按钮 -->
    <PendingUpdateChineseButton
      v-if="isShowPendingUpdateChineseButton"
      class="w-full"
    />

    <!-- emby已入库列表 -->
    <div
      v-if="embyCatalogedList.length"
      class="w-full rounded-2 bg-[#FF8400] p-2"
    >
      <EmbyCatalogedList
        v-for="(item, index) in embyCatalogedList"
        :key="index"
        :video="item"
      />
    </div>
  </div>

  <!-- 在线播放 -->
  <OnlinePlay
    v-if="isShowOnlinePlay"
    to="#OnlinePlay"
    :video-name="pageVideoName"
  />

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
