<template>
    <div>
        <div class="search-group row">
            <div class="col-md-2">
                <h5 class="text-muted">{{total}} results</h5>
            </div>
            <div class="col-md-10 input-search row">
                <div class="col-md-9">
                    <el-input
                            placeholder="Search products"
                            v-model="search"
                            class="pull-right"
                            clearable>
                    </el-input>
                </div>
                <div class="col-md-3">
                    <el-button type="primary" round @click="searchProducts">Search</el-button>
                </div>
            </div>
        </div>
        <el-table
                border
                :data="listProducts"
                style="width: 100%"
                max-height="700">
            <el-table-column
                    sortable
                    fixed
                    prop="name"
                    label="Name"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="category.name"
                    label="Category">
            </el-table-column>
            <el-table-column
                    prop="seller.name"
                    label="Seller">
            </el-table-column>
            <el-table-column
                    sortable
                    prop="sale_price"
                    label="Sale Price">
            </el-table-column>
            <el-table-column
                    sortable
                    prop="price"
                    label="Regular Price">
            </el-table-column>

            <el-table-column
                    fixed="right"
                    label="Operations">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.$index, listProducts)" size="small">Edit</el-button>
                    <el-button @click="remove(scope.$index, listProducts)" type="danger" size="small">Remove</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="paging">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="20"
                    :current-page.sync="page"
                    @current-change="handleCurrentChange"
                    :total="total">
            </el-pagination>
        </div>

    </div>
</template>

<script>
  export default {
    name: 'product-table',
    methods: {
      edit(index, listProduct) {
        console.log('edit ' + index)
      },
      remove(index, listProduct) {
        this.$confirm('This will permanently delete the product. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(async () => {
          let id = listProduct[index]._id
          console.log('remove ', id)
          let response = await this.$axios.delete('admin/products/', {
            data: {delList: [id]}
          })
          response = response.data
          if (response.messageCode === 'success') {
            this.$message({
              type: 'success',
              message: 'Delete completed'
            })
            this.$store.dispatch('getProducts', {page: this.page})
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          })
        })
      },
      handleCurrentChange(page) {
        this.page = page
        this.$store.dispatch('getProducts', {page: page})
      },
      searchProducts () {
        this.$store.dispatch('getProducts', {search: this.search})
      }
    },
    data() {
      return {
        page: 1,
        search: ''
      }
    },

    computed: {
      listProducts() {
        return this.$store.state.listProduct
      },
      total() {
        return this.$store.state.countProducts
      }
    },

    beforeCreate() {
      this.$store.dispatch('getProducts', {page: 1})
    }
  }
</script>

<style scoped>
    .paging {
        text-align: center;
    }
    .search-group {
        margin: auto;
        padding: 10px;
        justify-content: space-between;
    }
    .input-search{
        max-width: 600px;

    }
</style>