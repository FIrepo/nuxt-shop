import ItemList from './ProductList.vue'

// This is a factory function for dynamically creating root-level list views,
// since they share most of the logic except for the type of items to display.
// They are essentially higher order components wrapping ItemList.vue.
export default function createListView () {
  return {
    asyncData ({store, route: {params: {page}}}) {
      return store.dispatch('getProducts', {page: page || 1})
    },

    head () {
      return {
        title: 'Danh sách sản phẩm'
      }
    },

    render (h) {
      return h(ItemList)
    }
  }
}
