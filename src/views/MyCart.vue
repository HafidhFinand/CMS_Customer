<template>
<div>
    <navbar></navbar>
    <cart v-for="(shoppingCart, i) in shoppingCarts" :key="i" :shoppingCart="shoppingCart"></cart>
    <h4>Total Harga: {{ totalPrice }}</h4>
</div>
</template>

<script>
import navbar from '../components/Navbar'
import cart from '../components/Cart'
export default {
  name: 'Dasboard',
  components: {
    navbar,
    cart
  },
  data () {
    return {
      totalPrice: ''
    }
  },
  computed: {
    shoppingCarts () {
      console.log(typeof this.$store.state.shoppingCarts)
      return this.$store.state.shoppingCarts
    }
  },
  methods: {
    calculateTotalPrice () {
      console.log(typeof this.$store.state.shoppingCarts)
      console.log(this.$store.state.shoppingCarts)
    }
  },
  created () {
    this.$store.dispatch('fetchShoppingCart')
    console.log(this.$store.state.shoppingCarts)
  }
}
</script>

<style>
</style>
