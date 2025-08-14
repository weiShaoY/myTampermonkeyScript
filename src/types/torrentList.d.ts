/**
 * 种子/磁链相关类型定义
 */

/**
 * 种子/磁链项的类型
 * 用于存储从种子网站抓取的磁链信息
 */
type TorrentType = {

  /**
   * 磁链/种子链接地址
   * 例如：'magnet:?xt=urn:btih:...'
   */
  url: string

  /**
   * 种子文件名（包含标签信息）
   * 例如：'Movie.Title.2024.4K.1080p.BluRay.x264'
   */
  name: string

  /**
   * 文件大小（以字节为单位）
   * 例如：2147483648 (2GB)
   */
  size: number

  /**
   * 种子发布时间
   * 格式：'2024-01-15 14:30:00'
   */
  time: string

  /**
   * 种子项的背景颜色（可选）
   * 用于在界面上区分不同类型的种子
   */
  backgroundColor?: string

  /**
   * 视频标签图标标识数组
   * 通过文件名解析得出的标签，用于在界面上显示对应的图标
   * 例如：['tag-4k', 'tag-ziMu', 'tag-wuMa']
   */
  tags: string[]

  /**
   * 种子来源网站标识（可选）
   * 用于标识种子来自哪个网站
   */
  source?: string
}

/**
 * 种子列表排序规则配置项
 * 用于定义种子列表的排序优先级和样式
 */
type TorrentSortingRule = {

  /**
   * 匹配规则名称（关键词）
   * 用于在种子文件名中查找匹配项
   * 例如：'4K', '1080p', 'BluRay'
   */
  name: string

  /**
   * 匹配上该规则时的背景颜色
   * 用于在界面上突出显示符合规则的种子
   * 例如：'#FF6B6B', '#4ECDC4'
   */
  backgroundColor: string

  /**
   * 种子来源网站标识（可选）
   * 用于标识符合该规则的种子来源网站
   * 例如：'色花堂', '桃花族'
   */
  web?: string
}
