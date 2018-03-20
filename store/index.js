import Vuex from 'vuex'
import * as types from './mutation-types'

export default () => {
  return new Vuex.Store({
    state: {
      user: null
    },
    actions: {
      async nuxtServerInit ({commit, state}, {req, res}) {
        if (req.session && req.session.user) {
          commit(types.SET_USER, req.session.user)
        }
      },
      setUser ({commit}, user) {
        commit(types.SET_USER, user)
      }
    },
    mutations: {
      [types.SET_USER] (state, payload) {
        state.user = payload
      }
    },
    getters: {}
  })
}
