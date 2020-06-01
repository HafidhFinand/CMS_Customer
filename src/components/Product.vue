<template>
    <div class="col-4 mb-3">
        <div class="card">
            <div class="card-header text-center">
                {{ product.name }}
            </div>
            <div class="card-body mt-2">
                <img :src="product.image_url" alt="">
                <div class="mini-body ml-4">
                    <p class="text-dark"> {{ priceInRupiah(product.price) }}</p>
                    <p class="text-dark"> Stock: {{ product.stock }}</p>
                    <button class="btn bg-secondary text-white">Add To Cart </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Product',
  props: ['product'],
  methods: {
    priceInRupiah (price) {
      const harga = price.toLocaleString()
      return `IDR ${harga}.00`
    }
  }
}
</script>

<style>
     .card {
        background-color:white !important;
        width: 310px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        padding: 10px;
        border-radius: 10px;
        height: 270px;
    }
    .card-body {
        display: flex;
        background-color:white;
        width: 280px;
    }
    .card-header {
        background-color:white !important;
        font-size: 1 rem;
        font-weight: bold;
    }
    .card-body img {
        width: 100px;
        height: 140px;
        margin-left: 0;
    }

    .card-body div p {
        color: white;
    }
    .mini-body {
        display: flex;
        flex-direction: column;
        align-content: center;
    }
    .card-body button {
        height: 60px;
    }
</style>
