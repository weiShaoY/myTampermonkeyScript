<!------------------------------------  设置按钮  ------------------------------------------------->
<script lang="ts" setup>

import { config } from '@/config'

import { useFolderStore } from '@/stores'

import { getTagIconArray, parseNfoContent } from '@/utils'

// import FolderQueryDuplicateModal from './folder_query_duplicate_modal/index.vue'

import FolderQueryDuplicateModal from './components/folderQueryDuplicateDialog/index.vue'

import FolderReadSuccessDialog from './components/folderReadSuccessDialog/index.vue'

// import FolderReminderReadModal from './folder_reminder_read_modal/index.vue'

// import SettingModal from './setting_modal/index.vue'

const folderStore = useFolderStore()

/**
 *  是否显示设置弹窗
 */
const isShowSettingModal = ref(false)

/**
 *  是否显示查重弹窗
 */
const isShowQueryDuplicateModal = ref(false)

/**
 *  是否显示文件夹读取成功弹窗
 */
const isShowFolderReadSuccessDialog = ref(false)

/**
 *  读取文件夹耗时
 */
const folderReadTime = ref('')

/**
 *  全局的加载状态
 */
const isLoading = ref(false)

// # ///////////////////////////////////////////////////////////////////////////////////////

/**
 *  表示文件数据的类型
 */
type FileData = {

  /**
   *  文件的句柄，用于访问文件内容
   */
  fileHandle: FileSystemFileHandle

  /**
   *  文件所在的目录名数组，包含层级关系
   */
  directoryPath: string[]

  /**
   *  父目录的句柄，用于访问父目录的内容
   */
  parentDirectoryHandle: FileSystemDirectoryHandle

  /**
   *  nfo 文件内容
   */
  nfoContent: string

}

/**
 * 视频文件集
 */
const videoFileSet: Set<VideoType.Video> = new Set([])

/**
 * 递归获取目录下的所有文件
 * @param  directoryHandle - 当前目录句柄
 * @param  directoryPath - 目录名数组
 * @returns {AsyncGenerator<FileData>} 异步生成器，生成每个文件的数据
 */
async function* getFiles(
  directoryHandle: any,
  directoryPath: string[] = [],
): AsyncGenerator<FileData> {
  for await (const entry of directoryHandle.entries()) {
    const [name, handle] = entry

    try {
      //   判断当前条目是否为文件，并且文件扩展名是否在 config.video.extensionArray 中
      if (handle.kind === 'file' && config.video.extensionArray.some(ext => name.endsWith(`.${ext}`))) {
        let nfoContent = ''

        // 尝试查找同级目录下的同名 .nfo 文件
        const baseName = name.substring(0, name.lastIndexOf('.'))

        const nfoHandle = await directoryHandle.getFileHandle(`${baseName}.nfo`, {
          create: false,
        }).catch(() => null)

        if (nfoHandle) {
          const file = await nfoHandle.getFile()

          nfoContent = await file.text()
        }

        // 生成一个包含文件数据的对象
        yield {
          fileHandle: handle,
          directoryPath: [...directoryPath],
          parentDirectoryHandle: directoryHandle,
          nfoContent,
        }
      }

      // 如果当前条目为目录，递归调用 getFiles 函数获取目录下的所有文件
      else if (handle.kind === 'directory') {
        yield* getFiles(handle, [...directoryPath, name])
      }
    }
    catch (e) {
      console.error(e)
    }
  }
}

/**
 *  主按钮点击事件
 */
async function mainBtnHandler() {
  // 清空存储视频文件信息的 Set
  videoFileSet.clear()

  try {
    // 使用 showDirectoryPicker API 打开目录选择器，让用户选择一个目录
    const directoryHandle: FileSystemDirectoryHandle = await (
      window as any
    ).showDirectoryPicker()

    // 如果用户没有选择目录，显示错误通知并退出函数
    if (!directoryHandle) {
      window.$notification.error({
        title: `请选择一个文件夹`,
        duration: 300000,
      })
      return
    }

    isLoading.value = true

    /**
     *  开始时间
     */
    const startTime = Date.now()

    // 使用 for-await-of 语法异步遍历用户选择的目录中的所有文件
    for await (const fileData of getFiles(directoryHandle, [
      directoryHandle.name,
    ])) {
      /**
       *  通过句柄获取文件的 File 对象
       */
      const file = await fileData.fileHandle.getFile()

      /**
       *  解析后的Nfo文件内容
       */
      const nfoContent = parseNfoContent(fileData.nfoContent)

      // 创建一个包含视频信息的对象
      const item: VideoType.Video = {

        size: `${(file.size / (1024 ** 3)).toFixed(2)} GB`,

        baseName: file.name.substring(0, file.name.lastIndexOf('.')),

        fullName: file.name,

        processedName:
          file.name.substring(0, file.name.lastIndexOf('.'))
            .toLowerCase()
            .replace(config.video.tagRegex, ''),

        extensionName: file.name.replace(/^.*\./, ''),

        directoryPath: [...fileData.directoryPath, file.name],

        tagArray: getTagIconArray(file.name.substring(0, file.name.lastIndexOf('.'))),

        resolution: nfoContent.resolution || '',

        isChinese: file.name.includes('-c') || file.name.includes('-C') || file.name.includes('_ch'),
      }

      // 将该视频信息对象添加到 Set 中
      videoFileSet.add(item)
    }

    // 将 Set 中的视频文件信息存储到本地
    folderStore.saveEmbyFolderData(directoryHandle.name, videoFileSet)

    console.log('%c Line:211 🥒 folderStore.folderFileList', 'color:#465975', folderStore.folderFileList)

    folderReadTime.value = ((Date.now() - startTime) / 1000).toFixed(2) // 秒

    isLoading.value = false

    isShowFolderReadSuccessDialog.value = true
  }
  catch (error) {
    console.error('错误:', error)
  }
  finally {
    isLoading.value = false
  }
}

