const BaseController = require('core-controller')
const {UserModel} = require('core-model')
const {uploadFile} = require('../../../utils/upload')

module.exports = class PostUploadAvatar extends BaseController {
  getResponse () {
    return UserModel.findOne({_id: this.getQuery('userId')})
      .then(user => {
        if (!user) {
          return Promise.reject('user.userNotFound')
        }
        return uploadFile(this.req)
          .then(imageName => {
            return user.update({avatar: imageName})
          })
      })
      .then(updated => {
        return this.resJSON(updated)
      })
  }
}
