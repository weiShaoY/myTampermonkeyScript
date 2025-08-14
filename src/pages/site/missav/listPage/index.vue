<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { useFolderStore } from '@/stores'

import { addClassAndUpdateList, addClassIfNotExists } from '@/utils'

const folderStore = useFolderStore()

/**
 *  已入库的视频
 */
const addedToInventoryBtnList = ref<VideoType.Video[]>([])

/**
 *  在Emby打开按钮
 */
const embyBtnList = ref<string[]>([])

/**
 *  更新中文磁链按钮
 */
const updateChineseBtnList = ref<string[]>([])

function main() {
  if (!folderStore.folderFileList.length) {
    return
  }

  const itemList = document.querySelectorAll('div.thumbnail.group')

  console.log('%c Line:31 🍐', 'color:#fca650 itemList', itemList)
  itemList.forEach((item) => {
    //  去除行首空格
    const linkElement = item.querySelector('a.text-secondary')

    if (linkElement) {
      linkElement.textContent = (linkElement.textContent || '').trimStart()
    }

    /**
     *  获取视频名称 (小写，去除空格)
     */
    const itemVideoName = item
      .querySelector('a.text-secondary') // 找到 class 为 text-secondary 的 <a> 元素
      ?.textContent
      ?.trim()
      .split(' ')[0] // 获取 <a> 元素的文本内容
      .toLowerCase() || ''

    console.log('%c Line:42 🌭 itemVideoName', 'color:#fca650', itemVideoName)

    if (!itemVideoName) {
      return
    }

    const boxElement = item

    /**
     * 当前视频名称已入库的视频列表
     */
    const matchedVideoList = folderStore.folderFileList.filter(sub => sub.processedName.includes(itemVideoName))

    if (matchedVideoList.length) {
      //  添加高亮
      boxElement?.classList.add('is-highlight')

      // 添加 Emby 按钮的类名并更新列表
      addClassIfNotExists(boxElement, `emby_btn_${itemVideoName}`, embyBtnList, itemVideoName)

      /**
       *  页面列表当前视频是否含中文磁链
       */
      const isItemHaveChineseTorrent = !!item.querySelector('.is-warning')

      matchedVideoList.forEach((video: VideoType.Video) => {
        // 添加已入库视频按钮的类名并更新列表
        addClassAndUpdateList(boxElement, `added_to_emby_btn_${video.baseName}`, addedToInventoryBtnList, video)

        if (!video.isChinese && isItemHaveChineseTorrent) {
          // 添加更新中文磁链按钮的类名并更新列表
          addClassIfNotExists(boxElement, `update_chinese_btn_${itemVideoName}`, updateChineseBtnList, itemVideoName)
        }
      })
    }
  })
}

onMounted(() => {
  main()
})
</script>

<template>

  <!-- 在Emby打开按钮 -->
  <template
    v-for="videoName in embyBtnList"
    :key="videoName"
  >

    <Teleport
      :to="`.emby_btn_${videoName}`"
    >
      <EmbyPlayButton
        :video-name="videoName"
      />
    </Teleport>
  </template>

  <!-- 可更新中文磁链按钮 -->
  <template
    v-for="videoName in updateChineseBtnList"
    :key="videoName"
  >
    <Teleport
      :to="`.update_chinese_btn_${videoName}`"
    >
      <PendingUpdateChineseButton
        :radius="0"
      />
    </Teleport>
  </template>

  <!-- 已入库的视频 -->
  <template
    v-for="item in addedToInventoryBtnList"
    :key="item.videoName"
  >
    <Teleport
      :to="`.added_to_emby_btn_${item.baseName}`"
    >
      <EmbyCatalogedList
        :video="item"
      />
    </Teleport>
  </template>
</template>

<style lang="less" scoped></style>
