<template>
  <el-container>
    <el-button @click="saveData">保存</el-button>
  </el-container>
</template>

<script>
import testStore from '@/utils/testStore.js'
    export default {
        name: "phone",
      methods:{
        saveData(){
          this.$emit("changeData")
        }
      }
    }
</script>

<style scoped>

</style>
