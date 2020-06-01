<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <input type="text" v-model="keyword" placeholder="Search Product..." @keyup="searchProduct" class="form-control mt-5">
      <div class="row mt-5">
      <product v-for="(product, i) in listProducts" :key="i" :product="product"></product>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from '../components/Navbar'
import product from '../components/Product'
import _ from 'lodash'
export default {
  name: 'Home',
  components: {
    navbar,
    product
  },
  data () {
    return {
      keyword: ''
    }
  },
  computed: {
    listProducts () {
      return this.$store.state.listProducts
    }
  },
  methods: {
    searchProduct: _.debounce(function () {
      this.$store.dispatch('searchProduct', this.keyword)
    }, 1000)
  }
}
</script>

<style>
  * {
      font-size: 14px;
  }
</style>
