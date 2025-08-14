/**
 *  视频相关类型
 */
namespace VideoType {

  /**
   *  每个视频文件的类型
   */
  type VideoFile = {

    /**
     *  视频文件原始名称-(包含扩展名和视频标签)
     */
    fileOriginalName: string

    /**
     *  视频文件基础名称-(原始名称去除扩展名)
     */
    fileBaseName: string

    /**
     *  视频文件处理后的名称-(原始名称去除扩展名、去除视频标签、转换为小写)
     */
    fileProcessedName: string

    /**
     * 视频文件标签图标数组
     */
    fileTagArray: string []

    /**
     * 视频文件扩展名
     */
    fileExtension: string

    /**
     * 文件的目录路径层级
     */
    fileDirectoryPath: string[]

    /**
     * 是否为中文字幕
     */
    isChineseSubtitles: boolean

    /**
     *  视频文件大小
     */
    fileSize: string

    /**
     *  视频文件分辨率
     */
    fileResolution: string

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
