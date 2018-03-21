const BaseController = require('core-controller')
const {CategoryModel} = require('core-model')

module.exports = class GetAllCategoryController extends BaseController {
  getResponse () {
    return CategoryModel.find()
      .then(categories => {
        return this.resJSON(categories)
      })
      .catch(error => this.responseError(error))
  }
}
