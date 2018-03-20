const BaseController = require('core-controller')
const {CategoryModel} = require('core-model')

module.exports = class PostCreateCategoryController extends BaseController {
  getResponse () {
    let data = this.getBody(['name'])
    CategoryModel.create(data)
      .then(created => {
        this.resJSON(created)
      })
      .catch(err => this.responseError(err))
  }
}
