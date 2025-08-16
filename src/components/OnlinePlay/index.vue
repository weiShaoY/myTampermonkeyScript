<!------------------------------------  跳转在线播放   ------------------------------------------------->
<script setup lang="ts">

import VideoThumbnailDialog from './components/videoThumbnailDialog/index.vue'

import { siteList } from './data'

import Site from './site.vue'

defineProps<PropsType>()

/**
 *  是否显示视频缩略图弹窗
 */
const isShowVideoThumbnailDialog = ref(false)

type PropsType = {

  /**
   *  挂载点
   */
  to: string

  /**
   *  视频名称
   */
  videoName: string
}

</script>

<template>
  <VideoThumbnailDialog
    v-model="isShowVideoThumbnailDialog"
    :video-name="videoName"
  />

  <Teleport
    :to="to"
  >
    <div
      class="flex border-gray-300 rounded-2 bg-white p-3 shadow-md ease-in-out"
      :style="{
        boxShadow: 'inset 20px 20px 8px #bebebe, inset -20px -20px 8px #EBEBEB',
      }"
    >
      <!-- 遍历站点列表，根据条件渲染 SiteBtn 组件 -->
      <div
        class="w-full flex flex-wrap justify-between gap-3 rounded-2 bg-[#2a2b2f] p-3"
      >
        <div
          class="aspect-square flex flex-col cursor-pointer justify-between rounded-2 bg-white p-1 transition-all duration-300 !w-30 hover:scale-105"
          :style="{ border: `4px solid  #EA1279` }"
          @click="isShowVideoThumbnailDialog = true"
        >
          视频缩略图
        </div>

        <template
          v-for="siteItem in siteList"
          :key="siteItem.name"
        >
          <Site
            :site-item="siteItem"
            :code="videoName"
          />
        </template>

      </div>
    </div>
  </Teleport>

  <!-- // thumbnail -->
  <!-- https://image.memojav.com/image/screenshot/${this.fanHao}.jpg -->
</template>

<style lang="less" scoped>

</style>
