import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: '',
    listProducts: ''
  },
  mutations: {
    changeLoginStatus (state, payload) {
      this.state.isLogin = payload
    },
    getProductsData (state, payload) {
      this.state.listProducts = payload
    }
  },
  actions: {
    fetchListProducts ({ commit }) {
      console.log('haha')
      axios.get('http://localhost:3000/products/customer?s=')
        .then(response => {
          let { data } = response
          data = data.Products
          commit('getProductsData', data)
        })
        .catch(err => {
          err = err.response
          const { data } = err
          console.log(data)
        })
    },
    searchProduct ({ commit }, payload) {
      axios.get(`http://localhost:3000/products/customer?s=${payload}`, {
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          let { data } = response
          data = data.Products
          commit('getProductsData', data)
        })
        .catch(err => {
          err = err.response
          const { data } = err
          console.log(data)
        })
    }
  },
  modules: {
  }
})
