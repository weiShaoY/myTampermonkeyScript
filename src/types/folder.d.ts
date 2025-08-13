/**
 *  读取的文件夹 相关类型
 */
// namespace FolderType {

// }
type FolderType = {

  /**
   * 选择的盘符（如 C、D、E、F）
   */
  driveLetter: string

  /**
   * 是否启用定时提示读取文件夹
   */
  isEnableReminder: boolean

  /**
   * 提示读取文件夹的时间间隔（小时）
   */
  reminderInterval: number

  /**
   * 定时器检查读取提示的时间间隔（小时）
   */
  checkInterval: number

}
