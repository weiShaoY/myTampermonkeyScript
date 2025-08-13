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
    const folderFileList = ref<VideoType.Video[]>([])

    /**
     *  文件夹 文件名重复的文件列表
     */
    const duplicateFolderFileList = ref<VideoType.Video[]>([])

    /**
     *  文件夹 文件名去重后的文件列表
     */
    const uniqueFolderFileNameList = ref<string[]>([])

    /**
     *  获取文件夹文件列表
     */
    function getFolder() {
      const embyFolder = JSON.parse(GM_getValue('EmbyFolder', '{}'))

      if (embyFolder.folderName && embyFolder.folderReadTime && embyFolder.folderFileList) {
        folderName.value = embyFolder.folderName

        folderReadTime.value = embyFolder.folderReadTime

        folderFileList.value = embyFolder.folderFileList

        duplicateFolderFileList.value = getDuplicateFolderFileList(folderFileList.value, 'processedName')

        uniqueFolderFileNameList.value = getUniqueFolderFileList(folderFileList.value, 'processedName')
      }

      else {
        window.$notification.error('读取Emby文件夹错误, 请重新读取Emby文件夹')
      }
    }

    /**
     *  保存文件夹文件列表
     *  @param {string} folderName_ - 文件夹名
     *  @param {Set<VideoType.Video>} videoFileSet - 视频文件集合
     */
    function saveFolderFileList(folderName_: string, videoFileSet: Set<VideoType.Video>) {
      folderName.value = folderName_

      folderFileList.value = Array.from(videoFileSet)

      duplicateFolderFileList.value = getDuplicateFolderFileList(folderFileList.value, 'processedName')

      uniqueFolderFileNameList.value = getUniqueFolderFileList(folderFileList.value, 'processedName')

      folderReadTime.value = Date.now()

      const embyFolder = {
        folderName: folderName.value,
        folderReadTime: folderReadTime.value,
        folderFileList: folderFileList.value,
      }

      GM_setValue('EmbyFolder', JSON.stringify(embyFolder))
    }

    /**
     * 获取重复文件列表
     * @param {T[]} list - 要检查的列表
     * @param {keyof T} property - 用于比较的属性名
     * @return {T[]} - 返回重复视频的列表
     */
    function getDuplicateFolderFileList<T>(list: T[], property: keyof T): T[] {
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
     * 获取具有重复属性值的项，并返回去重后的属性值数组
     * @param {T[]} items - 要处理的数组
     * @param {keyof T} property - 用于比较的属性名
     * @returns {string[]} - 返回去重后的属性值数组
     */
    function getUniqueFolderFileList<T>(items: T[], property: keyof T): string[] {
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
      folder,

      /**
       *  文件夹 名称
       */
      folderName,

      /**
       *  文件夹 读取时间
       */
      folderReadTime,

      /**
       *  文件夹 文件列表
       */
      folderFileList,

      /**
       *  文件夹 文件名重复的文件列表
       */
      duplicateFolderFileList,

      /**
       *  文件夹 文件名去重后的文件列表
       */
      uniqueFolderFileNameList,

      /**
       *  获取文件夹
       */
      getFolder,

      /**
       *  保存文件夹文件列表
       */
      saveFolderFileList,

    }
  },

)

export default useFolderStore
