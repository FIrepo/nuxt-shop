<template>
    <div class="row">
        <div class="col-md-2 col-xs-12">
            <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                <el-menu-item index="1">
                    <i class="el-icon-menu"></i>
                    <span>Navigator One</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="el-icon-setting"></i>
                    <span>Navigator Two</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="col-md-10 col-xs-12">
            <product-table></product-table>
        </div>
    </div>
</template>

<script>
  import ProductTable from '~/components/ProductTable.vue'

  export default {
    components: {
      ProductTable
    },
    name: 'admin',
    head() {
      return {
        title: 'Admin'
      }
    },
    beforeCreate() {
      if (!this.$store.state.user) {
        this.$nuxt.$router.replace({path: '/admin/login'})
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClick() {
        console.log('click')
      }
    },
    data() {
      return {}
    }
  }
</script>

<style scoped>
    .el-menu-vertical-demo {
        height: 100%;
        width: 100%;
        min-height: 100vh;
    }
</style>