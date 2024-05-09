import { getToken, setToken, removeToken } from '@/utils/auth'
import { getUserInfo, login } from '@/api/user'

const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}
const getters = {}
const actions = {
  async login(context, data) {
    console.log(data)
    // 调用登录接口
    const token = await login(data)
    context.commit('setToken', token)
  },
  // 获取用户基本资料
  async getUserInfo(context, data) {
    const result = await getUserInfo()
    state.userInfo = result
    context.commit('setUserInfo', result)
  },
  // 退出登录action
  logout(context) {
    context.commit('removeToken') // 删除token
    context.commit('setUserInfo', {}) // 删除用户信息
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
