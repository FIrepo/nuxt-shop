<template>
    <div>
        <button class="btn btn-primary">abc</button>
        <el-button>Default</el-button>
        <el-button type="primary">Primary</el-button>
        <el-button type="success">Success</el-button>
        <el-button type="info">Info</el-button>
        <el-button type="warning">Warning</el-button>
        <el-button type="danger">Danger</el-button>
    </div>
</template>

<script>
  export default {
    name: 'admin',
    head () {
      return {
        title: 'Admin'
      }
    },
    beforeCreate () {
      if (!this.$store.state.user) {
        this.$nuxt.$router.replace({path: '/admin/login'})
      }
    }
  }
</script>

<style scoped>

</style>