import type { LibItem } from './libSites'

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
export const regEnum = {
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

  const codeText
    = libItem.name === 'javdb'
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

// 定义 GM_xmlhttpRequest 的响应接口类型
type TResponse = {
  readonly responseHeaders: string
  readonly readyState: 0 | 1 | 2 | 3 | 4
  readonly response: any
  readonly responseText: string
  readonly responseXML: Document | null
  readonly status: number
  readonly statusText: string
  readonly finalUrl: string
}

/**
 * 发送 GET 请求
 * @param params - 请求参数对象
 * @param params.url - 请求的 URL
 * @returns 返回包含响应的 Promise 对象
 */
export function gmGet({ url }: { url: string }): Promise<TResponse> {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: 'GET',
      url,
      onload: (response: TResponse) => resolve(response),
      onerror: (error: any) => reject(error),
    })
  })
}

/**
 * 发送 POST 请求
 * @param params - 请求参数对象
 * @param params.url - 请求的 URL
 * @param params.data - 请求的数据
 * @returns 返回包含响应的 Promise 对象
 */
export function gmPost({
  url,
  data,
}: {
  url: string
  data?: Record<string, any>
}): Promise<TResponse> {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: 'POST',
      data: new URLSearchParams(data).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      url,
      onload: (response: TResponse) => resolve(response),
      onerror: (error: any) => reject(error),
    })
  })
}
