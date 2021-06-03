let state = {
  menuData: JSON.parse(sessionStorage.getItem("menuData")) || {},
  tabList: [],
  storeData: "变化前111",     //测试依赖vuex仓库数据的改变而改变的普通变量值有没有变化
  authData:JSON.parse(sessionStorage.getItem("authData"))||"",       //测试权限数据
  isShowPage:false,
  firstRoute:JSON.parse(sessionStorage.getItem("authData"))||''
};

let getters = {
  menuData: state => state.menuData,
  tabList: state => state.tabList,
  storeData: state => state.storeData,
  authData: state => state.authData,
  isShowPage: state => state.isShowPage,
  firstRoute: state => state.firstRoute

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
    sessionStorage.setItem("authData", JSON.stringify(data));
    state.authData = data;
  },
  //得到权限后是否渲染页面
  setIsShowPage(state, data){
    state.isShowPage = data;
  },
  setFirstRoute(state, data){
    sessionStorage.setItem("firstRoute", JSON.stringify(data));
    state.firstRoute = data;
  },
};

export default {
  namespaced:true,   //注意这里是重点，为true时不同的store里边可以有相同名称的变量
  state,
  getters,
  mutations
}