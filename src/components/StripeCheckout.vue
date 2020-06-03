<template>
  <div class="wrapper">
    <stripe-elements
      ref="elementsRef"
      :pk="publishableKey"
      :amount="amount"
      locale="en"
      @token="tokenCreated"
      @loading="loading = $event"
    >
    </stripe-elements>
    <button @click="submit">Pay ${{amount / 100}}</button>
  </div>
</template>

<script>
import { StripeElements } from 'vue-stripe-checkout'
import axios from 'axios'
export default {
  components: {
    StripeElements
  },
  data: () => ({
    loading: false,
    amount: 0,
    publishableKey: 'pk_test_ncogX2Sft3un45ttbbk7jFUs00i14yoloI',
    token: null,
    charge: null,
    productId: []
  }),
  computed: {
    shoppingCarts () {
      return this.$store.state.shoppingCarts
    }
  },
  methods: {
    submit () {
      this.$refs.elementsRef.submit()
    },
    calculateAmount () {
      let sum = 0
      for (let i = 0; i < this.shoppingCarts.length; i++) {
        sum += (Number(this.shoppingCarts[i].Product.price) * Number(this.shoppingCarts[i].quantity))
      }
      this.amount = sum
    },
    tokenCreated (token) {
      this.token = token
      this.calculateAmount()
      // for additional charge objects go to https://stripe.com/docs/api/charges/object
      this.charge = {
        source: token.id,
        amount: this.amount, // the amount you want to charge the customer in cents. $100 is 1000 (it is strongly recommended you use a product id and quantity and get calculate this on the backend to avoid people manipulating the cost)
        description: this.description // optional description that will show up on stripe when looking at payments
      }
      this.sendTokenToServer(this.charge)
    },
    sendTokenToServer (charge) {
      const listProductId = this.shoppingCarts.map(el => {
        return el.Product.id
      })
      this.productId = listProductId
      this.productId = JSON.stringify(this.productId)
      axios.post('http://localhost:3000/shoppingchart/checkout', {
        listProductId: this.productId,
        customerData: charge
      }, {
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          console.log('Transaksi Berhasil')
          this.$store.dispatch('fetchShoppingCart')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
  .wrapper {
    width: 600px;
    margin: 0 auto;
    height: 100%;
  }
</style>
