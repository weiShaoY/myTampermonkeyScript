/**
 *  视频相关类型
 */
namespace VideoType {

  /**
   *  每个视频的类型
   */
  type Video = {

    /**
     *  原始名称-(包含扩展名和视频标签)
     */
    fullName: string

    /**
     *  基础名称-(原始名称去除扩展名)
     */
    baseName: string

    /**
     *  处理后的名称-(原始名称去除扩展名、去除视频标签、转换为小写)
     */
    processedVideoName: string

    /**
     * 视频文件标签图标数组
     */
    tagArray: string []

    /**
     * 视频扩展名
     */
    extensionName: string

    /**
     * 文件的目录路径层级
     */
    directoryPath: string[]

    /**
     * 是否为中文字幕
     */
    isChinese: boolean

    /**
     *  视频大小
     */
    size: string

    /**
     *  分辨率
     */
    resolution: string

  }

  /**
   * 完整的视频配置类型
   */
  type VideoConfig = {

    /**
     * 视频扩展名数组（注意：这个数组在 `tagRegex` 的定义中并未直接使用）
     */
    extensionArray: string[]

    /**
     * 视频标签名数组
     */
    tagArray: string[]

    /**
     *  视频标签匹配正则（注意：这里使用 `TagArrayType`）
     */
    tagRegex: RegExp

  }

}
