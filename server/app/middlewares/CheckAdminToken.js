const helpers = require('core-helper')
const authLibs = require('../utils/auth')
const {UserModel} = require('core-model')
const config = require('core-config')

module.exports = (req, res, next) => {
  if (req.reqUser) {
    return next()
  }
  return authLibs.verifyToken(helpers.get(req.headers, 'authorization', ''))
    .then(({_id}) => {
      return UserModel.findOne({_id: _id})
    })
    .then(user => {
      if (!user) {
        return Promise.reject('UserDoesNotExists')
      }
      req.reqUser = user
      next()
      return null
    })
    .catch(() => {
      const messageCode = 'auth.requireAuthenticate'
      const response = config.get('errors.' + messageCode)
      response.messageCode = messageCode
      return res.json(response)
    })
}
