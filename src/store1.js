// vuex只有一个文件时的写法

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let state = {
  menuData: JSON.parse(sessionStorage.getItem("menuData")) || {},
  tabList: [],
  storeData: "变化前111",     //测试依赖vuex仓库数据的改变而改变的普通变量值有没有变化
  authData:"权限改变前"       //测试权限数据
};

let getters = {
  menuData: state => state.menuData,
  tabList: state => state.tabList,
  storeData: state => state.storeData,
  authData: state => state.authData
};

let mutations = {
  //设置用户信息
  setMenu(state, data) {
    sessionStorage.setItem("menuData", JSON.stringify(data));
    state.menuData = data;
  },
  //设置当前应该渲染的标签页
  setTabList(state, data) {
    state.tabList = data;
  },
  //监控store数据变化
  setStoreData(state, data) {
    state.storeData = data;
  },
  //设置权限
  setAuthData(state, data){
    state.authData = data;
  }
};

// Action去comit一个mutation。它要指定去commit哪一个mutation，然后指定结束之后要做什么什么事情就要给出一个函数，
//所以说mutation的构成有两点名称和函数。
let actions={
  setMenuAsync ({ commit }) {
    setTimeout(() => {
      commit('setMenu')
    }, 1000)
  }
}


//mutations和actions的区别：
//mutations一定是同步请求，看不到变化过程，只能看到最终结果；actions是异步请求，可以看到变化过程和结果
//比如：计算settimeout((){count++},1000)，使用mutations打印出来count变化过程为0，结果为10；使用actions打印出来count变化过程为0-10，结果为10

export default new Vuex.Store({
  getters,
  state,
  mutations,
  actions
})

