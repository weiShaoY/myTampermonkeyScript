<!------------------------------------  跳转在线播放   ------------------------------------------------->
<script setup lang="ts">
import { useOnlinePlayStore } from '@/stores'

import Site from './site.vue'

import { libSites } from './utils/libSites'

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

const props = defineProps<PropsType>()

// 导入 GM_getValue 和 GM_setValue 方法
const onlinePlayStore = useOnlinePlayStore()

/**
 *   从 libSites 中找到匹配当前 URL 的图书馆站点
 */
const libItem = libSites.find(item => item.href.test(window.location.href))

const code = ref ('')

function main() {
  if (!libItem) {
    window.$notification.error('脚本挂载错误')
    return // 终止函数执行
  }

  code.value = props.videoName

  // 执行对于当前图书馆站的特殊适配，如单独的样式改动
  libItem.method() // 调用 libItem 中定义的适配方法
}

main()
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
        class="w-full flex flex-wrap gap-3 rounded-2 bg-[#2a2b2f] p-3"
      >
        <template
          v-for="siteItem in onlinePlayStore.onlinePlay.siteList"
        >
          <Site
            v-if="siteItem.isVisible && (libItem?.name !== siteItem.name)"
            :key="siteItem.name"
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
