<!------  2025-08-12---16:47---星期二  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import DetailsPage from './detailsPage/index.vue'

import ListPage from './listPage/index.vue'

/**
 * 判断是列表页还是详情页
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

  <ListPage
    v-if="isListPage"
  />

  <DetailsPage
    v-else
  />

</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
