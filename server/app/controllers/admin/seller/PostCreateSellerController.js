const BaseController = require('core-controller')
const {SellerModel} = require('core-model')

module.exports = class PostCreateSellerController extends BaseController {
  getResponse () {
    let data = this.getBody(['name', 'accesstradeId'])
    SellerModel.create(data)
      .then(created => {
        this.resJSON(created)
      })
      .catch(err => this.responseError(err))
  }
}
