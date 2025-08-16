import { ElLoading } from 'element-plus'

import loadingSvg from '@/assets/svgs/loading.svg'

/**
 * 加载持续时间（毫秒）
 */
const LOADING_DURATION = 1000

/**
 * 加载图标尺寸（像素）
 */
const LOADING_SIZE = 50

/**
 * 设置全局加载状态
 * @description 创建并配置全局加载状态，包括加载图标和自动关闭
 * @throws {Error} 当加载状态设置失败时抛出错误
 */
export function setupLoading() {
  try {
    /**
     * 设置加载图标大小
     */
    const sizedSvg = loadingSvg.replace(
      '<svg',
      `<svg width="${LOADING_SIZE}" height="${LOADING_SIZE}"`,
    )

    /**
     * 加载实例
     */
    const loading = ElLoading.service({
      /**
       * 加载图标 SVG
       */
      svg: sizedSvg,

      /**
       * 是否锁定屏幕
       */
      lock: true,

      /**
       * 背景颜色
       */
      background: 'rgba(0, 0, 0, 0)',

      /**
       * 加载提示文本
       */
      // text: '加载中...',
    })

    // 自动关闭加载
    const app = document.getElementById('app')

    if (app) {
      setTimeout(() => {
        loading.close()
      }, LOADING_DURATION)
    }

    return loading
  }
  catch (error) {
    console.error('加载状态设置失败:', error)
    throw error
  }
}
