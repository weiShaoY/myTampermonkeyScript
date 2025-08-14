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
   *   是否列表页使用
   */
  isListPage?: boolean
}

const props = withDefaults(defineProps<PropsType>(), {
  width: '100%',
  height: '100%',
  radius: 10,
  class: '',
  isListPage: false,
})

const embyStore = useEmbyStore()

function embyBtnHandler(event: MouseEvent) {
  event.preventDefault()

  embyStore.embySearch(props.videoName)
}
</script>

<template>

  <div
    v-if="isListPage"
    class="mx-auto mb-5 h-20 w-20 flex cursor-pointer items-center justify-center border-2 border-[#52B54B] rounded-lg border-solid transition-colors hover:bg-[#52B54B] hover:bg-opacity-10"
    @click="embyBtnHandler"
  >
    <SvgIcon
      icon="emby"
      :size="50"
    />
  </div>

  <div
    v-else
    class="group relative z-1 h-25 w-40 flex translate-x-0 cursor-pointer items-center justify-between overflow-hidden border-3 border-[#52B54B] bg-transparent p-x-1 text-lg font-bold before:absolute before:left-0 before:top-0 before:z-[-1] before:h-full before:w-full before:translate-x-[-100%] !bg-white before:bg-[#52B54B] !text-[#52B54B] before:transition-all-600 before:content-[''] hover:before:translate-x-0 !hover:text-white"
    :class="props.class"
    :style="{
      borderRadius: `${radius}px`,
      height: typeof height === 'number' ? `${height}px` : `${height}`,
      width: typeof width === 'number' ? `${width}px` : `${width}`,
      ...style,
    }"
    @click="embyBtnHandler"
  >
    <span>
      {{ videoName }}
    </span>

    <div
      class="m-x-5"
    >
      <SvgIcon
        icon="emby"
        :size="30"
        class="group-hover:hidden"
      />

      <SvgIcon
        icon="embyHover"
        :size="30"
        class="hidden group-hover:block"
      />

    </div>
  </div>
</template>

<style lang="less" scoped></style>
