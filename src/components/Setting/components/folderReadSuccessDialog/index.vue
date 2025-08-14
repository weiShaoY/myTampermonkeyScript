<!------------------------------------  是否显示文件夹读取成功弹窗  ------------------------------------------------->
<script lang="ts" setup>

import { useFolderStore } from '@/stores'

type Props = {

  /**
   * 读取文件夹耗时
   */
  folderReadTime: string
}
defineProps<Props>()

const visible = defineModel<boolean>({
  required: true,
})

const folderStore = useFolderStore()

function openFolder() {
  // folderStore.openFolder(folderStore.folderName)
}

function handleClose() {
  window.location.reload()
}

watchEffect(() => {
  console.log('%c Line:31 🍑 visible.value', 'color:#b03734', visible.value)
})
</script>

<template>

  <el-dialog
    v-model="visible"
    width="50%"
  >
    <template
      #title
    >
      <div
        class="flex items-center font-semibold"
      >
        <span
          class=""
        >
          文件夹
        </span>

        <!-- <a-tooltip
          :content="folderStore.folderName"
          background-color="#52B44B"
        >
          <a-link
            class="m-x-2 w-30 truncate text-center font-bold !block !p-3 !text-4"
            status="success"
            @click="openFolder"
          >
            {{ folderStore.folderName }}
          </a-link>
        </a-tooltip> -->
        <el-tooltip
          :content="folderStore.folderName"
          background-color="#52B44B"
        >
          <el-link
            class="m-x-2 w-30 truncate text-center font-bold !block !p-3 !text-4"
            status="success"
            @click="openFolder"
          >
            {{ folderStore.folderName }}
          </el-link>
        </el-tooltip>

        <span
          class=""
        >
          读取成功
        </span>
      </div>
    </template>

    <div
      class="w-auto font-semibold"
    >
      <div
        class="flex items-center"
      >
        <span>
          总耗时
        </span>

        <span
          class="m-x-2 text-5 color-primary"
        >
          {{ folderReadTime }}
        </span>

        <span>
          秒
        </span>
      </div>

      <div
        class="flex items-center"
      >
        <span>
          共读取
        </span>

        <span
          class="m-x-2 text-5 color-primary"
        >
          {{ folderStore.folderFileList.length }}
        </span>

        <span>
          部
        </span>
      </div>

      <div
        class="flex items-center"
      >
        <span>
          共发现
        </span>

        <span
          class="m-x-2 text-5 color-primary"
        >
          {{ folderStore.duplicateFolderFileList.length }}
        </span>

        <span>
          部重复视频
        </span>
      </div>

      <div
        class="flex items-center"
      >
        <span>
          去重后
        </span>

        <span
          class="m-x-2 text-5 color-primary"
        >
          {{ folderStore.uniqueFolderFileNameList.length }}
        </span>

        <span>
          部
        </span>
      </div>

    </div>
  </el-dialog>
</template>

<style lang="less" scoped>

</style>
