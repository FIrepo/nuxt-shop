import ItemList from './PostList.vue'

const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)

// This is a factory function for dynamically creating root-level list views,
// since they share most of the logic except for the type of items to display.
// They are essentially higher order components wrapping ItemList.vue.
export default function createListView () {
  return {
    asyncData ({store, route: {params: {page}}}) {
      return store.dispatch('getProducts', {page: page || 1})
    },

    head () {
      if (typeof this.$route.params.name === 'undefined') {
        return {
          title: camelize(type) + ' | 9Laugh.com'
        }
      } else {
        return {
          title: camelize(this.$route.params.name) + ' | 9Laugh.com'
        }
      }
    },

    render (h) {
      return h(ItemList)
    }
  }
}
