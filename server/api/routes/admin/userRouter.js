const Router = require('core-router')([], 'admin.user')

Router.get('/', 'GetListUsersController')
Router.post('/create', 'PostCreateUserController')
Router.post('/upload-avatar', 'PostUploadAvatar')
Router.get('/avatar', 'GetOpenAvatarController')

module.exports = Router.getExpressRouter()
