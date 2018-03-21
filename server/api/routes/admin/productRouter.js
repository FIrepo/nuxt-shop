const Router = require('core-router')([], 'admin.product')

Router.get('/', 'GetListProductsController')

module.exports = Router.getExpressRouter()
