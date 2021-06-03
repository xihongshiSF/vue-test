<template>
    <div>
      <!--<el-button v-auth="4">新增1</el-button>
      <el-button v-auth="5">新增2</el-button>
      <el-button v-auth="6">删除</el-button>-->
      chart2
      <el-button @click="aaa"> 跳转</el-button>
    </div>
</template>

<script>
    export default {
        name: "option2",
      methods:{
        aaa(){
          this.$router.push({name:"echarts1"})
        }
      }
    }
</script>

<style scoped>

</style>
