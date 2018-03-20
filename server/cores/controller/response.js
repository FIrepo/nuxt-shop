const coreError = require('core-error')
const helpers = require('core-helper')
const logger = require('core-logger')
const util = require('util')

module.exports = class Response {
  constructor (req, res, next) {
    this.req = req
    this.res = res
    this.next = next
  }

  getResponse () {
    return this.resJSON({controller: this.constructor.name || this.constructor})
  }

  static getResponseStructure () {
    return {
      message: coreError.getError('general.success'),
      messageCode: 'success',
      data: [{}]
    }
  }

  resJSON (data, extData) {
    if (typeof extData === 'string') {
      extData = coreError.error(extData)
    }
    if (extData instanceof Error) {
      extData = helpers.getAttributes(extData, ['message', 'messageCode'])
    }
    return this.res.json(Object.assign({}, Response.getResponseStructure(), {data}, extData))
  }

  responseError (error) {
    logger.error(`${this.getClassName()}: `, error)
    let extendData = {
      message: helpers.get(error, 'response.data.message', helpers.get(error, 'message'), coreError.getError('general.error')),
      messageCode: 'error'
    }
    if (error) {
      let errorObj = error
      if (helpers.isArray(error)) {
        errorObj = coreError.error(error.shift())
        errorObj.message = util.format(errorObj.message, error)
      }
      if (typeof error === 'string') {
        errorObj = coreError.error(error)
      }
      if (helpers.has(errorObj, 'messageCode')) {
        extendData = helpers.getAttributes(errorObj, ['message', 'messageCode'])
      }
    }
    return this.resJSON({}, extendData)
  }

  end () {
    return this.res.end()
  }

  setStatus (status) {
    return this.res.status(status)
  }
}
