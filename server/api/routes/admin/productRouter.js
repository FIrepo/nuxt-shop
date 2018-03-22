const Router = require('core-router')([], 'admin.product')

Router.get('/', 'GetListProductsController')
Router.delete('/', 'DeleteProductController')
Router.post('/crawler', 'PostStartCrawlerController')
Router.post('/upload', 'PostReadXmlFileController')

module.exports = Router.getExpressRouter()
