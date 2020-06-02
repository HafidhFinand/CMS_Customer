<template>
    <div>
        <div class="container">
            <div class="card cart mb-3">
                <div class="card-header text-center">
                </div>
                <div class="card-body mt-2 shoppingCart">
                    <img :src="shoppingCart.Product.image_url" alt="">
                    <p class="text-dark">{{ shoppingCart.quantity }}</p>
                    <p class="text-dark">{{shoppingCart.Product.price }}</p>
                    <button @click.prevent="addToCart" class="btn bg-secondary text-white">Add To Cart </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Cart',
  props: ['shoppingCart']
}
</script>

<style>
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
    .cart {
        width: 60%;
        margin: auto;
    }
</style>
