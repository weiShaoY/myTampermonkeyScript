export type DomQuery_parser = {

  /**
   * 指定搜索结果列表中的索引，部分网站的第一个结果可能是广告。
   * 特别指定：适用于 GGJAV 网站。
   */
  listIndex?: number

  /**
   * 大部分视频代码格式为 `xxx-000`，但部分网站使用空格分隔代码 `xxx 000`。
   * 特别指定：原用于 GGJAV 网站的情况。
   */
  spaceCode?: boolean

  /** a 标签的 href 属性查询字符串 */
  linkQuery: string

  /** 在标题中检测是否包含「字幕」等文本 */
  titleQuery: string
}

export type DomQuery_get = {

  /**
   * 检查页面是否提供视频播放资源。
   * 特别指定：适用于 JAVMENU，收录视频但未提供在线播放资源。
   * 特别指定：适用于 njav，资源不存在但仍返回 404 状态码。
   */
  videoQuery?: string

  /** 查询字幕信息的选择器 */
  subQuery?: string

  /** 查询泄露资源信息的选择器 */
  leakQuery?: string
}

type SiteItemBase = {

  /**
   * 站点名称
   */
  name: string

  /**
   *  图标
   */
  icon?: string

  /**
   * [已废弃] 用户自定义的禁用选项
   */
  // disable: boolean;

  /**
   * 在指定的 LibItem.name 下不显示该站点。
   * 特别指定：用于防止在 matchList 中出现自己检索自己站点的情况。
   */
  disableLibItemName?: string

  /** 站点的主机名 */
  hostname: string

  /** 站点的 URL 地址 */
  url: string

  /**
   * 部分站点的代码格式不同，可使用自定义格式化函数。
   * @param {string} preCode - 预处理前的代码
   * @returns {string} - 返回格式化后的代码
   */
  codeFormater?: (preCode: string) => string
}

/**
 *  站点 get 请求
 */
export type SiteItem_get = {

  /**
   * 获取类型为 "get"，表示直接获取页面内容。
   */
  fetchType: 'get'

  /**
   * 用于页面解析的 DOM 查询对象
   */
  domQuery: DomQuery_get
} & SiteItemBase

/**
 *  站点 post 请求
 */
export type SiteItem_post = {

  /**
   * 获取类型为 "post"，表示需要发送 POST 请求获取内容。
   */
  fetchType: 'post'

  /**
   * POST 请求的参数对象
   */
  postParams: Record<string, any>

  /**
   * 用于搜索结果解析的 DOM 查询对象
   */
  domQuery: DomQuery_parser
} & SiteItemBase

/**
 *  站点 parser 请求
 */
export type SiteItem_parser = {

  /**
   * 获取类型为 "parser"，表示需要解析搜索结果页。
   */
  fetchType: 'parser'

  /**
   * 用于搜索结果解析的 DOM 查询对象
   */
  domQuery: DomQuery_parser
} & SiteItemBase

/**
 *  bus 里有些以 '300MIUM' 开头，要处理掉这个 300
 */
export const SP_PREFIX = '300' as const

/**
 * 站点项的类型，可以是 "get"、"parser" 或 "post" 三种类型之一。
 */
export type SiteItem = SiteItem_get | SiteItem_parser | SiteItem_post
