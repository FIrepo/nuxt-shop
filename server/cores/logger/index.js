const isDebug = process.env.NODE_DEBUG === 'true'
let logger = {}
Object.keys(console)
  .forEach(method => {
    logger[method] = function () {
      if (!isDebug) return
      console[method].apply(console, arguments)
    }
  })
module.exports = logger
