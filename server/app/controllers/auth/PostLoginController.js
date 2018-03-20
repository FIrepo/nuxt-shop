const BaseController = require('core-controller')
const {UserModel} = require('core-model')
const helper = require('core-helper')

module.exports = class PostLoginController extends BaseController {
  getResponse () {
    return UserModel.findOne({email: this.getBody('email')})
      .then(user => {
        if (!user) {
          return Promise.reject('user.userNotFound')
        }
        return user.comparePassword(this.getBody('password'))
          .then(result => {
            if (!result) {
              return Promise.reject('user.wrongPassword')
            }
            user.accessToken = helper.randomString()
            return user.save()
          })
          .then(user => {
            let response = user.resUserData()
            response.token = user.generateTokenUser()
            this.req.session.user = response
            return this.resJSON(response)
          })
      })
      .catch((error) => {
        return this.responseError(error)
      })
  }
}
