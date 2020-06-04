<template>
    <div>
        <div class="container">
            <div class="card cart mb-3">
                <div class="card-body mt-2 shoppingCart">
                    <img :src="shoppingCart.Product.image_url" alt="">
                    <div class="quantity-button">
                        <p class="text-center">Quantity: </p>
                        <a @click.prevent="subtractQuantity" href="">
                            <i class="fas fa-minus-circle ml-2"></i>
                        </a>
                        <input type="number" v-model="quantity">
                        <a @click.prevent="addQuantity" href="">
                            <i class="fas fa-plus-circle ml-2"></i>
                        </a>
                    </div>
                    <div class="price">
                        <p class="text-center">Price</p>
                        <p class="text-dark">{{ priceInRupiah(totalPricePerItem) }}</p>
                    </div>
                    <div class="si-button">
                      <button @click.prevent="removeShoppingCart" class="btn btn-danger trash">
                      <i class="fas fa-trash-alt fa-2x"></i>
                    </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
export default {
  name: 'Cart',
  props: ['shoppingCart'],
  computed: {
    totalPricePerItem () {
      return Number(this.shoppingCart.Product.price) * Number(this.quantity)
    }
  },
  data () {
    return {
      quantity: this.shoppingCart.quantity,
      input: 0
    }
  },
  watch: {
    quantity () {
      this.updateShoppingCart()
    }
  },
  methods: {
    addQuantity () {
      this.quantity += 1
      this.input = 1
    },
    subtractQuantity () {
      this.quantity -= 1
      this.input = -1
    },
    priceInRupiah (price) {
      const harga = price.toLocaleString()
      return `Rp. ${harga}.00`
    },
    updateShoppingCart: _.debounce(function () {
      axios.post('http://localhost:3000/shoppingchart', {
        ProductId: this.shoppingCart.Product.id,
        quantity: this.input
      }, {
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          this.$store.dispatch('fetchShoppingCart')
          this.$store.dispatch('fetchListProducts')
        })
        .catch(err => {
          err = err.response
          console.log(err)
        })
    }, 1000),
    removeShoppingCart () {
      const id = this.shoppingCart.id
      axios.delete(`http://localhost:3000/shoppingchart/${id}`, {
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          console.log('Success delete')
          this.$store.dispatch('fetchShoppingCart')
          this.$store.dispatch('fetchListProducts')
        })
        .catch(err => {
          err = err.response
          console.log(err)
        })
    }
  }
}
</script>

<style>
    .container .cart {
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .container .card img {
        width: 100px;
        height: 150px;
        margin: 0;
    }
    .shoppingCart {
        display: flex;
        justify-content: space-evenly;
        align-items: initial;
        align-content: flex-start;
    }
    .shoppingCart .quantity-button {
        padding-top: 40px;
    }
    .shoppingCart .trash {
        height: 50px;
        width: 50px;
    }
    .shoppingCart .trash i {
      padding: auto;
      margin:  auto;
    }
    .shoppingCart .si-button {
      padding-top: 40px;
    }
    .shoppingCart .price {
        padding-bottom: 0;
        margin-top: 0;
        padding-top: 40px;
    }
    .shoppingCart input {
        width: 40px;
        margin-left: 8px;
        margin-right: 0;
    }
    .cart {
        width: 60%;
        margin: auto;
    }
</style>
