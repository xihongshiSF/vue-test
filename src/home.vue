<!--
 * @Author: your name
 * @Date: 2020-06-08 17:35:26
 * @LastEditTime: 2021-07-06 13:00:27
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-test\src\home.vue
-->
<template>
  <div id="home">
    <div>
      <!--导航栏-->
      <el-menu
        :default-active="activeIndex"
        class="sidebar-container"
        mode="vertical"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        @select="handleSelect"
      >
        <!--方法1：注意这里，使用递归渲染菜单-->
        <header-nav v-for="item in routerList" :menuItem="item" :key="item.name"></header-nav>
      </el-menu>
    </div>
    <!-- 主页面 -->
    <div class="main-container">
      <!-- 面包屑 -->
      <breadCrumb :breadNames="breadNames" class="breadCrumb-customize"/>
      <hr />
      <!--路由切换-->
      <transition name="fade-transform" mode="out-in">  <!-- vue中的动画效果 -->
        <keep-alive :include="['keepAlive']">
          <router-view :key="key" />
        </keep-alive>
      </transition>
    </div>

  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import headerNav from "@/headerNav.vue";
import breadCrumb from "@/breadCrumb.vue";
export default {
  name: "home",
  data() {
    return {
      activeIndex: this.$route.path, //重点,刷新页面之后页面不返回首页
      routerList: [],
      breadNames: []
    };
  },
  components: {
    headerNav,
    breadCrumb
  },
  computed: {
    ...mapGetters("GLOBAL", ["tabList", "authData"]),
    /*menuList(){
        // return this.$store.getters.menuData;
        return COMMONFN.transData(this.$store.getters.menuData,"id","pid")
      }*/
    key() {
      return this.$route.path;
    }
  },
  methods: {
    ...mapMutations("GLOBAL", ["setTabList"]),
    /* 点击菜单获取菜单相应名称*/
    handleSelect(key, keyPath) {
      let that = this;
      setTimeout(function() {
        that.breadNames = [];
        // this.breadPaths = keyPath;
        that.$route.matched.forEach(ele => {
          ele.path != "/home" && that.breadNames.push(ele.name);
        });
      }, 150);
    }
    /* 点击 */
  },
  mounted() {
    let tempRouter = JSON.parse(JSON.stringify(this.$router.options.routes));
    //路由中组件home只使用一次用这个
    this.routerList = tempRouter.filter(
      item => item.path.includes("/home") && item.children
    )[0].children;
    //路由中组件home使用多次用这个
    // this.routerList = tempRouter.filter(item=>!["/","login","/404","*"].includes(item.path));
    console.log("authData", this.authData);
    this.handleSelect(this.$route.path);
  }
};
</script>

<style scoped>
/* 引入外部的css样式 ,这个分号一定要写，要不会报错*/
@import "./styles/css/home.css";
</style>
