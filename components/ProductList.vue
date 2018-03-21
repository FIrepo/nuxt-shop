<template>
    <section class="container-fluid">
        <product v-for="product in lstProducts" :key="product.id" :product="product"></product>
        <div class="d-block text-right mt-2">
            <pagination :currentPage="displayedPage" :totalPost="totalProduct" :count="10" :type="path"></pagination>
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

      path () {
        return this.type
      },

      totalProduct () {
        return this.$store.getters.getCountProducts
      }
    }
  }
</script>

<style scoped>

</style>