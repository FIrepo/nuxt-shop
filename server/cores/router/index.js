const path = require('path')
const helpers = require('core-helper')
const Middlewares = require('core-middleware')
const ExpressRouter = require('express').Router
const BaseController = require('core-controller')

const methods = [
  'get', 'post', 'put', 'head', 'delete', 'options', 'trace', 'copy',
  'lock', 'mkcol', 'move', 'purge', 'propfind', 'proppatch', 'unlock',
  'report', 'mkactivity', 'checkout', 'merge', 'm-search', 'notify',
  'subscribe', 'unsubscribe', 'patch', 'search', 'connect'
]

let Controllers = {}
const controllerPath = path.join(process.cwd(), 'server/app/controllers/')
const sepRegex = new RegExp(helpers.pregQuote(path.sep), 'g')
helpers.readDirRecursive(controllerPath)
  .forEach(controller => {
    Controllers[helpers.removeExt(controller.replace(controllerPath, '').replace(sepRegex, '.'))] = require(controller)
  })

class Router {
  constructor (middlewares, controllerPrefix = '') {
    this.expressRouter = ExpressRouter()
    this.middlewares = this.getMiddlewares(middlewares)
    this.controllerPrefix = controllerPrefix ? (controllerPrefix + '.') : ''
  }

  getExpressRouter () {
    return this.expressRouter
  }

  setRouter (method, path, controller, middlewares) {
    method = method.toLowerCase()
    let parameters = [path]
    middlewares = this.getMiddlewares(middlewares)

    middlewares.before.push((req, res, next) => {
      req.controllerName = this.controllerPrefix + controller
      next()
      return null
    })

    middlewares.before = middlewares.before.concat(this.middlewares.before)
    middlewares.after = middlewares.after.concat(this.middlewares.after)
    parameters = parameters.concat(middlewares.before)
    parameters.push(this.getController(controller))
    parameters = parameters.concat(middlewares.after)

    return this.expressRouter[method].apply(this.expressRouter, parameters)
  }

  getMiddlewares (middlewares) {
    const defaultValue = {
      before: [],
      after: []
    }
    if (!middlewares) {
      return defaultValue
    }
    if (typeof middlewares === 'string' || helpers.isArray(middlewares)) {
      middlewares = Object.assign({}, defaultValue, {before: [].concat(middlewares)})
    }
    middlewares = Object.assign({}, defaultValue, middlewares)
    middlewares.before = helpers.map(middlewares.before, middleware => {
      if (!Middlewares.exists(middleware)) {
        throw new Error(`${middleware} does not exists.`)
      }
      return Middlewares.get(middleware)
    })
    middlewares.after = helpers.map(middlewares.after, middleware => {
      if (!Middlewares.exists(middleware)) {
        throw new Error(`${middleware} does not exists.`)
      }
      return Middlewares.get(middleware)
    })
    return middlewares
  }

  getController (controller) {
    if (controller.prototype instanceof BaseController) {
      return (req, res, next) => {
        let ctrl = new controller(req, res, next)
        ctrl.setController(controller)
        return ctrl.getResponse()
      }
    }
    if (typeof controller !== 'string') {
      return controller
    }
    controller = this.controllerPrefix + controller
    if (!Controllers[controller]) {
      throw new Error(`${controller} does not exists.`)
    }
    return (req, res, next) => {
      let Controller = Controllers[controller]
      let ctrl = new Controller(req, res, next)
      ctrl.setController(controller)
      return ctrl.getResponse()
    }
  }

  // noinspection JSUnusedGlobalSymbols
  getExpressApp (app, prefix = '') {
    return {
      use: (path, router, middlewares) => {
        let parameters = [prefix + path]
        parameters.push((req, res, next) => {
          req._params = req.params
          return next()
        })
        middlewares = this.getMiddlewares(middlewares)
        parameters = parameters.concat(middlewares.before)
        parameters.push(router)
        parameters = parameters.concat(middlewares.after)
        app.use.apply(app, parameters)
      }
    }
  }
}

methods.forEach(method => {
  if (!Router.prototype.hasOwnProperty(method)) {
    return Router.prototype[method] = function (path, controller, middlewares) {
      return this.setRouter(method, path, controller, middlewares)
    }
  }
})
module.exports = (middlewares, controllerPrefix) => {
  return new Router(middlewares, controllerPrefix)
}
