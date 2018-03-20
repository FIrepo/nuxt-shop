const BaseController = require('core-controller')
const {UserModel} = require('core-model')

module.exports = class PostCreateUserController extends BaseController {
  getResponse () {
    let data = this.getBody(['email', 'password', 'name', 'avatar'])
    return UserModel.findOne({email: data.email})
      .then(user => {
        if (user) {
          return Promise.reject('user.userExisted')
        }
        return UserModel.create(data)
      })
      .then(created => {
        return this.resJSON(created)
      })
      .catch(error => this.responseError(error))
  }
}
