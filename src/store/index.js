import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: '',
    listProducts: '',
    shoppingCarts: [],
    transactions: []
  },
  mutations: {
    changeLoginStatus (state, payload) {
      this.state.isLogin = payload
    },
    getProductsData (state, payload) {
      const unFilteredProducts = payload
      const filteredProducts = unFilteredProducts.filter(element => {
        return element.stock > 0
      })
      this.state.listProducts = filteredProducts
    },
    getShoppingCart (state, payload) {
      this.state.shoppingCarts = payload
    },
    getTransactions (state, payload) {
      this.state.transactions = payload
    }
  },
  actions: {
    fetchListProducts ({ commit }) {
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
    },
    fetchShoppingCart ({ commit }) {
      axios.get('http://localhost:3000/shoppingchart', {
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          let { data } = response
          data = data.ShoppingCharts
          commit('getShoppingCart', data)
        })
        .catch(err => {
          err = err.response
          const { data } = err
          console.log(data)
        })
    },
    fetchTransactions ({ commit }) {
      axios.get('http://localhost:3000/users/transactions', {
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          let { data } = response
          data = data.Transactions
          console.log(data)
          commit('getTransactions', data)
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
