const CoreRouter = require('core-router')
const Router = CoreRouter()

module.exports = (app, prefix = '') => {
  const expressApp = Router.getExpressApp(app, prefix)
  expressApp.use('/login', (() => {
    const SubRouter = CoreRouter()
    SubRouter.post('/', 'auth.PostLoginController')
    SubRouter.post('/token', 'auth.PostLoginByTokenController')
    return SubRouter.getExpressRouter()
  })())
  expressApp.use('/logout', (() => {
    const SubRouter = CoreRouter()
    SubRouter.post('/', 'auth.PostLogoutController')
    return SubRouter.getExpressRouter()
  })())
}
