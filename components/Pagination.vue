<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination pagination-sm">
      <li class="page-item" v-bind:class="{ 'disabled': hasPrevious}">
        <nuxt-link class="page-link" :to="`/${currentPage - 1}`">Quay lại</nuxt-link>
      </li>
      <li class="page-item" v-for="p in totalPage" :key="p" v-bind:class="{ 'active': isCurrent(p)}" v-if="allowRanger(p)">
        <nuxt-link class="page-link" :to="`/${p}`">{{ p }}</nuxt-link>
      </li>
      <li class="page-item" v-bind:class="{ 'disabled': hasNext}">
        <nuxt-link class="page-link" :to="`/${currentPage + 1}`">Tiếp</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'pagination',

    props: {
      totalPost: {type: Number, default: 0},
      currentPage: {type: Number, default: 0},
      count: {type: Number, default: 0}
    },
    methods: {
      isCurrent (p) {
        return p === this.currentPage
      },

      allowRanger (p) {
        if (p < this.currentPage) {
          return p > this.currentPage - 5 || p === 1
        } else if (p > this.currentPage) {
          return p < this.currentPage + 5 || p === this.totalPage
        } else {
          return true
        }
      }
    },

    computed: {
      totalPage () {
        if (this.totalPost === this.count) {
          return 1
        } else {
          if (this.totalPost % this.count === 0) {
            return Math.floor(this.totalPost / this.count)
          } else {
            return Math.floor(this.totalPost / this.count) + 1
          }
        }
      },

      hasNext () {
        return this.currentPage === this.totalPage
      },

      hasPrevious () {
        return this.currentPage === 1
      }
    }
  }
</script>

<style scoped>

</style>
