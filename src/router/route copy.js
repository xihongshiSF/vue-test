import Vue from 'vue'
import Router from 'vue-router'
import home from "@/home.vue"
Vue.use(Router);

let routes = [
  {
    path: '/',
    //重点:没有登录页面首先要加载哪个页面在这里看
    //1.redirect只用于初始化时页面跳转到哪里，以后浏览器刷新不会走这里，2.绝对不能写'/home',必须是某个具体的页面
    redirect: sessionStorage.firstRoute ? JSON.parse(sessionStorage.firstRoute) : "/keepAlive"
  }, {
    path: '/login',
    component: (resolve) => require(["@/login.vue"], resolve),
  }, {
    path: '/home',
    name: 'home',
    component: home,
    // redirect:'/vueHighUse',
    children: [
      //只有1级菜单，没有2级菜单
      {
        path: '/keepAlive1',
        name: '一级菜单',
        component: (resolve) => require(["@/views/vueHighUse/keepAlive/keepAlive.vue"], resolve),
        meta: {      //注意看附带的数据写在了meta里边，附带参数如果和name字段是同一级，在路由中找不到，不能用
          //标签权限
          tabList: [{
            label: "人名",//方法2和方法3都需要写
            name: "personName",             //前2个属性是方法2和方法3共有，第3个属性是方法2才有
            component: "personName"     //引入什么组件
          }, {
            label: "手机",
            name: "phone",
            component: "phone"
          }],
          icon: 'el-icon-setting'
        }
      },
      // 1级菜单+2级菜单
      {
        path: '/vueHighUse',
        name: 'vue高级用法',
        //重点，有2级菜单的1级菜单必须有component，且component必须是test.vue
        component: (resolve) => require(["@/views/test.vue"], resolve),  
        isShowChildMenu:true,
        children: [{
          path: 'keepAlive',
          name: '测试keep-alive用法',
          component: (resolve) => require(["@/views/vueHighUse/keepAlive/keepAlive.vue"], resolve),
          meta: {      //注意看附带的数据写在了meta里边，附带参数如果和name字段是同一级，在路由中找不到，不能用
            //标签权限
            tabList: [{
              label: "联系我们",//方法2和方法3都需要写
              name: "personName",             //前2个属性是方法2和方法3共有，第3个属性是方法2才有
              component: "personName"     //引入什么组件
            }, {
              label: "电话号码",
              name: "phone",
              component: "phone"
            }]
          }
        },{
          path:'routerLink',
          name:"router-link的使用",
          component: (resolve) => require(["@/views/vueHighUse/routerLink/routerLink.vue"], resolve),
          isShowChildMenu:false,
          children:[{
            path:'aa',
            name:"routerLink切换子组件1",
            component: (resolve) => require(["@/views/vueHighUse/routerLink/childComponents/aa.vue"], resolve)
          },{
            path:'bb',
            name:"routerLink切换子组件2",
            component: (resolve) => require(["@/views/vueHighUse/routerLink/childComponents/bb.vue"], resolve)
          }]
        }],
        meta: {
          icon: 'el-icon-setting'
        }
      }, {
        path: '/elements',
        name: 'elements练习',
        component: (resolve) => require(["@/views/test.vue"], resolve),
        children: [{
          path: '/eleTable',
          name: '合并 el-table 中的行和列',
          component: (resolve) => require(["@/views/elements/eleTable.vue"], resolve)
        }, {
          path: '/eleFormReg',
          name: '表单自定义验证',
          component: (resolve) => require(["@/views/elements/eleFormReg.vue"], resolve)
        }, {
          path: '/dynamicTable',
          name: '动态表格',
          component: (resolve) => require(["@/views/elements/dynamicTable.vue"], resolve),
          meta: {
            isKeepAlive: true
          }
        }],
        meta: {
          icon: 'el-icon-setting'
        }
      }, {
        path: '/echarts',
        name: 'echarts练习',
        component: (resolve) => require(["@/views/test.vue"], resolve),
        children: [
          {
            path: '/circularPie',
            name: '圆环饼状图',
            component: (resolve) => require(["@/views/echarts/circularPie.vue"], resolve)
          }/* ,{
          path: '/echarts2',
          name: 'echarts2',
          component:  (resolve)=>require(["@/views/echarts/echarts2.vue"],resolve)
        } */, {
            path: "/pieBar",
            name: "饼状图柱状图切换",
            component: (resolve) => require(["@/views/echarts/pieBar.vue"], resolve)
          }, {
            path: "/signalTimeChart",
            name: "信号持续时间图",
            component: (resolve) => require(["@/views/echarts/signalTimeChart.vue"], resolve)
          }, {
            path: "/erChart",
            name: "实体关系图",
            component: (resolve) => require(["@/views/echarts/erChart.vue"], resolve)
          }, {
            path: "/peopleRalation",
            name: "人物关系图",
            component: (resolve) => require(["@/views/echarts/peopleRalation.vue"], resolve)
          }, {
            path: "/autofillValue",
            name: "x轴时间自动补充",
            component: (resolve) => require(["@/views/echarts/autofillValue.vue"], resolve)
          }
          
        ],
        meta: {
          icon: 'el-icon-setting'
        }
      }, 
      {
        path: '/jsPlugin',
        name: 'js插件练习',
        component: (resolve) => require(["@/views/test.vue"], resolve),
        children: [
          {
            path: '/gojsToTree',
            name: 'gojs：json数据生成树',
            component: (resolve) => require(["@/views/jsPlugin/gojsToTree.vue"], resolve)
          },
          {
            path: '/flowChart',
            name: 'gojs：数据流程图',
            component: (resolve) => require(["@/views/jsPlugin/gojsToTree.vue"], resolve)
          },
          {
            path: '/knowledgeGraph',
            name: 'G6:知识图谱',
            component: (resolve) => require(["@/views/jsPlugin/gojsToTree.vue"], resolve)
          }
        ],
        meta: {
          icon: 'el-icon-setting'
        }
      }, 
      // 1级菜单+2级菜单+3级菜单
      {
        path: '/projectTest',
        name: '系统练习(有3级)',
        component: (resolve) => require(["@/views/test.vue"], resolve),    //一级菜单
        children: [{                                                 //二级菜单
          path: '/loginOtherSystem',
          name: '单点登录',
          component: (resolve) => require(["@/views/projectTest/loginOtherSystem.vue"], resolve)
        }, {
          path: '/option4',
          name: 'option4',
          component: (resolve) => require(["@/views/projectTest/option4/option4.vue"], resolve),
          children: [{                                               //三级菜单
            path: '/option5',
            name: 'option5',
            component: (resolve) => require(["@/views/projectTest/option4/option5.vue"], resolve)
          }]
        }, {
          path: '/iframeOtherSys',
          name: '使用iframe嵌套其它系统',
          component: (resolve) => require(["@/views/projectTest/iframeOtherSys.vue"], resolve),
        }],
        meta: {
          icon: 'el-icon-setting'
        }
      }, {
        path: '/cssIndex',
        name: 'css练习',
        component: (resolve) => require(["@/views/test.vue"], resolve),    //一级菜单
        children: [{                                                 //二级菜单
          path: '/transform',
          name: '文字旋转效果',
          component: (resolve) => require(["@/views/cssPractice/transform.vue"], resolve)
        }],
        meta: {
          icon: 'el-icon-setting'
        }
      }, {
        path: '/vuePractice',
        name: 'vuex练习',
        component: (resolve) => require(["@/views/test.vue"], resolve),    //一级菜单
        children: [{                                                 //二级菜单
          path: '/vuexMode',
          name: '使用vuex监控store数据变化',
          component: (resolve) => require(["@/views/vuexPractice/vuexMode.vue"], resolve)
        },{                                                 //二级菜单
          path: '/storeMode',
          name: 'Vue 简单状态管理—store模式',
          component: (resolve) => require(["@/views/vuexPractice/storeMode/storeMode.vue"], resolve)
        }],
        meta: {
          icon: 'el-icon-setting'
        }
      }, {
        path: '/cesiumMap',
        name: '3d地图练习',
        component: (resolve) => require(["@/views/cesiumMap.vue"], resolve),    //一级菜单
        meta: {
          icon: 'el-icon-setting'
        }
      }, {
        path: '/openlayer',
        name: '2d地图练习',
        component: (resolve) => require(["@/views/openlayerMap/openlayer.vue"], resolve), 
        meta: {
          icon: 'el-icon-setting'
        }
      }, {
        path: '/componentUse',
        name: '父子组件的应用',
        component: (resolve) => require(["@/views/test.vue"], resolve),    //一级菜单
        children: [{                                                 //二级菜单
          path: '/differentStyle',
          name: '同一子组件写不同样式',
          component: (resolve) => require(["@/views/componentUse/differentStyle.vue"], resolve)
        }],
        meta: {
          icon: 'el-icon-setting'
        }
      },{
        path:'sassUse',
        name:'sass的应用',
        component:(resolve) => require(["@/views/test.vue"], resolve),
        children:[{
          path:'/dialogManage',
          name:'系统文件管理',
          component: (resolve) => require(["@/views/sassUse/dialogManage.vue"], resolve)
        }]
      }],
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
  routes ,
  mode: 'hash' 
})
