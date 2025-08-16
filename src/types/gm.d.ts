namespace GMType {

  export type HttpResponse = {

    /**
     * 响应头字符串（原始格式）
     * 示例： "content-type: application/json\r\ncache-control: no-cache"
     * 可通过正则或 `Headers` 对象解析
     */
    readonly responseHeaders: string

    /**
     * 请求的当前状态（符合 XMLHttpRequest.readyState）
     * 0: UNSENT - 请求未初始化
     * 1: OPENED - 服务器连接已建立
     * 2: HEADERS_RECEIVED - 请求已接收
     * 3: LOADING - 请求处理中（响应体下载中）
     * 4: DONE - 请求完成
     */
    readonly readyState: 0 | 1 | 2 | 3 | 4

    /**
     * 响应体（自动根据内容类型解析）
     * - 如果响应是 JSON 会自动转为对象
     * - 如果是 XML 会转为 Document 对象
     * - 其他情况可能是字符串或 ArrayBuffer
     */
    readonly response: any

    /**
     * 响应体的纯文本形式
     * 适用于非结构化数据或原始文本处理
     */
    readonly responseText: string

    /**
     * 响应体的 XML 文档形式（如果是 XML 内容）
     * 非 XML 内容时为 null
     */
    readonly responseXML: Document | null

    /**
     * HTTP 状态码
     * 示例：
     * - 200: OK
     * - 404: Not Found
     * - 500: Internal Server Error
     */
    readonly status: number

    /**
     * 状态码对应的文本描述
     * 示例： "OK", "Not Found"
     */
    readonly statusText: string

    /**
     * 最终请求 URL（包含重定向后的地址）
     * 与原始请求 URL 不同时说明发生了重定向
     */
    readonly finalUrl: string
  }
}
