const BaseController = require('core-controller')
const {CategoryModel} = require('core-model')
const helpers = require('core-helper')

module.exports = class PutUpdateCategoryController extends BaseController {
  getResponse () {
    return CategoryModel.findByIdAndUpdate(
      helpers.toObjectId(this.getParam('id')),
      this.getBody(['name'])
    )
      .then(result => {
        if (result === null) {
          return Promise.reject('category.categoryNotFound')
        }
        return this.resJSON(result)
      })
      .catch(err => this.responseError(err))
  }
}
