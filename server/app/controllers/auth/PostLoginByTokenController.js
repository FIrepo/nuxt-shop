const BaseController = require('core-controller')
const {UserModel} = require('core-model')
const authLibs = require('../../utils/auth')
const helper = require('core-helper')

module.exports = class PostLoginByTokenController extends BaseController {
  getResponse () {
    // tét push
    let data = this.getBody(['token', 'accessToken'])
    return authLibs.verifyToken(data.token)
      .then(userData => {
        return UserModel.findOne({_id: userData._id})
      })
      .then(user => {
        if (!user) {
          return Promise.reject('user.userNotFound')
        }
        if (user.accessToken !== data.accessToken) {
          return Promise.reject('auth.wrongAccessToken')
        }
        user.accessToken = helper.randomString()
        return user.save()
      })
      .then(saved => {
        let user = saved.resUserData()
        user.token = saved.generateTokenUser()
        this.req.session.user = user
        return this.resJSON(user)
      })
      .catch(error => this.responseError(error))
  }
}
