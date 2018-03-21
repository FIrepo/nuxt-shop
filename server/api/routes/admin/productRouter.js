const Router = require('core-router')([], 'admin.product')

Router.get('/', 'GetListProductsController')
Router.delete('/', 'DeleteProductController')

module.exports = Router.getExpressRouter()
