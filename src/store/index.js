//vuex有多个文件时的写法

import Vue from 'vue'
import Vuex from 'vuex'
import GLOBAL from './modules/global.js'
import SINGLE from './modules/single.js'
Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        GLOBAL,
        SINGLE
    }
})
  