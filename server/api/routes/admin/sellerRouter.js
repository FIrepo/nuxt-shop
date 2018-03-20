const Router = require('core-router')([], 'admin.seller')

Router.post('/', 'PostCreateSellerController')

module.exports = Router.getExpressRouter()
