const Router = require('core-router')()
const userRouter = require('./admin/userRouter')
const categoryRouter = require('./admin/categoryRouter')
const sellerRouter = require('./admin/sellerRouter')

module.exports = (app, prefix = '') => {
  const expressApp = Router.getExpressApp(app, prefix)

  expressApp.use('/categories', categoryRouter)
  expressApp.use('/sellers', sellerRouter)
  // expressApp.use('/users', userRouter, ['CheckAdminToken']);
  expressApp.use('/users', userRouter)
}
