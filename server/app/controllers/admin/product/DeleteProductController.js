const BaseController = require('core-controller')
const {ProductModel} = require('core-model')
const helpers = require('core-helper')

module.exports = class DeleteProductController extends BaseController {
  getResponse () {
    let delList = []
    this.getBody('delList').forEach(del => {
      delList.push(helpers.toObjectId(del))
    })
    if (this.getBody('delList').length === 0) {
      return this.responseError('product.delIdRequired')
    }
    return ProductModel.deleteMany({_id: {$in: delList}})
      .then(result => {
        if (result.n === 0) {
          return Promise.reject('product.productNotFound')
        }
        let res = {
          productDeleted: result.n
        }
        this.resJSON(res)
      })
      .catch(err => this.responseError(err))
  }
}
