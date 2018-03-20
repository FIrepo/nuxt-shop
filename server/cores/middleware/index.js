const path = require('path')
const helpers = require('core-helper')

let middleWares = {}
const controllerPath = path.join(process.cwd(), 'server/app/middlewares/')
const sepRegex = new RegExp(helpers.pregQuote(path.sep), 'g')
helpers.readDirRecursive(controllerPath)
  .forEach(middleware => {
    middleWares[helpers.removeExt(middleware.replace(controllerPath, '').replace(sepRegex, '.'))] = require(middleware)
  })

module.exports = {
  all () {
    return middleWares
  },
  exists (middleware) {
    return !!middleWares[middleware]
  },
  get (middleware) {
    return middleWares[middleware]
  }
}
