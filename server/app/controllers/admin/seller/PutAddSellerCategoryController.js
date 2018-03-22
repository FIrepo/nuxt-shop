const BaseController = require('core-controller')
const {SellerModel, CategoryModel} = require('core-model')
const helper = require('core-helper')

module.exports = class PutAddSellerCategoryController extends BaseController {
  getResponse () {
    let data = this.getBody(['category_id', 'url'])
    let id = helper.toObjectId(this.getParam('id'))
    let currentSeller = null
    SellerModel.findOne({_id: id})
      .then(seller => {
        if (seller) {
          currentSeller = seller
          return CategoryModel.findOne({_id: data.category_id})
        } else {
          return Promise.reject('seller.notFound')
        }
      })
      .then(category => {
        currentSeller.categories.push({
          category: helper.toObjectId(data.category_id),
          url: data.url
        })
        return currentSeller.save()
      })
      .then(updated => {
        return this.resJSON(updated)
      })
      .catch((error) => {
        return this.responseError(error)
      })
  }
}
