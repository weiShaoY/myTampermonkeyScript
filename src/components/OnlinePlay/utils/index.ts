import type { LibItem } from './libSites'

import type { OnlinePlayType } from '@/types/onlinePlay'

import { SP_PREFIX } from './siteList'

// 声明 GM_xmlhttpRequest 的全局类型
declare const GM_xmlhttpRequest: any

/**
 * 比较两个字符串是否相等，不区分大小写
 * @param str1 - 第一个字符串
 * @param str2 - 第二个字符串
 * @returns 如果相等返回 true，否则返回 false
 */
export function isCaseInsensitiveEqual(str1: string, str2: string) {
  return str1.toLowerCase() === str2.toLowerCase()
}

/**
 * 检查响应代码是否表示错误
 * @param resCode - 响应代码
 * @returns 如果是 404 或 403，返回 true，否则返回 false
 */
export function isErrorCode(resCode: number) {
  return [404, 403].includes(resCode)
}

/**
 * 定义常用的正则表达式枚举
 */
export const regEnum: OnlinePlayType.RegExpConfig = {
  subtitle: /(中文|字幕|subtitle)/,
  leakage: /(无码|無碼|泄漏|Uncensored)/,
}

/**
 * 获取视频的代码
 * @param libItem - 站点的配置项
 * @returns 返回提取的视频代码
 */
export function getCode(libItem: LibItem): string {
  const { codeQueryStr } = libItem.querys

  const codeNode = document.querySelector<HTMLElement>(codeQueryStr)

  if (!codeNode) {
    return ''
  }

  const codeText = libItem.name === 'javdb'
    ? (codeNode.dataset.clipboardText as string)
    : codeNode?.textContent?.replace('复制', '')

  if (codeText?.includes('FC2')) {
    return codeText.split('-')[1]
  }

  if (codeText?.startsWith(SP_PREFIX)) {
    return codeText.substring(3)
  }

  return codeText || ''
}

/**
 * 发送 GET 请求
 * @param url - 请求的 URL
 * @returns 返回包含响应的 Promise 对象
 */
export function gmGet(url: string): Promise<OnlinePlayType.HttpResponse> {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: 'GET',
      url,
      onload: (response: OnlinePlayType.HttpResponse) => resolve(response),
      onerror: (error: any) => reject(error),
    })
  })
}

/**
 * 发送 POST 请求
 * @param url - 请求的 URL
 * @param data - 请求的数据
 * @returns 返回包含响应的 Promise 对象
 */
export function gmPost(url: string, data?: Record<string, any>): Promise<OnlinePlayType.HttpResponse> {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: 'POST',
      data: data ? new URLSearchParams(data).toString() : '',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      url,
      onload: (response: OnlinePlayType.HttpResponse) => resolve(response),
      onerror: (error: any) => reject(error),
    })
  })
}
