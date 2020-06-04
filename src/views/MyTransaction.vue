<template>
    <div>
        <navbar></navbar>
        <div class="container">
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                      <th> No </th>
                      <th> Product Name</th>
                      <th> Quantity </th>
                      <th> Total Price </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(transaction, i) in transactions" :key="i">
                        <td>{{ i + 1 }}</td>
                        <td>{{ transaction.Product.name }}</td>
                        <td>{{ transaction.quantity }}</td>
                        <td>{{ priceInRupiah(transaction.Product.price * transaction.quantity) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import navbar from '../components/Navbar'
export default {
  name: 'MyTransaction',
  components: {
    navbar
  },
  data () {
    return {
      isTransaction: false
    }
  },
  watch: {
    transactions () {
      this.isTransaction = true
    }
  },
  computed: {
    transactions () {
      return this.$store.state.transactions
    }
  },
  methods: {
    priceInRupiah (price) {
      const harga = price.toLocaleString()
      return `Rp. ${harga}.00`
    }
  },
  created () {
    this.$store.dispatch('fetchTransactions')
  }
}
</script>

<style>
</style>
