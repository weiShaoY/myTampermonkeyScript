<!------  2025-08-16---05:08---星期六  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
type Props = {

  /**
   *   视频名称
   */
  videoName: string
}
defineProps<Props>()

const visible = defineModel<boolean>({
  required: true,
})
</script>

<template>
  <el-dialog
    v-model="visible"
    :title="videoName"
    width="70%"
    :show-close="false"
  >

    <el-scrollbar
      height="60vh"
      always
    >
      <img
        :src="`https://image.memojav.com/image/screenshot/${videoName.toLocaleUpperCase()}.jpg`"
        alt="video thumbnail"
        class="h-full w-full object-cover"
      >
    </el-scrollbar>
  </el-dialog>
</template>

<style lang="less" scoped>

</style>
