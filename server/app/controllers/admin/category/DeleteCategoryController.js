const BaseController = require('core-controller')
const {CategoryModel} = require('core-model')
const helpers = require('core-helper')

module.exports = class DeleteCategoryController extends BaseController {
  getResponse () {
    let delList = []
    this.getBody('delList').forEach(del => {
      delList.push(helpers.toObjectId(del))
    })
    if (this.getBody('delList').length === 0) {
      return this.responseError('category.delIdRequired')
    }
    return CategoryModel.deleteMany({_id: {$in: delList}})
      .then(result => {
        if (result.n === 0) {
          return Promise.reject('category.categoryNotFound')
        }
        let res = {
          categoryDeleted: result.n
        }
        this.resJSON(res)
      })
      .catch(err => this.responseError(err))
  }
}
