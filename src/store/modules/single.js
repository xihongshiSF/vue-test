let state = {
    menuData: JSON.parse(sessionStorage.getItem("menuData")) || {},
    tabList11: [],
    storeData11: "变化前111",     //测试依赖vuex仓库数据的改变而改变的普通变量值有没有变化
    authData11:"权限改变前"       //测试权限数据
  };
  
  let getters = {
    menuData: state => state.menuData,
    tabList11: state => state.tabList11,
    storeData11: state => state.storeData11,
    authData11: state => state.authData11
  };
  
  let mutations = {
    //设置用户信息
    setMenu(state, data) {
      sessionStorage.setItem("menuData", JSON.stringify(data));
      state.menuData = data;
    },
    //设置当前应该渲染的标签页
    setTabList11(state, data) {
      state.tabList11 = data;
    },
    //监控store数据变化
    setStoreData11(state, data) {
      state.storeData11 = data;
    },
    //设置权限
    setAuthData11(state, data){
      state.authData11 = data;
    }
  };

  export default {
    namespaced:true,
    state,
    getters,
    mutations
  }