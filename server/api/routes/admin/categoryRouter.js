const Router = require('core-router')([], 'admin.category')

Router.post('/', 'PostCreateCategoryController')

module.exports = Router.getExpressRouter()
