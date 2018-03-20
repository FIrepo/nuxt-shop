const BaseController = require('core-controller')
const {UserModel} = require('core-model')
const {getUploadFile} = require('../../../utils/upload')
const helpers = require('core-helper')

module.exports = class GetOpenAvatarController extends BaseController {
  getResponse () {
    return UserModel.findOne({_id: helpers.toObjectId(this.getQuery('userId'))})
      .then(user => {
        if (!user) {
          return Promise.reject('user.userNotFound')
        }
        let imageUrl = process.env.UPLOAD_PATH + `/${user.avatar}`
        return getUploadFile(imageUrl)
          .then(imageData => {
            this.res.writeHead(200, {'Content-Type': 'image/jpeg'})
            return this.res.end(imageData)
          })
      })
      .catch(error => this.responseError(error))
  }
}
