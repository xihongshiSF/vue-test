<!--
 * @Author: your name
 * @Date: 2020-05-18 00:07:38
 * @LastEditTime: 2021-07-13 00:13:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-test（自己练习vue项目）\src\App.vue
-->
<template>
  <div id="app">
    <router-view v-if="isShowPage" /><!-- 不点击浏览器刷新界面也能刷新浏览器 -->
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
//测试require 的使用
let routeData = require("./router/routeData.js");
export default {
  name: "App",
  data() {
    return {
      isShowPage: false //控制页面是否渲染
    };
  },
  mounted() {
    document.body.style.zoom=window.screen.width/1920;
    // 自适应屏幕
    // COMMONFN.fitScrren();
    // 监听页面某个元素是否发生变化
    // COMMONFN.mutationOfDom();
    /* Array.from(document.getElementsByClassName("el-select")).forEach(item=>{
      debugger
      item.onclick=function(){
        debugger
        let target=window.event.target;
        debugger
        // if(target)
      }
    }) */
    /* setTimeout(()=>{
      document.getElementsByClassName("el-select")[0].onclick=function(){
        // COMMONFN.mutationOfDom();
        let target=Array.from(document.getElementsByClassName('el-select-dropdown')).filter(item=>!item.style.display)[0];
        var bodyStyle = document.createElement('style')
        debugger

        bodyStyle.innerHTML = 
        `.el-select-dropdown{top:${Number(target.style.top.split('p')[0])*(1/window.heightRatio)}px!important;
        left:${Number(target.style.left.split('p')[0])*(1/window.widthRatio)}px!important;
        transform: scale(${1/window.widthRatio}, ${1/window.heightRatio});}`
        // width:${Number(target.style.width.split('p')[0])*(1/window.widthRatio)}px!important;
        // height:${Number(target.style.height.split('p')[0])*(1/window.heightRatio)}px!important;
        document.documentElement.firstElementChild.appendChild(bodyStyle)
      }
    },5000) */
    
      
    console.log(this.$route.path);
    // 测试require 的使用
    console.log("require", routeData);
    //import用法
    // import("./router/routeData").then(routeData=>{
    //   console.log(routeData)
    // })
    this.getAuthData();
    console.log(this.$router,'ddkfjbdsbhz')
  },
  computed: {
    ...mapGetters("GLOBAL", ["authData"])
    /* 跨文件引用时可以这么写 */
    /* ...mapGetters({
      authData:'GLOBAL/authData',
      menuData:'SINGAL/menuData'
    }) */
  },
  methods: {
    ...mapMutations("GLOBAL", ["setAuthData", "setFirstRoute"]),
    /* 跨文件引用时可以这么写 */
    /* ...mapMutations({
        setAuthData:'GLOBAL/setAuthData',
        setFirstRoute:'GLOBAL/setFirstRoute',
        setMenu:'SINGAL/setMenu'
    }), */

    /* 方法用处：当权限数据拿到手之后再去渲染页面，
      1.没有登录页面，在app.vue中请求权限数据接口再去渲染界面，没有拿到数据的话页面不应该被渲染出来，
      2.请求权限的接口是有延迟的，不一定会马上返回权限数据，要等待一会，在这期间页面不该被渲染出来，
      3.权限数据驱动页面的渲染，权限数据还未拿到就已渲染界面，不仅界面出不来，依赖权限数据渲染界面的各种变量都会报错 */
    getAuthData() {
      let that = this;
      //使用settimeout模拟前端请求后台接口的延迟性
      setTimeout(() => {
        console.log(this.$route.path);
        that.setAuthData("权限变化后");
        console.log(this.authData);
        //获取权限之后控制页面的渲染
        that.isShowPage = true;
        //首次被加载应该渲染哪个页面
        // if(window.performance.navigation.type==0){
        /* if(this.authData=='权限变化后'){
            //首次被加载
            that.$router.push('/keepAlive')
          } */
        //绝对不能写下边这句话，写上之后会出现如下情况：初始化进入第1个页面，然后点击跳转到第2个页面，然后刷新浏览器，
        // 会发现页面并没有重新恢复到页面2，而是空白的
        /* else{
            that.$router.push(that.$route.path)
          } */

        //获取首次被加载的页面
        this.setFirstRoute("/dynamicTable");
      }, 50);
    }
  }
};
</script>

<style>
* {
  margin: 0;
}
#app {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
  height:100%;
  padding:0;
  margin: 0;
}

</style>
