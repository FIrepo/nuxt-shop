const BaseController = require('core-controller')

module.exports = class PostLogoutController extends BaseController {
  getResponse () {
    delete this.req.session.user
    this.resJSON({})
  }
}
