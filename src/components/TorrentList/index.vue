<!------------------------------------  磁链列表  ------------------------------------------------->
<script lang="ts" setup>

import { defineProps } from 'vue'

import { useTorrentStore } from '@/stores'

type PropsType = {

  /**
   *  挂载点
   */
  to?: string

  /**
   *  种子列表
   */
  torrentList?: TorrentType[]

  /**
   *  滚动的目标元素
   */
  scrollTarget?: string
}

const props = withDefaults(defineProps<PropsType>(), {
  to: '',
  torrentList: (): TorrentType[] => [],
  scrollTarget: '',
})

const torrentStore = useTorrentStore()

/**
 *  种子列表
 */
const torrentList = ref<TorrentType[]>(props.torrentList)

console.log('%c Line:39 🍢 torrentList', 'color:#fca650', props)

/**
 *  有中文字幕的数量
 */
const chineseCount = computed(() =>

  props.torrentList.filter(item => /-c|-C|_ch/.test(item.name)).length,

)

/**
 *  复制种子链接
 */
function copyTorrentUrl(torrent: TorrentType) {
  if (!torrent.url) {
    window.$notification.error('传入磁链为空, 无法复制,请检查代码')
    return
  }

  GM_setClipboard(torrent.url, 'text')
  window.$notification.success(`${torrent.name} 已复制到剪切板`)
}

/**
 * 根据种子项计算背景颜色和标签
 * @param {TorrentType} torrent - 种子项
 * @returns {{ backgroundColor: string; web: string }} 背景颜色和标签信息
 */
function getTorrentStyle(torrent: TorrentType) {
  const matchingRule = torrentStore.torrentList.SortingRuleArray.find(rule =>
    torrent.name.includes(rule.name),
  )

  return matchingRule
    ? {
        backgroundColor: matchingRule.backgroundColor,
        web: matchingRule.web || '',
      }
    : {
        backgroundColor: '',
        web: '',
      }
}

async function main() {
  torrentList.value.sort((videoA: TorrentType, videoB: TorrentType) => {
  /**
   *   视频A在排序规则数组中的位置   （-1 代表不在数组中）
   */
    const indexA = torrentStore.torrentList.SortingRuleArray.findIndex(rule => videoA.name.includes(rule.name))

    /**
     *   视频B在排序规则数组中的位置   （-1 代表不在数组中）
     */
    const indexB = torrentStore.torrentList.SortingRuleArray.findIndex(rule => videoB.name.includes(rule.name))

    // 1.在规则数组中，按数组里关键词的顺序排序,如果关键词的顺序一样了,按文件大小排序

    // videoA在规则数组中 videoB不在规则数组中 则videoA应该排在videoB前面  应该返回 -1
    if (indexA !== -1 && indexB === -1) {
      return -1
    }

    //  videoA不在规则数组中 videoB在规则数组中 则videoB应该排在videoA前面  应该返回 1
    if (indexA === -1 && indexB !== -1) {
      return 1
    }

    //  videoA 和 videoB 都在规则数组中
    if (indexA !== -1 && indexB !== -1) {
      // 如果 关键词顺序一样，则按文件大小排序
      if (indexA === indexB) {
        //  如果 videoA 的 文件大小 大于 videoB 的文件大小，则应该返回 -1 将 videoA 排在 videoB 前面
        return videoA.size > videoB.size ? -1 : 1
      }
      else {
        //  如果 关键词顺序不一样，则按关键词顺序排序  从小到大
        return indexA < indexB ? -1 : 1
      }
    }

    // 2. 如果文件名是纯小写的，则属于第二大类，按文件大小排序
    const isLowerCaseA = /^[a-z0-9.-]+$/.test(videoA.name)

    const isLowerCaseB = /^[a-z0-9.-]+$/.test(videoB.name)

    //  如果 videoA 和 videoB 都是纯小写的，则按文件大小排序
    if (isLowerCaseA && isLowerCaseB) {
      //  如果 videoA 的 文件大小 大于 videoB 的文件大小，则应该返回 -1 将 videoA 排在 videoB 前面
      return videoA.size > videoB.size ? -1 : 1
    }

    //  如果 videoA 是纯小写的，videoB 是不是纯小写的 则将 videoA 排在 videoB 前面
    if (isLowerCaseA && !isLowerCaseB) {
      return -1
    }

    //  如果 videoA 是不是纯小写的，videoB 是纯小写的 则将 videoB 排在 videoA 前面
    if (!isLowerCaseA && isLowerCaseB) {
      return 1
    }

    // 3. 其他文件属于第三大类，按文件大小排序
    // 如果 videoA 的大小 大于 videoB 的大小，则应该返回 -1 将 videoA 排在 videoB 前面
    return videoA.size > videoB.size ? -1 : 1
  })
}

/**
 *   滚动到磁链列表组件
 */
function scrollToElement() {
  //  如果配置 详情页 不 滚动，则直接返回
  if (!torrentStore.torrentList.isScrollToTorrentList) {
    return
  }

  const offset = -200 // 向上偏移量

  if (props.scrollTarget) {
    const element = document.querySelector(props.scrollTarget)

    if (element) {
      // element.scrollIntoView({ behavior: 'smooth' })

      const elementPosition = element.getBoundingClientRect().top + window.scrollY

      window.scrollTo({
        top: elementPosition + offset,
        behavior: 'smooth',
      })
    }
  }
  else {
    //  滚动到 to
    const element = document.querySelector(props.to)

    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY

      window.scrollTo({
        top: elementPosition + offset,
        behavior: 'smooth',
      })
    }
  }
}

