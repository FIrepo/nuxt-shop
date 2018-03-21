import Vuex from 'vuex'
import * as types from './mutation-types'

export default () => {
  return new Vuex.Store({
    state: {
      user: null,
      listProduct: [],
      countProducts: 0
    },
    actions: {
      async nuxtServerInit ({commit, state}, {req, res}) {
        if (req.session && req.session.user) {
          commit(types.SET_USER, req.session.user)
        }
      },
      async getProducts ({commit}, param) {
        let url = `admin/products?page=${param.page}`
        console.log('param.page ', param.page)
        const ip = await this.$axios.$get(url)
        commit(types.SET_LIST_PRODUCT, {ip})
      },
      setUser ({commit}, user) {
        commit(types.SET_USER, user)
      }
    },
    mutations: {
      [types.SET_USER] (state, payload) {
        state.user = payload
      },
      [types.SET_LIST_PRODUCT] (state, payload) {
        state.listProduct = payload.ip.data
        state.countProducts = payload.ip.totalProducts
      }
    },
    getters: {
      getListProducts: state => {
        return state.listProduct
      },
      getCountProducts: state => {
        return state.countProducts
      }
    }
  })
}
