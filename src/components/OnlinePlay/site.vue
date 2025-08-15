<!-- eslint-disable vue/require-prop-comment -->
<script setup lang="ts">

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
 * 计算格式化后的 番号名
 */
const formatCode = computed(() => {
  return props.siteItem.codeFormater?.(props.code) ?? props.code
})

/**
 * 计算站点视频搜索链接
 */
const siteVideoSearchLink = computed(() => {
  return props.siteItem.searchUrl.replace('{{code}}', formatCode.value)
})

/**
 * 站点状态
 */
const status = ref<OnlinePlayType.SiteRequestStatus>({
  requestStatus: 'pending',
  hasSubtitle: false,
  hasLeakage: false,
  targetLink: '',
})

/**
 * 计算最终的链接
 */
const finalLink = computed(() => {
  return status.value.targetLink || siteVideoSearchLink.value
})

/**
 * 获取站点数据
 */
async function fetchSiteData() {
  try {
    const fetchMethod = props.siteItem.name === 'Jable' ? handleFetchJavBle : handleFetch

    const response = await fetchMethod(props.siteItem as any, siteVideoSearchLink.value, formatCode.value)

    status.value = {
      requestStatus: response.requestStatus ? 'fulfilled' : 'rejected',
      hasSubtitle: response.hasSubtitle,
      hasLeakage: response.hasLeakage,
      targetLink: response.targetLink,
    }
  }
  catch (error) {
    console.error('获取站点数据失败:', error)
    status.value.requestStatus = 'rejected'
  }
}

/**
 * 状态颜色
 */
const statusColor = computed(() => {
  const colorMap = {
    pending: '#F9A925',
    fulfilled: '#67c23a',
    rejected: '#FF1166',
  }

  return colorMap[status.value.requestStatus]
})

function openSite() {
  // if (status.value.requestStatus === 'fulfilled') {
  //   openLink(finalLink.value)
  // }
  // else {
  //   openLink(`https://${props.siteItem.hostname}`)
  // }
  openLink(finalLink.value)
}

// 组件挂载时获取数据
onMounted(
  fetchSiteData,
)
</script>

<template>

  <div
    class="aspect-square flex flex-col cursor-pointer justify-between rounded-2 bg-white p-1 transition-all duration-300 !w-30 hover:scale-105"
    :style="{ border: `4px solid ${statusColor}` }"
    @click="openSite"
  >
    <div
      class="flex flex-1 items-center justify-center gap-3"
    >
      <SvgIcon
        v-if="siteItem.icon"
        :icon="siteItem.icon"
        :size="55"
      />

      <div
        class="flex flex-col gap-2"
      >
        <SvgIcon
          icon="tag-ziMu"
          :size="30"
        />

        <SvgIcon
          icon="tag-wuMa"
          :size="30"
        />

      </div>
    </div>

    <div
      class="w-full flex justify-center text-sm font-bold"
    >
      {{ siteItem.name }}
    </div>
  </div>

</template>

<style lang="scss" scoped>
</style>