main()

scrollToElement()
</script>

<template>
  <Teleport
    v-if="torrentStore.torrentList.isShowTorrentList"
    :to="props.to"
  >
    <div
      class="mx-auto mb-10 w-full border rounded-md bg-white p-6 pb-1"
    >
      <!-- 标题部分 -->
      <div
        class="flex flex-wrap items-center justify-between -m-2"
      >
        <div
          class="flex items-center justify-center text-4 font-semibold text-stroke-black"
        >

          <span>
            共
          </span>

          <span
            class="m-x-2 text-6 text-[#000] font-bold"
          >
            {{ torrentList.length }}
          </span>

          <span>
            部
          </span>
        </div>

        <div
          v-if="chineseCount"
          class="flex items-center justify-center text-4 text-[#F59E0B] font-semibold"
        >
          <span
            class="m-x-2 text-6 text-[#FF8400] font-bold"
          >
            {{ chineseCount }}
          </span>

          <span>
            部有中文字幕
          </span>
        </div>

      </div>

      <div
        class="m-y-5"
      >
        <!-- # -----------------------------------------------  列表循环  Start  ------------------------------------------------->
        <div
          v-for="(torrent, index) in torrentList"
          :key="index"
        >
          <div
            class="group relative z-0 h-[6em] flex cursor-pointer items-center justify-between overflow-hidden rounded-[1em] p-2"
            :style="{
              backgroundColor: getTorrentStyle(torrent).backgroundColor,
            }"
          >
            <!-- 悬浮动画 -->
            <div
              class="absolute z-[-1] h-[5em] w-[5em] rounded-full duration-500 -left-[4.5em] -top-[4.5em] group-hover:scale-[4500%]"
              :style="{
                // background: 'linear-gradient(to right,#00DFA2,#ADFF2F)',
                background: 'linear-gradient(to right,#2233AA,#ADFF2F)',
              }"
            />

            <!-- 左边 -->
            <div
              class="flex items-center"
            >
              <!-- 磁链信息 -->
              <div
                class="w-100 p-2"
              >
                <!-- 磁链名称 -->
                <div
                  class="truncate text-4 font-bold group-hover:text-[#fff]"
                  :style="{
                    color: torrent.backgroundColor ? '#fff' : '#000',
                  }"
                >
                  {{
                    torrent.name
                  }}
                </div>

                <!-- 磁链时间 -->
                <div
                  class="m-t-1 text-3 font-semibold !group-hover:text-[#fff]"
                  :style="{
                    color: torrent.backgroundColor ? '#fff' : '#9CA3AF',
                  }"
                >
                  {{
                    torrent.time
                  }}
                </div>
              </div>

              <!-- 网站 信息 -->
              <div
                class="m-l-3 w-30 group-hover:text-[#fff]"
              >
                <span
                  v-if="torrent.web"
                  class="text-4 font-bold"
                >
                  {{
                    getTorrentStyle(torrent).web
                  }}
                </span>
              </div>

              <!-- 文件大小 -->
              <div
                class="m-l-3 w-30 group-hover:text-[#fff]"
              >
                <span
                  v-if="torrent.size"
                  class="text-4 font-bold"
                >
                  {{
                    torrent.size
                  }}
                </span>

                <span
                  v-if="torrent.size"
                  class="font-semibold"
                >
                  GB
                </span>
              </div>

              <!-- 标签图标 -->
              <div
                v-for="tag in torrent.tagArray"
                :key="tag.name"
                class="p-x-3"
              >
                <!-- <img
                  :src="tag.url"
                  :alt="tag.name"
                  class="h-8 w-8"
                > -->
                <SvgIcon
                  :icon="tag.icon"
                  class="h-8 w-8"
                />

                <!-- {{ tag.icon }} -->
              </div>

            </div>

            <!-- 右边 -->
            <div
              class="w-auto p-2"
            >
              <!-- 复制按钮 -->
              <!-- <button
                class="shadow-rgba(6,_24,_44,_0.4)_0px_0px_0px_2px shadow-_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px shadow-_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset"
                @click="copyTorrentUrl(torrent)"
              >
                复制
              </button> -->
              <el-button
                @click="copyTorrentUrl(torrent)"
              >
                复制
              </el-button>
            </div>
          </div>

          <div
            v-if="torrentList.length === 1 || (torrentList.length > 1 && index !== torrentList.length - 1)"
            class="m-y-2 h-[1px] rounded bg-[#9CA3AF]"
          >
            <!-- 分割线 -->
            <!-- torrentList.length === 1：当 torrentList 长度为 1 时显示分割线 -->
            <!-- torrentList.length > 1 && index !== torrentList.length - 1：当 torrentList 长度大于 1 且不是最后一个元素时显示分割线 -->
          </div>

        </div>
        <!-- # -----------------------------------------------  列表循环  End  ------------------------------------------------->

      </div>
    </div>
  </Teleport>
</template>

<style lang="less" scoped>

</style>