function openEmby(event: MouseEvent) {
  event.stopPropagation()

  // siteStore.openEmby()
}
</script>

<template>
  <!-- 文件夹提醒读取弹窗 -->
  <!-- <FolderReminderReadModal /> -->

  <!-- 设置弹窗 -->
  <!-- <SettingModal
    v-if="isShowSettingModal"
    v-model="isShowSettingModal"
  /> -->

  <!-- 文件夹读取成功弹窗 -->
  <FolderReadSuccessDialog
    v-if="isShowFolderReadSuccessDialog"
    v-model="isShowFolderReadSuccessDialog"
    :folder-read-time="folderReadTime"
  />

  <!-- 文件夹查询重复弹窗 -->
  <FolderQueryDuplicateModal
    v-if="isShowQueryDuplicateModal"
    v-model="isShowQueryDuplicateModal"
  />

  <div
    class="group fixed left-2 top-30 inline-flex overflow-visible border-2 rounded-full transition-all duration-300 !z-1000000000000"
  >
    <!-- 主按钮 -->
    <button
      class="group relative cursor-pointer overflow-hidden border border-green-500/20 rounded-full from-black/60 to-black/40 bg-gradient-to-tr p-5 shadow-lg backdrop-blur-lg transition-all duration-300 ease-out active:rotate-0 hover:rotate-2 active:scale-95 hover:scale-110 hover:border-green-500/50 hover:from-green-500/10 hover:to-black/40 hover:bg-gradient-to-tr hover:shadow-2xl hover:shadow-green-500/30"
    >
      <div
        class="absolute inset-0 from-transparent via-green-400/20 to-transparent bg-gradient-to-r transition-transform duration-700 ease-out -translate-x-full group-hover:translate-x-full"
      />

      <div
        class="relative z-10"
      >

        <SvgIcon
          v-if="!isLoading"
          icon="emby"
          :size="30"
        />

        <SvgIcon
          v-else
          icon="emby"
          :size="30"
          class="!animate-spin"
          style="--animate-duration: 3s;"
        />
      </div>
    </button>

    <!-- 悬浮层 -->
    <div
      class="invisible absolute top-[-120%] z-1000 scale-90 rounded-lg bg-white p-x-4 p-y-4 opacity-0 shadow-xl duration-1000 ease-in-out group-hover:visible group-hover:scale-100 group-hover:opacity-100"
    >
      <div
        class="flex gap-3"
      >
        <!-- 文件夹 -->
        <div
          class="h-12 flex items-center justify-center gap-2 rounded-full bg-gray-200 p-3 shadow-lg duration-600 hover:scale-120 hover:cursor-pointer"
          @click="($event) => {
            $event.stopPropagation()
            mainBtnHandler()
          }"
        >

          <SvgIcon
            icon="folder"
            class="h-full w-full"
          />

          <span
            class="whitespace-nowrap color-[#1DB0E7] font-bold duration-600"
          >
            文件夹
          </span>
        </div>

        <div
          class="h-12 flex items-center justify-center gap-2 rounded-full bg-gray-200 p-3 shadow-lg duration-600 hover:scale-120 hover:cursor-pointer"
          @click="($event) => {
            $event.stopPropagation()
            isShowQueryDuplicateModal = true
          }"
        >

          <SvgIcon
            icon="queryDuplicate"
            class="h-full w-full"
          />

          <span
            class="whitespace-nowrap color-[#FF6A07] font-bold duration-600"
          >
            查重
          </span>
        </div>

        <div
          class="h-12 flex items-center justify-center gap-2 rounded-full bg-gray-200 p-3 shadow-lg duration-600 hover:scale-120 hover:cursor-pointer"
          @click="($event) => {
            $event.stopPropagation()
            isShowSettingModal = true
          }"
        >

          <SvgIcon
            icon="setting"
            class="h-full w-full"
          />

          <span
            class="whitespace-nowrap color-[#4F6171] font-bold duration-600"
          >
            设置
          </span>
        </div>

        <div
          class="h-12 flex items-center justify-center gap-2 rounded-full bg-gray-200 p-3 shadow-lg duration-600 hover:scale-120 hover:cursor-pointer"
          @click="openEmby"
        >

          <SvgIcon
            icon="logo"
            class="h-full w-full"
          />

          <span
            class="whitespace-nowrap color-[#52B44B] font-bold duration-600"
          >
            Emby
          </span>
        </div>

      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>

</style>
