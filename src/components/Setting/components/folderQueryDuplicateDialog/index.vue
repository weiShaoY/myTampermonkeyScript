<!------------------------------------  文件夹查询重复弹窗  ------------------------------------------------->
<script lang="ts" setup>
import { useFolderStore } from '@/stores'

import { formatTimestampToChineseDate } from '@/utils'

const folderStore = useFolderStore()

const visible = defineModel<boolean>({
  required: true,
})

/**
 *  是否显示 文件夹内文件名已去重的文件列表 (每个文件名仅出现一次)。
 */
const isShowFolderUniqueFileNameFileList = ref(false)

/**
 *  计算超时时间 *时*分*秒未重新读取文件夹
 */
/**
 * 获取文件夹读取超时提示文本
 * @return  超时提示文本
 */
const getFolderReadTimeoutText = computed(() => {
  const millisecondsInHour = 3600000 // 1 小时 = 3,600,000 毫秒

  const lastReadTime = folderStore.folderReadTime

  if (!lastReadTime) {
    return ''
  }

  const currentTimestamp = Date.now()

  const timeDifference = currentTimestamp - lastReadTime

  if (timeDifference <= 0) {
    return ''
  }

  const hoursElapsed = Math.floor(timeDifference / millisecondsInHour)

  const minutesElapsed = Math.floor((timeDifference % millisecondsInHour) / 60000)

  return `${hoursElapsed} 时 ${minutesElapsed} 分`
})

watchEffect(() => {
  console.log(isShowFolderUniqueFileNameFileList.value)
})
console.log('%c Line:52 🍏 folderStore.folderUniqueFileNameFileList', 'color:#b03734', folderStore.folderUniqueFileNameFileList)

console.log('%c Line:54 🍌 folderStore.folderDuplicateNameFileList', 'color:#93c0a4', folderStore.folderDuplicateNameFileList)
</script>

<template>

  <el-dialog
    v-model="visible"
    title="添加"
    width="50%"
    :show-close="false"
  >
    <template
      #title
    >
      <div
        class="w-full flex items-center justify-between"
      >
        <div
          :class="!isShowFolderUniqueFileNameFileList ? 'border-b-2 border-primary' : ''"
          class="flex cursor-pointer items-center pb-1 font-bold"
          @click="isShowFolderUniqueFileNameFileList = false"
        >
          <span>
            重复
          </span>

          <span
            class="m-x-2 text-5 color-primary"
          >
            {{ folderStore.folderDuplicateNameFileList.length }}
          </span>

          <span>
            部
          </span>
        </div>

        <!-- 切换按钮 -->
        <div
          class="aspect-video w-24 border-2 border-[#121331] rounded-xl bg-[#ebe6ef] has-[:checked]:bg-[#3a3347]"
        >
          <div
            class="h-full w-full flex items-center gap-x-1 px-1"
          >
            <div
              class="h-3 w-3 flex-shrink-0 border-2 border-[#121331] rounded-full"
            />

            <label
              for="switch"
              class="h-6 w-full cursor-pointer border-2 border-[#121331] rounded has-[:checked]:scale-x-[-1]"
            >
              <input
                id="switch"
                v-model="isShowFolderUniqueFileNameFileList"
                type="checkbox"
                class="hidden"
              >

              <div
                class="relative h-full w-full bg-[#f24c00]"
              >
                <div
                  class="relative z-20 h-0 w-0 border-l-[12px] border-r-[12px] border-t-[10px] border-l-transparent border-r-transparent border-t-[#121331]"
                >
                  <div
                    class="absolute h-0 w-0 border-l-[9px] border-r-[9px] border-t-[7.5px] border-l-transparent border-r-transparent border-t-[#e44901] -left-[9px] -top-2.5"
                  />
                </div>

                <div
                  class="absolute left-0 top-[4.5px] z-10 h-4.5 w-[12px] skew-y-[39deg] transform border-b-2 border-r-1 border-[#121331] border-solid bg-[#f24c00]"
                />

                <div
                  class="absolute left-[12px] top-[4.5px] z-10 h-4.5 w-[12.5px] skew-y-[-39deg] transform border-b-2 border-l-1 border-r-2 border-[#121331] bg-[#c44002]"
                />
              </div>
            </label>

            <div
              class="h-0.5 w-3 flex-shrink-0 rounded-full bg-[#121331]"
            />
          </div>
        </div>

        <div
          :class="isShowFolderUniqueFileNameFileList ? 'border-b-2 border-primary' : ''"
          class="flex cursor-pointer items-center pb-1 font-bold"
          @click="isShowFolderUniqueFileNameFileList = true"
        >
          <span>
            去重
          </span>

          <span
            class="m-x-2 text-5 color-primary"
          >
            {{ folderStore.folderUniqueFileNameFileList.length }}
          </span>

          <span>
            部
          </span>
        </div>

      </div>
    </template>

    <el-scrollbar
      height="60vh"
      always
    >
      <template
        v-if="!isShowFolderUniqueFileNameFileList"
      >
        <EmbyPlayButton
          v-for="(item, index) in folderStore.folderDuplicateNameFileList"
          :key="index"
          :video-name="item.cleanName"
          class="!h-15"
        />
      </template>

      <template
        v-else
      >
        <EmbyPlayButton
          v-for="(item, index) in folderStore.folderUniqueFileNameFileList"
          :key="index"
          :video-name="item"
          class="!h-15"
        />
      </template>
    </el-scrollbar>

    <template
      #footer
    >
      <div
        class="w-full flex flex-col font-bold !text-4"
      >

        <div
          class="flex items-center"
        >
          <div
            class="m-r-3 flex items-center"
          >
            <span>
              总共
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

        </div>

        <div
          v-if="getFolderReadTimeoutText"
          class="flex items-center"
        >
          <span>
            {{ getFolderReadTimeoutText }}
          </span>

          <span
            class="m-x-3"
          >
            未重新读取文件夹
          </span>
        </div>

        <div
          v-if="folderStore.folderReadTime"
          class="flex items-center gap-5"
        >

          <span>
            {{ formatTimestampToChineseDate(folderStore.folderReadTime) }}
          </span>

          <div
            class=""
          >
            <span
              class="m-x-3"
            >
              读取文件夹
            </span>

            <span
              class="m-x-2 w-30 cursor-pointer truncate border-b-2 border-primary pb-1 text-center text-6 color-primary font-bold hover:scale-105"
            >
              {{ folderStore.folderName }}
            </span>

          </div>

        </div>
      </div>

    </template>

  </el-dialog>
</template>
