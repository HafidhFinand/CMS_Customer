<template>
<div>
    <navbar></navbar>
    <cart v-for="(shoppingCart, i) in shoppingCarts" :key="i" :shoppingCart="shoppingCart"></cart>
    <h4 class="text-center mt-5 mb-5">
      Total Price: {{ priceInRupiah(totalPrice) }}
      <button @click.prevent="changeIsPaymentStatus" class="btn ml-2 btn-success">CHECKOUT</button>
    </h4>
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
      modalOpen: false,
      isShoppingCartEmpty: ''
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
      this.isShoppingCartEmpty = true
    }
  },
  created () {
    this.$store.dispatch('fetchShoppingCart')
  }
}
</script>

<style>
</style>
