<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      USERS
    </h1>

    <a href="https://tiki.vn/dien-thoai-samsung-galaxy-j7-pro-hang-chinh-hang-p655609.html?src=category-page">phone</a>
  </section>
</template>

<script>
// import axios from '~/plugins/axios'

export default {
  head () {
    return {
      title: 'Users'
    }
  }
}
</script>

<style scoped>
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
</style>
