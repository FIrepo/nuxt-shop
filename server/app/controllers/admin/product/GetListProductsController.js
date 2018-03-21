const BaseController = require('core-controller')
const {ProductModel} = require('core-model')

module.exports = class GetListProductsController extends BaseController {
  getResponse () {
    const pagination = this.getPagination()
    let filter = this.getQuery(['search'])
    // if (filter.search) {
    //   filter.$text = {$search: filter.search}
    //   delete filter.search
    // }
    let count
    // let query = ProductModel.aggregate([
    //   {$match: filter},
    //   {$lookup: {from: 'Seller', localField: 'seller', foreignField: '_id', as: 'seller'}},
    //   {$lookup: {from: 'Category', localField: 'category', foreignField: 'category._id', as: 'category'}},
    //   {
    //     $project: {
    //       _id: 1,
    //       originId: 1,
    //       name: 1,
    //       category: 1,
    //       url: 1,
    //       imageUrl: 1,
    //       price: 1,
    //       discount: 1,
    //       sale_price: 1,
    //       'seller._id': 1,
    //       'seller.name': 1,
    //       'category.name': 1
    //     }
    //   }
    // ])
    // query.exec()
    let query = ProductModel.find()
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
