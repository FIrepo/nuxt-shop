const BaseController = require('core-controller')
const {ProductModel} = require('core-model')

module.exports = class GetListProductsController extends BaseController {
  getResponse () {
    const pagination = this.getPagination()
    let filter = this.getQuery(['search'])
    let query
    if (filter.search) {
      filter.$text = {$search: filter.search}
      delete filter.search
    }
    let count
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
        return this.resJSON(products, {totalProducts: count})
      })
      .catch(error => this.responseError(error))
  }
}
