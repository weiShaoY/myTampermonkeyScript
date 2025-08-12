<!------  2025-08-12---01:24---星期二  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import { useSearchStore } from '@/stores'

import { getClipboardText } from '@/utils'

const searchStore = useSearchStore()

const currentSearchEngine = ref<any>(null)

const searchKeyword = ref('')

/**
 *  获取当前域名
 */
const hostname = window.location.hostname

/**
 *  根据id获取搜索框的值
 */
function getSearchValue(id: string) {
  const element = document.getElementById(id)

  if (element) {
    // 检查是否是输入框元素
    if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
      return element.value
    }
  }
}

/**
 *  根据class获取搜索框的值
 */
function getSearchValueByClass(className: string) {
  const element = document.querySelector(className)

  if (element) {
    // 检查是否是输入框元素
    if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
      return element.value
    }
  }
}

/**
 * 获取搜索关键词
 */
function getSearchKeyword() {
  let keyword = ''

  // 遍历所有搜索引擎（包括子菜单）
  for (const item of searchStore.searchEngineList) {
    if (item.siteList) {
      // 检查子菜单中的搜索引擎
      for (const subItem of item.siteList) {
        if (subItem.hostname && hostname.includes(subItem.hostname)) {
          // const foundKeyword = getSearchValue(subItem.textareaId)
          let foundKeyword = ''

          if (subItem.textareaId) {
            foundKeyword = getSearchValue(subItem.textareaId) || ''
          }
          else if (subItem.textareaClass) {
            foundKeyword = getSearchValueByClass(subItem.textareaClass) || ''
          }

          if (foundKeyword) {
            keyword = foundKeyword
            currentSearchEngine.value = subItem
            break
          }
        }
      }
    }
    else {
      // 检查顶级搜索引擎
      if (item.hostname && hostname.includes(item.hostname)) {
        const foundKeyword = getSearchValue(item.textareaId)

        if (foundKeyword) {
          keyword = foundKeyword
          currentSearchEngine.value = item
          break
        }
      }
    }
  }

  if (keyword) {
    searchKeyword.value = keyword
    console.log('检测到搜索关键词:', keyword)
  }

  return keyword
}

function openLink(url: string) {
  try {
    // 优先使用油猴的 GM_openInTab
    if (typeof GM_openInTab !== 'undefined') {
      GM_openInTab(url, {
        active: true, // 立即激活，用户看到新页面
        insert: false, // 插入到所有标签页最后
      })
      return
    }

    // 备用方案：window.open
    window.open(url, '_blank')
  }
  catch (error) {
    console.warn('GM_openInTab 和 window.open 都失败了:', error)

    // 最后的备用方案：创建隐藏链接
    const link = document.createElement('a')

    link.href = url
    link.target = '_blank'
    link.style.display = 'none'
    link.rel = 'noopener noreferrer' // 添加安全属性

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

/**
 * 执行搜索
 */
async function handlePerformSearch(engine: any) {
  // 设置当前搜索引擎
  currentSearchEngine.value = engine

  // 获取搜索关键词
  const keyword = getSearchKeyword()

  // 判断 点击的搜索引擎是否是当前的页面
  if (engine.hostname && hostname.includes(engine.hostname)) {
    // 如果当前页面匹配，不执行搜索
    alert('当前页面匹配，不执行搜索')
  }
  else {
    alert('执行搜索')

    // 获取剪切板内容
    const clipboardText = await getClipboardText()

    // 执行搜索
    if (keyword) {
      openLink(engine.searchUrl + encodeURIComponent(keyword))
    }
    else if (clipboardText) {
      openLink(engine.searchUrl + encodeURIComponent(clipboardText))
    }
    else {
      // 如果没有关键词，直接打开网站
      openLink(engine.searchUrl)
    }
  }
}

// 组件挂载时获取搜索关键词
onMounted(() => {
  getSearchKeyword()
})
</script>

<template>
  <div
    class="fixed bottom-5 left-5 flex flex-col gap-3 border rounded-xl bg-white p-3 shadow-lg transition-all duration-200 ease-in-out"
    style="border-color: rgba(0, 0, 0, 0.1)"
  >
    <!-- 当前搜索引擎显示 -->
    <div
      v-if="currentSearchEngine"
      class="mb-2 text-xs text-gray-500"
    >
      当前: {{ currentSearchEngine.name }}
    </div>

    <!-- 搜索关键词显示 -->
    <div
      v-if="searchKeyword"
      class="mb-2 text-xs text-gray-600"
    >
      关键词: {{ searchKeyword }}
    </div>

    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
    >
      <!-- 搜索引擎菜单项 -->
      <template
        v-for="item in searchStore.searchEngineList"
        :key="item.name"
      >
        <!-- 有子菜单的项目 -->
        <el-sub-menu
          v-if="item.siteList"
          :index="item.name"
        >
          <template
            #title
          >
            <span>{{ item.name }}</span>
          </template>

          <el-menu-item
            v-for="subItem in item.siteList"
            :key="subItem.name"
            :index="subItem.name"
            @click="handlePerformSearch(subItem)"
          >
            <SvgIcon
              :icon="subItem.icon"
              size="20"
              class="mr-2"
            />
            {{ subItem.name }}
          </el-menu-item>
        </el-sub-menu>

        <!-- 没有子菜单的项目 -->
        <el-menu-item
          v-else
          :index="item.name"
          @click="handlePerformSearch(item)"
        >
          <SvgIcon
            :icon="item.icon"
            size="20"
            class="mr-2"
          />
          {{ item.name }}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>

</style>
