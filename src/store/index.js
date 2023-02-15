import Vue from 'vue'
import Vuex from 'vuex'
// 引入modules中的配置
import login from './modules/login'
import home from './modules/home'
import mainArea from './modules/mainArea'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    login,
    home,
    mainArea
  },
  getters: {
    token: (state) => state.login.token,
    asideList: (state) => state.mainArea.asideList
  }
})
// console.log(store)
export default store
