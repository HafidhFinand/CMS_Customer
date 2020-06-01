<template>
    <div>
        <div class="">
            <div class="card">
                <div class="card-header text-center">
                    
                </div>
                <div class="card-body mt-2">
                    <img src="" alt="">
                    <div class="mini-body ml-4">
                        <p class="text-dark"> {{ priceInRupiah(product.price) }}</p>
                        <p class="text-dark"> Stock: {{ product.stock }}</p>
                        <button @click.prevent="addToCart" class="btn bg-secondary text-white">Add To Cart </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style>
</style>
