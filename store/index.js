import request from '~/assets/utils/request'
import cookie from '~/assets/utils/cookie'

export const state = () => ({
  needLogin: false
})

export const mutations = {
  // setNeedLogin (state, status) {
  //   state.needLogin = status
  // }
}

export const actions = {
  getUserInfo ({ commit }) {
    let user_id = cookie.getCookie('_user_id')
  }
}
