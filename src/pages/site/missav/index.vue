<!------  2025-08-12---16:47---星期二  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import DetailsPage from './detailsPage/index.vue'

import ListPage from './listPage/index.vue'

import './index.scss'

/**
 * 判断是列表页还是详情页
 */
const isListPage = ref(false)

/**
 *  是否有详情内容
 */
const isHasDetailContent = document.querySelector('#sprite-plyr')

const bodyElement = document.querySelector('body')

if (isHasDetailContent) {
  isListPage.value = false
  bodyElement?.classList.add('details-page')
}
else {
  isListPage.value = true
  bodyElement?.classList.add('list-page')
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
</style>
