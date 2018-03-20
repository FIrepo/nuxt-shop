const helpers = require('core-helper')
const responseLimit = helpers.toUnsignedInt(process.env.RESPONSE_LIMIT)

module.exports = class Request {
  constructor (req, res, next) {
    this.req = req
    this.res = res
    this.next = next
  }

  getBody (fields, defaultValue, extData) {
    return this.getData('body', fields, defaultValue, extData)
  }

  getQuery (fields, defaultValue, extData) {
    return this.getData('query', fields, defaultValue, extData)
  }

  getHeader (fields, defaultValue, extData) {
    return this.getData('headers', fields, defaultValue, extData)
  }

  getParam (fields, defaultValue, extData) {
    return this.getData('params', fields, defaultValue, extData)
  }

  getRequestUser (fields, defaultValue, extData) {
    return this.getData('reqUser', fields, defaultValue, extData)
  }

  getData (type, fields, defaultValue, extData) {
    if (!fields) return this.req[type]
    if (!helpers.isArray(fields)) return helpers.get(this.req[type], fields, defaultValue)
    return helpers.assign({}, helpers.getAttributes(this.req[type], fields), extData)
  }

  getPagination () {
    return this.req.pagination(responseLimit)
  }
}
