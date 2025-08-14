/**
 *  视频相关类型
 */
namespace VideoType {

  /**
   * 视频文件元数据信息
   * 用于存储视频文件的完整信息，包括文件名、标签、路径等
   */
  type VideoFile = {

    /**
     * 视频文件原始完整名称（包含扩展名和所有标签信息）
     * 例如：'Movie.Title.2024.4K.1080p.BluRay.x264.mkv'
     */
    originalName: string

    /**
     * 视频文件基础名称（去除扩展名，保留标签信息）
     * 例如：'Movie.Title.2024.4K.1080p.BluRay.x264'
     */
    nameWithTags: string

    /**
     * 视频文件处理后的名称（去除扩展名、去除所有标签、转换为小写）
     * 用于 Emby 媒体库匹配和搜索
     * 例如：'movie.title.2024'
     */
    cleanName: string

    /**
     * 视频文件标签图标标识数组
     * 通过文件名解析得出的标签，用于在界面上显示对应的图标
     * 例如：['tag-4k', 'tag-ziMu', 'tag-wuMa']
     */
    tags: string[]

    /**
     * 视频文件扩展名（不含点号）
     * 例如：'mkv', 'mp4', 'avi'
     */
    extension: string

    /**
     * 视频文件在文件系统中的完整目录路径
     * 数组形式，从根目录到文件所在目录的层级结构
     * 例如：['Movies', 'Action', '2024']
     */
    directoryPath: string[]

    /**
     * 视频文件是否包含中文字幕
     * 通过文件名中的特定标识判断（-c, -C, _ch）
     */
    hasChineseSubtitles: boolean

    /**
     * 视频文件大小（格式化后的字符串）
     * 以 GB 为单位，保留两位小数
     * 例如：'2.45 GB'
     */
    size: string

    /**
     * 视频文件分辨率信息
     * 从 NFO 文件或文件名中提取的分辨率数据
     * 例如：'1080p', '4K', '720p'
     */
    resolution: string

  }

  /**
   * 视频标签配置项
   */
  type VideoTagConfig = {

    /**
     * 标签名称数组（支持多个同义标签名）
     */
    names: string[]

    /**
     * 标签对应的图标标识
     */
    icon: string
  }

  /**
   * 视频文件识别和标签处理配置
   */
  type VideoProcessingConfig = {

    /**
     * 支持的视频文件扩展名列表
     */
    supportedExtensions: string[]

    /**
     * 视频标签配置列表
     */
    tagConfigs: VideoTagConfig[]

    /**
     * 用于从文件名中提取标签的正则表达式
     */
    tagExtractionRegex: RegExp

  }
}
