const BaseController = require('core-controller')
const {SellerModel} = require('core-model')

module.exports = class GetAllSellerController extends BaseController {
  getResponse () {
    return SellerModel.find()
      .then(sellers => {
        return this.resJSON(sellers)
      })
      .catch(error => this.responseError(error))
  }
}
