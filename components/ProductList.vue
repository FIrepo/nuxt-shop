<template>
    <section class="container-fluid">
        <div class="clear"></div>
        <div class="clear"></div>
        <div class="row">
            <div class="col-md-2 col-sm-12">
                <div>
                    <h5>Danh mục</h5>
                    <el-menu default-active="1"
                             class="el-menu-vertical-demo">
                        <el-menu-item v-for="category in $store.state.lstCategories" :key="category._id"
                                      v-model="cateId"
                                      @click="cateChange(category._id)" index="1">
                            <i class="el-icon-menu"></i>
                            <span>{{category.name}}</span>
                        </el-menu-item>
                    </el-menu>
                    <!--check box-->
                    <!--<el-checkbox v-for="category in $store.state.lstCategories" v-bind:label="category.name"-->
                    <!--@change="cateChange(category._id)" :key="category._id"></el-checkbox>-->
                </div>
                <div class="block">
                    <el-slider
                            v-model="value9"
                            range
                            show-stops
                            :max="10">
                    </el-slider>
                </div>
            </div>
            <div class="row col-md-10 col-sm-12">
                <div class="a-row">
                    <div class="row">
                        <div class="col-md-4">
                            Tìm thấy <strong>{{totalProduct}}</strong> sản phẩm
                        </div>
                        <div class="col-md-6 text-right">
                            <el-input placeholder="Nhập nội dung tìm kiếm" v-model="search" class="input-with-select">
                                <el-button slot="append" @click="searchProducts(search)"
                                           icon="el-icon-search"></el-button>
                            </el-input>
                        </div>
                    </div>
                </div>
                <product v-for="product in lstProducts" :key="product._id" :product="product"></product>
                <div class="d-block text-right mt-2 col-md-12">
                    <pagination :currentPage="displayedPage" :totalPost="totalProduct" :count="20"></pagination>
                    <!--<el-pagination-->
                            <!--background-->
                            <!--layout="prev, pager, next"-->
                            <!--:page-size="20"-->
                            <!--:current-page.sync="page"-->
                            <!--@current-change="handleCurrentChange"-->
                            <!--:total="total">-->
                    <!--</el-pagination>-->
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
        search: '',
        cateId: '',
        displayedPage: Number(this.$route.params.page) || 1,
        value9: [0, 0]
      }
    },
    beforeCreate () {
      return this.$store.dispatch('getCategories')
    },
    computed: {
      lstProducts () {
        return this.$store.getters.getListProducts
      },
      page () {
        return Number(this.$route.params.page) || 1
      },
      totalProduct () {
        return this.$store.getters.getCountProducts
      }
    },
    methods: {
      async searchProducts (search) {
        return this.$store.dispatch('getProducts', {search: search})
      },
      async cateChange (cateId) {
        return this.$store.dispatch('getProducts', {category: cateId})
      },
      async handleCurrentChange (page, search, cateId) {
        this.page = page
        this.search = search
        this.cateId = cateId
        this.$store.dispatch('getProducts', {page: page, search: search, category: cateId})
      }
    }
  }
</script>

<style scoped>
    .clear {
        padding-top: 30px;
    }

    .a-row {
        padding: 10px 30px;
        content: "";
        width: 100%;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        box-shadow: 1px 0 0 1px #DDD;
    }
</style>