const BaseController = require('core-controller')
const {UserModel} = require('core-model')

module.exports = class GetListUsersController extends BaseController {
  getResponse () {
    return UserModel.find({})
      .then(users => {
        return this.resJSON(users)
      })
      .catch(error => this.responseError(error))
  }
}
