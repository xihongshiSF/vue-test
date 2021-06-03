<!--
 * @Author: your name
 * @Date: 2020-06-08 18:11:09
 * @LastEditTime: 2021-05-31 11:25:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-test\src\headerNav.vue
-->
<template>
  <section class="el-submenu aaa">
    <!--注意这里,用的element内置的样式-->
    <!-- 无子菜单 -->
    <el-menu-item v-if="!menuItem.children" :index="menuItem.path" @click="getUrlHash">
      <!-- <i :class="'{'+menuItem.meta.icon+':'+menuItem.meta+'}'"></i> -->
      <i v-if="menuItem.meta" :class="menuItem.meta.icon"></i>
      {{menuItem.name}}
    </el-menu-item>
    <!-- 有子菜单 -->
    <el-submenu v-else :index="menuItem.path">
      <template slot="title">
        <i v-if="menuItem.meta" :class="menuItem.meta.icon"></i>
        {{menuItem.name}}
      </template>
      <headerNav v-for="child in menuItem.children" :menuItem="child" :key="child.name" />
    </el-submenu>
  </section>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "headerNav",
  props: {
    menuItem: {
      type: Object
    },
    classStyle: {
      type: String
    }
  },
  methods: {
    ...mapMutations("GLOBAL", ["setTabList"]),
    /*handleClick(menuItem){
          let that=this;
          if(menuItem.meta) {
            that.$store.commit("setTabList",menuItem.meta.tabList)
          }
        }*/
    getUrlHash(){
      console.log(window.location.hash)
    }
  }
};
</script>

<style lang='less' scoped>
.aaa {
  font-size: 100px;
}
/*单独改变菜单栏的样式*/
.el-menu-demo .el-submenu .el-menu-item {
  height: 60px;
  line-height: 60px;
  padding: 0 45px;
  min-width: 111px;
}
</style>
