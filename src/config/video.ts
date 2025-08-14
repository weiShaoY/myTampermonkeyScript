/**
 * 视频匹配配置
 */
export const video: VideoType.VideoProcessingConfig = {
  supportedExtensions: ['mp4', 'mkv', 'avi', 'flv', 'wmv', 'mov', 'rmvb'],

  tagConfigs: [
    {
      names: ['4K'],
      icon: 'tag-4k',
    },
    {
      names: ['-c', '-C', '_ch', '-UC'],
      icon: 'tag-ziMu',
    },
    {
      names: ['无码'],
      icon: 'tag-wuMa',
    },
    {
      names: ['破解'],
      icon: 'tag-poJie',
    },
    {
      names: ['流出'],
      icon: 'tag-liuChu',
    },
  ],

  tagExtractionRegex: undefined as any, // 初始化为 undefined，稍后在对象定义后设置

}

// 在对象定义后设置 tagExtractionRegex
video.tagExtractionRegex = new RegExp(
  video.tagConfigs
    .flatMap(tag => tag.names)
    .map(name => name.includes('-')
      ? name.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
      : `-?${name.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}`, // 对于不包含 `-` 的情况，添加可选的 `-`
    )
    .join('|'),
  'gi',
)

export default video
