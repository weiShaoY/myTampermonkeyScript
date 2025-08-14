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
