const Router = require('core-router')()
const userRouter = require('./admin/userRouter')
const categoryRouter = require('./admin/categoryRouter')
const sellerRouter = require('./admin/sellerRouter')
const productRouter = require('./admin/productRouter')

module.exports = (app, prefix = '') => {
  const expressApp = Router.getExpressApp(app, prefix)

  expressApp.use('/categories', categoryRouter)
  expressApp.use('/sellers', sellerRouter)
  expressApp.use('/products', productRouter)
  // expressApp.use('/users', userRouter, ['CheckAdminToken']);
  expressApp.use('/users', userRouter)
}
