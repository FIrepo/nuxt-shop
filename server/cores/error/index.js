const config = require('core-config')

module.exports = {
  error (errorObj) {
    if (errorObj instanceof Error) {
      return errorObj
    }
    const messageCode = 'errors.' + errorObj
    errorObj = config.get(messageCode)
    const error = new Error(errorObj.message || errorObj)
    error.messageCode = messageCode
    return error
  },
  rejectError (errorCode) {
    return Promise.reject(this.error(errorCode))
  },
  getError (errorCode) {
    return config.get('errors.' + errorCode)
  }
}
