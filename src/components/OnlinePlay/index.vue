<!------------------------------------  跳转在线播放   ------------------------------------------------->
<script setup lang="ts">

import { siteList } from './data'

import Site from './site.vue'

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

defineProps<PropsType>()

</script>

<template>
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
</template>

<style lang="less" scoped>

</style>
