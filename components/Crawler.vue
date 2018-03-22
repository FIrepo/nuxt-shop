<template>
    <div class="crawler-container">
       <div class="crawler">
           <h4 class="text-dark">Choose seller and category to crawl data</h4>
           <div class="form-group">
               <p class="text-muted">Seller</p>
               <select class="form-control" id="exampleFormControlSelect1" v-model="seller" @change="updateCategory">
                   <option :value="seller._id" v-for="seller in sellers" :key="seller._id" >{{seller.name}}</option>
               </select>
           </div>
           <div class="form-group">
               <p class="text-muted">Category</p>
               <select class="form-control" id="exampleFormControlSelect2" v-model="category">
                   <option :value="cate._id" v-for="(cate, index) in categories" :key="cate._id" >{{cate.category.name}}</option>
               </select>
           </div>
           <button class="btn btn-primary" @click="startCrawler">Start Crawler</button>
       </div>
    </div>
</template>

<script>
  export default {
    name: 'crawler',
    async beforeCreate() {
      let response = await this.$axios.get('admin/sellers')
      response = response.data
      console.log(response)
      if (response.messageCode === 'success') {
        let sellers = response.data
        this.$store.dispatch('setSellers', sellers)
      }
    },
    data() {
      return {
        seller: '',
        categories: [],
        category: ''
      }
    },
    computed: {
      sellers() {
        return this.$store.state.sellers
      }
    },
    methods: {
      updateCategory() {
        this.sellers.forEach(item => {
          if (this.seller === item._id) {
            this.categories = item.categories
          }
        })
      },
      startCrawler() {
        let url = ''
        let categoryId = ''
        this.categories.forEach(item => {
          if (this.category === item._id) {
            url = item.url
            categoryId = item.category._id
          }
        })
        this.$message({
          type: 'info',
          message: 'Crawler is running in background'
        })
        this.$axios.post('admin/products/crawler', {
          category: categoryId,
          seller: this.seller,
          url: url
        })
          .then((res) => {
            if (res.data.messageCode === 'success') {
              this.$message({
                type: 'success',
                message: res.data.data.total + 'products have been crawled'
              })
            }
          })
      }
    }
  }
</script>

<style scoped>
    .crawler-container{
        background: #fafafa;
        min-height: 100vh;
    }
    .crawler {
        padding-top: 50px;
        max-width: 600px;
        margin: 0 auto;
    }
    .title {
        font-weight: bold;
    }
</style>