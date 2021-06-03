/*
 * @Author: your name
 * @Date: 2021-05-29 21:32:29
 * @LastEditTime: 2021-05-29 22:36:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-test\src\router\route.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import home from "@/home.vue"
Vue.use(Router);

let routes = [
  {
    path: '/',
    //重点:没有登录页面首先要加载哪个页面在这里看
    //1.redirect只用于初始化时页面跳转到哪里，以后浏览器刷新不会走这里，2.绝对不能写'/home',必须是某个具体的页面
    redirect: "/vueHighUse"
  }, {
    path: '/login',
    component: (resolve) => require(["@/login.vue"], resolve),
  }, {
    path: '/home',
    name: 'home',
    component: home,
    // redirect:'/vueHighUse',
    children: [

      // 1级菜单+2级菜单
      {
        path: '/vueHighUse',
        name: 'vue高级用法',
        //重点，有2级菜单的1级菜单必须有component，且component必须是test.vue
        component: (resolve) => require(["@/views/test.vue"], resolve),
        // isShowChildMenu:true,
        children: [{
          path: '/routerLink',
          name: "router-link的使用",
          component: (resolve) => require(["@/views/vueHighUse/routerLink/routerLink.vue"], resolve),
          // isShowChildMenu:false,
          children: [{
            path: '/aa',
            name: "routerLink切换子组件1",
            component: (resolve) => require(["@/views/vueHighUse/routerLink/childComponents/aa.vue"], resolve)
          }, {
            path: '/bb',
            name: "routerLink切换子组件2",
            component: (resolve) => require(["@/views/vueHighUse/routerLink/childComponents/bb.vue"], resolve)
          }]
        },
        ],
        menuChildren: [{}],
        meta: {
          icon: 'el-icon-setting'
        }
      }
    ],
  }, {
    path: '/404',
    component: (resolve) => require(["@/404.vue"], resolve),
    name: '404'
  }, {
    path: '*',
    redirect: '/404'
  }
];
export default new Router({
  routes,
  mode: 'hash'
})
