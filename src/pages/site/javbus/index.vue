<!------  2025-08-12---16:48---星期二  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

/**
 *  判断是否为详情页
 */
const isListPage = ref(false)

const waterfallElement = document.querySelector('#waterfall')

const bodyElement = document.querySelector('body')

// 检查 movieListElement 是否有元素
if (waterfallElement) {
  isListPage.value = true
  bodyElement?.classList.add('javbus', 'javbus-list-page')
}
else {
  isListPage.value = false
  bodyElement?.classList.add('javbus', 'javbus-details-page')
}

</script>

<template>
  <div
    class=""
  >
    222
  </div>
</template>

<style lang="less" scoped>

</style>
