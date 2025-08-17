<!------  2025-08-12---17:06---星期二  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { useFolderStore } from '@/stores'

import Emby from './emby/index.vue'

import Javbus from './javbus/index.vue'

import Javdb from './javdb/index.vue'

import Missav from './missav/index.vue'

const hostname = ref(window.location.hostname)

const isJavdb = hostname.value.includes('javdb')

const isJavbus = hostname.value.includes('javbus')

const isMissav = hostname.value.includes('missav')

const isEmby = window.location.port === '8096'

useFolderStore().loadEmbyFolderData()
</script>

<template>
  <Javdb
    v-if="isJavdb"
  />

  <Javbus
    v-else-if="isJavbus"
  />

  <Emby
    v-else-if="isEmby"
  />

  <Missav
    v-else-if="isMissav"
  />

  <Setting
    v-if="isJavdb || isJavbus || isMissav || isEmby"
  />
</template>

<style lang="scss" scoped>

</style>
