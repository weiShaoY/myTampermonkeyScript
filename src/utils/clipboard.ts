/**
 * 剪贴板工具函数
 */

/**
 * 检查剪贴板API是否可用
 */
export function isClipboardSupported(): boolean {
  return 'clipboard' in navigator && 'readText' in navigator.clipboard
}

/**
 * 获取剪贴板内容
 * @returns Promise<string> 剪贴板文本内容
 */
export async function getClipboardText(): Promise<string> {
  try {
    if (!isClipboardSupported()) {
      console.warn('剪贴板API不支持')
      return ''
    }

    const text = await navigator.clipboard.readText()

    return text || ''
  }
  catch (error) {
    console.warn('读取剪贴板失败:', error)
    return ''
  }
}

/**
 * 设置剪贴板内容
 * @param text 要设置的文本内容
 * @returns Promise<boolean> 是否设置成功
 */
export async function setClipboardText(text: string): Promise<boolean> {
  try {
    if (!isClipboardSupported()) {
      console.warn('剪贴板API不支持')
      return false
    }

    if (!text || typeof text !== 'string') {
      console.warn('无效的文本内容')
      return false
    }

    await navigator.clipboard.writeText(text)
    return true
  }
  catch (error) {
    console.warn('设置剪贴板失败:', error)
    return false
  }
}

/**
 * 安全地获取剪贴板内容（带用户交互检查）
 * @returns Promise<string> 剪贴板文本内容
 */
export async function getClipboardTextSafely(): Promise<string> {
  try {
    // 检查是否有用户交互权限
    if (!isClipboardSupported()) {
      return ''
    }

    // 尝试读取剪贴板
    const text = await navigator.clipboard.readText()

    return text || ''
  }
  catch (error) {
    // 如果是权限错误，提示用户
    if (error instanceof Error && error.name === 'NotAllowedError') {
      console.warn('需要用户交互才能访问剪贴板')
    }

    return ''
  }
}

/**
 * 复制文本到剪贴板（带成功提示）
 * @param text 要复制的文本
 * @param showToast 是否显示成功提示
 * @returns Promise<boolean> 是否复制成功
 */
export async function copyToClipboard(text: string, showToast: boolean = true): Promise<boolean> {
  const success = await setClipboardText(text)

  if (success && showToast) {
    // 可以集成你的提示组件
    console.log('已复制到剪贴板:', text)
  }

  return success
}
