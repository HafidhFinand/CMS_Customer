<template>
    <div class="col-4 mb-3 list-product">
        <div class="card">
            <div class="card-header text-center">
                {{ product.name }}
            </div>
            <div class="card-body mt-2">
                <img :src="product.image_url" alt="">
                <div class="mini-body ml-4">
                    <p class="text-dark"> {{ priceInRupiah(product.price) }}</p>
                    <p class="text-dark"> Stock: {{ product.stock }}</p>
                    <a @click.prevent="addToCart" href="">
                      <i class="fas fa-shopping-cart mt-4 ml-2 fa-2x text-secondary"></i>
                      <span class="ml-2 text-secondary">Add To Cart</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name: 'Product',
  props: ['product'],
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    priceInRupiah (price) {
      const harga = price.toLocaleString()
      return `Rp. ${harga}.00`
    },
    goToMyCart () {
      const self = this
      setTimeout(function () {
        console.log('aseeek')
        self.$router.push('/mycart')
      }, 1000)
    },
    addToCart () {
      if (this.isLogin) {
        axios.post('http://localhost:3000/shoppingchart', {
          ProductId: this.product.id,
          quantity: 1
        }, {
          headers: {
            token: localStorage.token
          }
        })
          .then(response => {
            Swal.fire(
              'Good job!',
              'Succsessfully Add to Shopping Cart!',
              'success'
            )
            this.$store.dispatch('fetchShoppingCart')
            this.$store.dispatch('fetchListProducts')
            this.goToMyCart()
          })
          .catch(err => {
            err = err.response
            const { data } = err
            console.log(data)
          })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please Login First'
        })
      }
    }
  }
}
</script>

<style>
    .list-product .card {
        background-color:white !important;
        width: 310px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        padding: 10px;
        border-radius: 10px;
        height: 270px;
    }
    .list-product .card-body {
        display: flex;
        background-color:white;
        width: 280px;
    }
    .list-product .card-header {
        background-color:white !important;
        font-size: 1 rem;
        font-weight: bold;
    }
    .list-product .card-body img {
        width: 100px;
        height: 140px;
        margin-left: 0;
    }
    .list-product .card-body div p {
        color: white;
    }
    .list-product .mini-body {
        display: flex;
        flex-direction: column;
        align-content: center;
    }
    .list-product .card-body button {
        height: 60px;
    }
</style>
