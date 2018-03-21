<template>
    <product-list></product-list>
</template>

<script>
  import ProductList from '../components/ProductList'

  export default {
    head () {
      return {
        title: 'Danh sách sản phẩm'
      }
    },
    components: {
      ProductList
    }
  }
</script>


<style scoped>
    body {
        margin-top: 20px;
        background: #eee;
        font-size: 13px;
        font-family: "Amazon Ember",Arial,sans-serif;
    }

</style>
