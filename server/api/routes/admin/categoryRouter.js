const Router = require('core-router')([], 'admin.category')

Router.post('/', 'PostCreateCategoryController')
Router.put('/:id', 'PutUpdateCategoryController')
Router.delete('/', 'DeleteCategoryController')

module.exports = Router.getExpressRouter()
