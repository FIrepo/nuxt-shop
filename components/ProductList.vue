<template>
    <section class="container-fluid">
        <div class="row">
            <div class="clear"></div>
            <div class="col-md-12 a-row">
                1-20 of <strong>{{total}}</strong> products
            </div>
            <div class="col-md-2 col-sm-12">
                Left
            </div>
            <div class="row col-md-10 col-sm-12">
                <product v-for="product in lstProducts" :key="product.id" :product="product"></product>
                <div class="d-block text-right mt-2">
                    <pagination :currentPage="displayedPage" :totalPost="totalProduct" :count="20"></pagination>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
  import Product from './Product'
  import Pagination from './Pagination'

  export default {
    name: 'product-list',
    components: {
      Product,
      Pagination
    },
    data () {
      return {
        displayedPage: Number(this.$route.params.page) || 1,
        lstProducts: this.$store.getters.getListProducts,
        total: this.$store.getters.getCountProducts
      }
    },
    computed: {
      page () {
        return Number(this.$route.params.page) || 1
      },
      totalProduct () {
        return this.$store.getters.getCountProducts
      }
    }
  }
</script>

<style scoped>

</style>