const Router = require('core-router')([], 'admin.category')

Router.post('/', 'PostCreateCategoryController')
Router.put('/:id', 'PutUpdateCategoryController')
Router.delete('/', 'DeleteCategoryController')
Router.get('/', 'GetAllCategoryController')

module.exports = Router.getExpressRouter()
