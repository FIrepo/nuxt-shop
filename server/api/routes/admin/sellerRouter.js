const Router = require('core-router')([], 'admin.seller')

Router.post('/', 'PostCreateSellerController')
Router.get('/', 'GetAllSellerController')
Router.put('/:id', 'PutAddSellerCategoryController')

module.exports = Router.getExpressRouter()
