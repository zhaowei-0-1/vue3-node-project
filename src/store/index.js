// 状态管理
import { createStore } from 'vuex'
// vuex-persistedstate数据持久化
import createPersistedState from "vuex-persistedstate";
// 创建了一个名为store的仓库
export default createStore({
  // 状态对象state
  state: {
    // 属性

    isGetterRouter: false, // 是不是第一次登录
    isCollapsed: false,
    userInfo: {}
  },
  // 每个 mutation 都有一个字符串的事件类型 (type)和一个回调函数 (handler)
  mutations: {
    // 方法 进行状态更改的地方

    changeGetterRouter(state, value) {
      state.isGetterRouter = value
    },
    // 控制侧边栏展开
    changeCollapsed(state) {
      state.isCollapsed = !state.isCollapsed
    },

    changeUserInfo(state, value) {
      state.userInfo = {
        ...state.userInfo,
        ...value
      }
    },

    clearUserInfo(state, value) {
      state.userInfo = {}
    },

  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    paths: ["isCollapsed", "userInfo"]//控制是否持久化
  })],
})
