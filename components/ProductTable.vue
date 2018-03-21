<template>
    <div>
        <el-table
                :data="listProducts"
                style="width: 100%">
            <el-table-column
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
                    prop="sale_price"
                    label="Sale Price">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="Regular Price">
            </el-table-column>

            <el-table-column
                    fixed="right"
                    label="Operations">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.$index, listProducts)" type="text" size="small">Edit</el-button>
                    <el-button @click="remove(scope.$index, listProducts)" type="text" size="small">Remove</el-button>
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
      }
    },
    data() {
      return {
        page: 1
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
</style>