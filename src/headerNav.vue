<!--
 * @Author: your name
 * @Date: 2020-06-08 18:11:09
 * @LastEditTime: 2021-07-06 23:40:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-test\src\headerNav.vue
-->
<template>
  <section class="el-submenu aaa">
    <!--注意这里,用的element内置的样式-->
    <!-- 无子菜单 -->
    <el-menu-item v-if="!menuItem.children" :index="resolvePath(menuItem.path,false)">
      <!-- <i :class="'{'+menuItem.meta.icon+':'+menuItem.meta+'}'"></i> -->
      <i v-if="menuItem.meta" :class="menuItem.meta.icon"></i>
      {{menuItem.name}}
    </el-menu-item>
    <!-- 有子菜单 -->
    <el-submenu v-else :index="resolvePath(menuItem.path,true)">
      <template slot="title">
        <i v-if="menuItem.meta" :class="menuItem.meta.icon"></i>
        {{menuItem.name}}
      </template>
      <headerNav
        v-for="child in menuItem.children"
        :menuItem="child"
        :key="child.name"
        :base-path="resolvePath(child.path,0)"
      />
    </el-submenu>
  </section>
</template>

<script>
import path from "path";
import { mapMutations } from "vuex";
export default {
  name: "headerNav",
  props: {
    menuItem: {
      type: Object
    },
    classStyle: {
      type: String
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isHasChild: false
    };
  },
  methods: {
    ...mapMutations("GLOBAL", ["setTabList"]),
    /*handleClick(menuItem){
          let that=this;
          if(menuItem.meta) {
            that.$store.commit("setTabList",menuItem.meta.tabList)
          }
        }*/
    getUrlHash() {
      console.log(window.location.hash);
    },
    /* isHasChildMenu(menuItem) {
      let children=menuItem.children;
      // 没有孩子
      if (!children) {
        this.isHasChild = false;
        return false;
      }else{
        this.isHasChild = true;
        // this.basePath=menuItem.path;
      }
    }, */
    isExternal(path) {
      return /^(https?:|mailto:|tel:)/.test(path);
    },
    resolvePath(routePath, flag) {
      // 设置:index
      if (flag) {
        if (routePath.includes("/")) {
          this.basePath = routePath;
          return routePath;
          // return path.resolve(this.basePath, routePath);
        } else {
          return this.basePath;
        }
      } else if (flag.toString() == "false") {
        if(this.basePath==''){
          return routePath;
        }else{
          return this.basePath;
        }
      }
      // 设置basePath
      return path.resolve(this.basePath, routePath);
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
