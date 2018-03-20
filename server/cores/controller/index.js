const aggregation = require('core-aggregation')

const Request = require('./request')
const Response = require('./response')

module.exports = class BaseController extends aggregation(Request, Response) {
  constructor (req, res, next) {
    super(req, res, next)
    this.req = req
    this.res = res
    this.next = next
  }

  getClassName () {
    return this.constructor.name
  }

  setController (controller) {
    this.controller = controller
  }
}
