const BaseController = require('core-controller')
const {ProductModel} = require('core-model')
const helper = require('core-helper')

module.exports = class GetListProductsController extends BaseController {
  getResponse () {
    const pagination = this.getPagination()
    let filter = this.getQuery(['search', 'category'])
    let query
    if (filter.search) {
      filter.$text = {$search: filter.search}
      delete filter.search
    } else if (filter.category) {
      filter = {category: helper.toObjectId(filter.category)}
    } else if (filter.search && filter.category) {
      filter = {
        $text: {$search: filter.search},
        category: helper.toObjectId(filter.category)
      }
    }
    let count
    console.log('filter ', filter)
    query = ProductModel.find(filter)
      .populate('seller')
      .populate('category')
    return query.exec()
      .then(totalProducts => {
        count = totalProducts.length
        query.skip(pagination.skip)
          .limit(pagination.limit)
        return query.exec()
      })
      .then(products => {
        let listProducts = JSON.parse(JSON.stringify(products))
        listProducts.forEach(product => {
          product.sale_price = helper.vndFormat(product.sale_price)
        })
        return this.resJSON(listProducts, {totalProducts: count})
      })
      .catch(error => this.responseError(error))
  }
}
