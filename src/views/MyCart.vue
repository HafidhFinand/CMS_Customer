<template>
<div>
    <navbar></navbar>
    <cart v-for="(shoppingCart, i) in shoppingCarts" :key="i" :shoppingCart="shoppingCart"></cart>
    <h4 class="text-center mt-2">Total Harga: {{ priceInRupiah(totalPrice) }}</h4>
    <button @click.prevent="changeIsPaymentStatus" class="btn btn-success">CHECKOUT</button>
    <modal name="hello-world">
      <StripeCheckout v-show="isPayment"></StripeCheckout>
    </modal>
</div>
</template>

<script>
import navbar from '../components/Navbar'
import cart from '../components/Cart'
import StripeCheckout from '../components/StripeCheckout'
export default {
  name: 'Dasboard',
  components: {
    navbar,
    cart,
    StripeCheckout
  },
  data () {
    return {
      totalPrice: '',
      isPayment: false,
      modalOpen: false
    }
  },
  methods: {
    priceInRupiah (price) {
      const harga = price.toLocaleString()
      return `Rp. ${harga}.00`
    },
    changeIsPaymentStatus () {
      this.isPayment = true
      this.$modal.show('hello-world')
    }
  },
  computed: {
    shoppingCarts () {
      return this.$store.state.shoppingCarts
    }
  },
  watch: {
    shoppingCarts () {
      let sum = 0
      for (let i = 0; i < this.shoppingCarts.length; i++) {
        sum += (Number(this.shoppingCarts[i].Product.price) * Number(this.shoppingCarts[i].quantity))
      }
      this.totalPrice = sum
    }
  },
  created () {
    this.$store.dispatch('fetchShoppingCart')
  }
}
</script>

<style>
</style>
