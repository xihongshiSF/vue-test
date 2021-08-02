/*
 * @Author: your name
 * @Date: 2020-06-08 17:40:58
 * @LastEditTime: 2021-07-12 21:27:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-test\src\main.js
 */
// console.log(1);   //判断main.js和commonFn.js的执行顺序

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/route'
import echarts from 'echarts' //引入echarts
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import store from "./store1.js"
import store from './store/index.js'
import '@/styles/scss/App.scss'
// import './styles/css/home.css'
import '@/styles/scss/common.scss'
import htmlToPdf from '../static/util/htmlToPdf'
// 使用Vue.use()方法就会调用工具方法中的install方法
Vue.use(htmlToPdf)

import less from 'less'
Vue.use(less)
import path from 'path'

console.log("store",store)
//公共函数
Vue.prototype.COMMONFN=COMMONFN;
Vue.prototype.REGEXP=REGEXP;

Vue.prototype.$echarts = echarts;

//引入elementui
Vue.use(ElementUI);
// Vue.use(echarts);

Vue.config.productionTip = false;

// console.log("commonFn",commonFn)
//获取全部的按钮编码
const btnCodes=COMMONFN.btnCodeArray();

/**定义全局权限指令*/
/*Vue.directive('auth', {
  //自定义的选项是由几个钩子函数组成的，inserted是其中一个钩子函数，钩子函数共5个
  //inserted：被绑定元素插入父节点时调用，元素在初始化时自动获取焦点
  bind(el, binding ,vnode, oldVnode) {
    const {expression} = binding;
    // let authValue = parseInt(COMMONFN.findAuthByCode(code));
    if (!btnCodes.includes(expression)) el.style.display="none";
  }
});*/


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});


/* 路由守卫 */

 router.beforeEach((to, from, next) => {
  if(JSON.parse(sessionStorage.authData)=='权限变化后'){
    next();
  }
  if(to.path=='/home/iframeOtherSys'){
    sessionStorage.aaa="结构化系统，你好"
  }
})


