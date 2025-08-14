import { defineStore } from 'pinia'

import { ref } from 'vue'

// import { config } from '@/config'

const useFolderStore = defineStore(
  'folder',
  () => {
    const folder = ref<FolderType>({
      /**
       * 选择的盘符（如 C、D、E、F）
       */
      driveLetter: 'Z',

      /**
       * 是否启用定时提示读取文件夹
       */
      isEnableReminder: true,

      /**
       * 提示读取文件夹的时间间隔（小时）
       */
      reminderInterval: 168,

      /**
       * 定时器检查读取提示的时间间隔（小时）
       */
      checkInterval: 1,

    })

    /**
     *  文件夹名称
     */
    const folderName = ref<string>('')

    /**
     *  文件夹 读取时间
     */
    const folderReadTime = ref<number>(0)

    /**
     *  文件夹 文件列表
     */
    const folderFileList = ref<VideoType.VideoFile[]>([])

    /**
     *  文件夹内文件名重复的文件列表。
     */
    const folderDuplicateNameFileList = ref<VideoType.VideoFile[]>([])

    /**
     *  文件夹内文件名已去重的文件列表 (每个文件名仅出现一次)。
     */
    const folderUniqueFileNameFileList = ref<string[]>([])

    /**
     *  加载Emby文件夹数据
     *  @description 加载 Emby 文件夹数据，并将其存储到 Pinia store 中
     */
    function loadEmbyFolderData() {
      const embyFolder = JSON.parse(GM_getValue('EmbyFolder', '{}'))

      if (embyFolder.folderName && embyFolder.folderReadTime && embyFolder.folderFileList) {
        folderName.value = embyFolder.folderName

        folderReadTime.value = embyFolder.folderReadTime

        folderFileList.value = embyFolder.folderFileList

        folderDuplicateNameFileList.value = getFolderDuplicateNameFileList(folderFileList.value, 'processedFileName')

        folderUniqueFileNameFileList.value = getFolderUniqueFileNameFileList(folderFileList.value, 'processedFileName')
      }

      else {
        window.$notification.error('读取Emby文件夹错误, 请重新读取Emby文件夹')
      }
    }

    /**
     *  保存文件夹文件列表
     *  @param folderName_ - 文件夹名
     *  @param videoFileSet - 视频文件集合
     *  @description 保存 Emby 文件夹数据，并将其存储到 GM_setValue 和 Pinia store 中
     */
    function saveEmbyFolderData(folderName_: string, videoFileSet: Set<VideoType.VideoFile>) {
      folderName.value = folderName_

      folderFileList.value = Array.from(videoFileSet)

      folderDuplicateNameFileList.value = getFolderDuplicateNameFileList(folderFileList.value, 'processedFileName')

      folderUniqueFileNameFileList.value = getFolderUniqueFileNameFileList(folderFileList.value, 'processedFileName')
      folderReadTime.value = Date.now()

      const embyFolder = {
        folderName: folderName.value,
        folderReadTime: folderReadTime.value,
        folderFileList: folderFileList.value,
      }

      GM_setValue('EmbyFolder', JSON.stringify(embyFolder))
    }

    /**
     * 获取 文件夹内文件名重复的文件列表。
     * @param  list - 要检查的列表
     * @param  property - 用于比较的属性名
     * @return 返回文件夹文件名重复的文件列表
     */
    function getFolderDuplicateNameFileList<T>(list: T[], property: keyof T): T[] {
      const propertyMap = list.reduce((acc, item) => {
        const key = item[property] as unknown as string

        acc[key] = acc[key] || []
        acc[key].push(item)
        return acc
      }, {
      } as { [key: string]: T[] })

      return Object.values(propertyMap)
        .filter(items => items.length > 1) // 过滤掉那些只有一个项的属性值
        .flat() // 展平数组，返回所有重复项
    }

    /**
     * 获取 文件夹内文件名已去重的文件列表 (每个文件名仅出现一次)。
     * @param  items - 要处理的数组
     * @param  property - 用于比较的属性名
     * @returns 返回文件夹内文件名已去重的文件列表 (每个文件名仅出现一次)。
     */
    function getFolderUniqueFileNameFileList<T>(items: T[], property: keyof T): string[] {
      const propertyMap = items.reduce((acc, item) => {
        const key = item[property] as unknown as string

        acc[key] = acc[key] || []
        acc[key].push(item)
        return acc
      }, {
      } as { [key: string]: T[] })

      return Object.keys(propertyMap).filter(key => propertyMap[key].length > 1)
    }

    return {
      /**
       * 文件夹对象。
       */
      folder,

      /**
       * 文件夹名称。
       */
      folderName,

      /**
       * 文件夹读取时间戳 (Unix 时间戳)。
       */
      folderReadTime,

      /**
       * 文件列表。
       */
      folderFileList,

      /**
       * 文件夹内文件名重复的文件列表。
       */
      folderDuplicateNameFileList,

      /**
       * 文件夹内文件名已去重的文件列表 (每个文件名仅出现一次)。
       */
      folderUniqueFileNameFileList,

      /**
       *  加载Emby文件夹数据
       *  @description 加载 Emby 文件夹数据，并将其存储到 Pinia store 中
       */
      loadEmbyFolderData,

      /**
       * 保存文件夹文件列表的函数。
       * @param folderName_ - 文件夹名
       * @param videoFileSet - 视频文件集合
       * @description 保存 Emby 文件夹数据，并将其存储到 GM_setValue 和 Pinia store 中
       */
      saveEmbyFolderData,

    }
  },

)

export default useFolderStore
