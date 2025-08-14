import { defineStore } from 'pinia'

import { ref } from 'vue'

import { openLink } from '@/utils'

const useEmbyStore = defineStore(
  'emby',
  () => {
    const emby = ref({
      /**
       * Emby 服务器的 URL。
       */
      url: 'http://192.168.0.5',

      /**
       * Emby 服务器的端口号。
       */
      port: '8096',

      /**
       * Emby 服务器用户 ID。
       */
      userId: '2409e0a7f21047ba9c74b41be14c6729',

      /**
       * 发起请求的设备名称。
       */
      deviceName: 'Chrome macOS',

      /**
       * 发起请求设备的 ID。
       */
      deviceId: 'a6f53c21-ff50-4ccd-a6ba-94f5f4830e87',

      /**
       * Emby 客户端的版本号。
       */
      clientVersion: '4.8.11.0',

      /**
       * 用户的认证令牌。
       */
      token: '8713e19e82f64fd3a50207b0321f3538',

      /**
       * Emby 服务器使用的语言代码。
       */
      language: 'zh-cn',

      /**
       * 发送到 Emby 服务器的查询字符串参数。
       */
      queryParams: {
        SearchTerm: '',
        Recursive: true,
        Fields: 'PrimaryImageAspectRatio,PremiereDate,ProductionYear',
        EnableUserData: false,
        GroupProgramsBySeries: true,
        Limit: 30,
      },
    })

    /**
     * 构建 Emby 请求 URL
     * @param  videoName - 视频名称
     * @returns   完整的请求 URL
     */
    function buildRequestUrl(videoName: string) {
      const queryParams = {
        'SearchTerm': videoName,
        'Recursive': true,
        'Fields': 'PrimaryImageAspectRatio,PremiereDate,ProductionYear',
        'EnableUserData': false,
        'GroupProgramsBySeries': true,
        'Limit': 30,

        // 添加 Emby 特定的查询参数
        'X-Emby-Client': 'Emby Web',
        'X-Emby-Device-Name': emby.value.deviceName,
        'X-Emby-Device-Id': emby.value.deviceId,
        'X-Emby-Client-Version': emby.value.clientVersion,
        'X-Emby-Token': emby.value.token,
        'X-Emby-Language': emby.value.language,
      }

      const queryString = Object.entries(queryParams)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`,
        )
        .join('&')

      return `${emby.value.url}:${emby.value.port}/emby/Users/${emby.value.userId}/Items?${queryString}`
    }

    /**
     *  搜索 Emby 服务器上的视频。
     *  @param  videoName - 视频名称
     */
    function embySearch(videoName: string) {
    /**
     *  设置超时时间为 2 秒
     */
      const timeoutDuration = 2000

      const timeoutId = setTimeout(() => {
        window.$notification.error({
          title: '请求超时, 请检查 Emby 服务器',
          duration: 5000,
        })
      }, timeoutDuration)

      GM_xmlhttpRequest({
        method: 'GET',
        url: buildRequestUrl(videoName),
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'zh,zh-CN;q=0.9,ja;q=0.8',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
        },
        onload: (response: any) => {
          // 请求成功，清除超时计时器
          clearTimeout(timeoutId)

          if (response.status >= 200 && response.status < 300) {
            GM_setValue('EMBY-BTN-VALUE', '')

            try {
            // 将 JSON 字符串转换为 JSON 对象
              const result = JSON.parse(response.responseText)

              if (result.Items.length > 0) {
                const id = result.Items[0].Id

                const serverId = result.Items[0].ServerId

                const url = `${emby.value.url}:${emby.value.port}/web/index.html#!/item?id=${id}&serverId=${serverId}`

                openLink(url)
              }
              else {
                window.$messageBox.confirm(`是否打开 Emby 首页?`, 'Emby中没有找到该视频!', {
                  confirmButtonText: '确认',
                  cancelButtonText: '取消',
                  type: 'warning',
                })
                  .then(() => {
                    openLink(`${emby.value.url}:${emby.value.port}/web/index.html#!/home`)
                  })
                  .catch(() => {
                    window.$notification.error('Emby中没有找到该视频!')
                  })
              }
            }
            catch (e) {
              console.error('请求失败:', e)
              GM_setValue('EMBY-BTN-VALUE', '')
            }
          }
          else {
            console.error(`HTTP 错误: ${response.status}`)
          }
        },
        onerror: () => {
          window.$notification.error({
            title: '请求失败, 请检查 Emby 服务器',
            duration: 5000,
          })
        },
      })
    }

    return {
      emby,
      embySearch,
    }
  },

)

export default useEmbyStore
