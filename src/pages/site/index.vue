<!------  2025-08-12---17:06---星期二  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import Javdb from './javdb/index.vue'

const hostname = ref(window.location.hostname)

const isJavdb = hostname.value.includes('javdb')

const isJavbus = hostname.value.includes('javbus')

const isEmby = hostname.value.includes('emby')

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
</template>

<style lang="scss" scoped>

</style>
