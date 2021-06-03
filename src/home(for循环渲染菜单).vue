<template>
  <div id="home">
    <div>
      <!--导航栏-->
      <!-- <el-menu
        :default-active="activeIndex"
        class="sidebar-container"
        mode="vertical"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        @select="handleSelect"
      >-->
      <!--方法1：注意这里，使用递归渲染菜单-->
      <!-- <header-nav v-for="item in routerList" :menuItem="item" :key="item.name"></header-nav> -->
      <!-- </el-menu> -->
      <el-menu
        :default-active="activeIndex"
        mode="vertical"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        class="sidebar-container"
      >
        <!-- 1级 -->
        <section v-for="(item,index) in routerList" :key="index">
          <el-menu-item v-if="!item.children" :index="item.path">{{item.name}}</el-menu-item>
          <el-submenu v-if="item.children" :index="item.path">
            <template slot="title">{{item.name}}</template>
            <!-- 2级 -->
            <section v-for="(subItem,subIndex) in item.children" :key="subIndex">
              <el-submenu :index="subItem.path" v-if="subItem.children">
                <template slot="title">{{subItem.name}}</template>
                <!-- 3级 -->
                <section v-for="(childItem,childIndex) in subItem.children" :key="childIndex">
                  <el-submenu
                    :index="childItem.path"
                    v-if="childItem.children"
                  >
                    <template slot="title">{{childItem.name}}</template>
                    <el-menu-item :index="childItem.path">{{childItem.name}}</el-menu-item>
                  </el-submenu>
                  <el-menu-item
                    v-if="!childItem.children"
                    :index="childItem.path"
                  >{{childItem.name}}</el-menu-item>
                </section>
              </el-submenu>
              <el-menu-item v-if="!subItem.children" :index="subItem.path">{{subItem.name}}</el-menu-item>
            </section>
          </el-submenu>
        </section>
      </el-menu>
    </div>
    <!-- 主页面 -->
    <div class="main-container">
      <!-- 面包屑 -->
      <breadCrumb :breadNames="breadNames" />
      <hr />
      <!--路由切换-->
      <transition name="fade-transform" mode="out-in">
        <!-- vue中的动画效果 -->
        <keep-alive :include="['keepAlive']">
          <router-view :key="key" />
        </keep-alive>
      </transition>
    </div>

    <!--方法2：菜单写死-->
    <!-- <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/test">test</el-menu-item>&lt;!&ndash;index作为唯一标识必不可少&ndash;&gt;
      <el-submenu index="/echarts">
        <template slot="title">echarts</template>
        &lt;!&ndash;
        <router-link :to="{name:'echarts1'}">
          <el-menu-item index="/echarts1">111</el-menu-item>
        </router-link>
        <router-link :to="{name:'echarts2'}">
          <el-menu-item index="/echarts2">222</el-menu-item>
        </router-link>&ndash;&gt;
        <el-menu-item index="/echarts1">echarts1</el-menu-item>
        <el-menu-item index="/echarts2">echarts2</el-menu-item>
        <el-menu-item index="/pieBar">pieBar</el-menu-item>
      </el-submenu>
      <el-submenu index="/options">
        <template slot="title">选项3</template>
        <el-menu-item index="/home/option3">333</el-menu-item>
        <el-submenu index="/home/option4">
          <template slot="title">选项4</template>
          <el-menu-item index="/home/option5">555</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="/element">
        <template slot="title">element</template>
        <el-menu-item index="/table">table</el-menu-item>
      </el-submenu>
    </el-menu>-->

    <!--方法3：使用for循环渲染菜单-->
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
