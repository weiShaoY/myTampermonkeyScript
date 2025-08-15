<!-- eslint-disable vue/require-prop-comment -->
<script setup lang="ts">
import type { OnlinePlayType } from '@/types/onlinePlay'

import { openLink } from '@/utils'

import { handleFetch, handleFetchJavBle } from './utils/xhr'

type Props = {

  /** 站点项 */
  siteItem: OnlinePlayType.SiteItem

  /** 视频 CODE */
  code: string
}

const props = defineProps<Props>()

/**
 * 计算格式化后的 CODE
 */
const formatCode = computed(() => {
  return props.siteItem.codeFormater?.(props.code) ?? props.code
})

/**
 * 计算替换了占位符后的链接
 */
const link = computed(() => {
  return props.siteItem.url.replace('{{code}}', formatCode.value)
})

/**
 * 站点状态
 */
const status = ref<OnlinePlayType.SiteStatus>({
  isSuccess: 'pending',
  hasSubtitle: false,
  hasLeakage: false,
  targetLink: '',
})

/**
 * 计算最终的链接
 */
const finalLink = computed(() => {
  return status.value.targetLink || link.value
})

/**
 * 获取站点数据
 */
async function fetchSiteData() {
  try {
    const fetchMethod = props.siteItem.name === 'Jable' ? handleFetchJavBle : handleFetch

    const response = await fetchMethod(props.siteItem as any, link.value, formatCode.value)

    status.value = {
      isSuccess: response.isSuccess ? 'fulfilled' : 'rejected',
      hasSubtitle: response.hasSubtitle,
      hasLeakage: response.hasLeakage,
      targetLink: response.targetLink,
    }
  }
  catch (error) {
    console.error('获取站点数据失败:', error)
    status.value.isSuccess = 'rejected'
  }
}

/**
 * 背景颜色
 */
const bgColor = computed(() => {
  const colorMap = {
    pending: '',
    fulfilled: '#67c23a',
    rejected: '#FF1166',
  }

  return colorMap[status.value.isSuccess]
})

/**
 * 跳转到目标链接
 */
function goToTarget() {
  openLink(finalLink.value)
}

/**
 * 跳转到站点主页
 */
function openSiteHomepage() {
  const fullUrl = `https://${props.siteItem.hostname}`

  openLink(fullUrl)
}

// 组件挂载时获取数据
onMounted(fetchSiteData)
</script>

<template>
  <div
    class="group relative flex cursor-pointer items-center justify-center rounded-2"
  >
    <div
      class="h-14 w-auto flex items-center gap-1 border rounded-2 bg-white p-x-1"
      :style="{ border: `4px solid ${bgColor}` }"
      @click="goToTarget"
    >
      <!-- 字幕标签 -->
      <SvgIcon
        icon="tag-ziMu"
        class="h-6 w-6"
      />

      <!-- 无码标签 -->
      <SvgIcon
        icon="tag-wuMa"
        class="h-6 w-6"
      />

      <!-- 站点信息 -->
      <div
        class="m-x-2 w-auto text-dark font-semibold"
      >
        <SvgIcon
          v-if="siteItem.icon"
          :icon="siteItem.icon"
          class="!h-10 !min-h-10 !min-w-10 !w-10"
        />

        <span
          v-else
        >
          {{ siteItem.name }}
        </span>
      </div>
    </div>

    <!-- 悬浮提示 -->
    <span
      class="absolute left-1/2 z-20 scale-0 transform rounded-lg p-x-4 p-y-2 text-sm text-white font-bold shadow-lg transition-transform duration-300 ease-in-out -top-9 -translate-x-1/2 group-hover:scale-100"
      :style="{ backgroundColor: bgColor }"
      @click="openSiteHomepage"
    >
      {{ siteItem.name }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
</style>
