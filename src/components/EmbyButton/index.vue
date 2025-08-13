<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import type { CSSProperties } from 'vue'

import { useEmbyStore } from '@/stores'

type PropsType = {

  /**
   *   视频
   */
  videoName: string

  /**
   *   按钮宽度
   */
  width?: string | number

  /**
   *   按钮高度
   */
  height?: string | number

  /**
   *   圆角
   */
  radius?: string | number

  /**
   *   按钮类名
   */
  class?: string

  /**
   *   按钮样式
   */
  style?: CSSProperties

  /**
   *   是否包裹
   */
  isWrap?: boolean
}

const props = withDefaults(defineProps<PropsType>(), {
  width: '100%',
  height: '100%',
  radius: 10,
  class: '',
  isWrap: false,
})

const embyStore = useEmbyStore()

function embyBtnHandler(event: MouseEvent) {
  event.preventDefault()

  embyStore.embySearch(props.videoName)
}
</script>

<template>

  <div
    class="mx-auto mb-5 h-20 w-20 flex cursor-pointer items-center justify-center border-2 border-[#52B54B] rounded-lg border-solid transition-colors hover:bg-[#52B54B] hover:bg-opacity-10"
    @click="embyBtnHandler"
  >
    <SvgIcon
      icon="emby"
      :size="50"
    />
  </div>
</template>

<style lang="less" scoped></style>
