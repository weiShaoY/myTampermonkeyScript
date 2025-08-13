/**
 * 为指定元素添加高亮类名
 * @param {Element | null} element - 需要高亮的元素
 * @description 高亮类名为 'is-highlight'
 */
export function addHighlightToElement(element: Element | null) {
  element?.classList.add('is-highlight')
}
