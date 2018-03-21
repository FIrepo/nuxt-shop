const Router = require('core-router')([], 'admin.seller')

Router.post('/', 'PostCreateSellerController')
Router.get('/', 'GetAllSellerController')

module.exports = Router.getExpressRouter()
