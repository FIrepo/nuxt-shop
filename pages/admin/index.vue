<template>
    <div class="row">
        <div class="col-md-2 col-xs-12">
            <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                <el-menu-item index="1" @click="chooseMenu(1)">
                    <i class="el-icon-menu"></i>
                    <span>Products</span>
                </el-menu-item>
                <el-menu-item index="2" @click="chooseMenu(2)">
                    <i class="el-icon-setting"></i>
                    <span>Crawler</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="col-md-10 col-xs-12">
            <product-table v-if="menuIndex == 1"></product-table>
            <crawler v-if="menuIndex == 2"></crawler>
        </div>
    </div>
</template>

<script>
  import ProductTable from '~/components/ProductTable.vue'
  import Crawler from '~/components/Crawler.vue'

  export default {
    components: {
      ProductTable,
      Crawler
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
      chooseMenu(index) {
        this.menuIndex = index
      }
    },
    data() {
      return {
        menuIndex: 1
      }
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