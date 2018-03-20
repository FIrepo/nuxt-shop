const path = require('path')
const helpers = require('core-helper')

let configs = {}
const configPath = path.join(process.cwd(), 'server/config/')
const sepRegex = new RegExp(helpers.pregQuote(path.sep), 'g')

helpers.readDirRecursive(configPath)
  .forEach(config => {
    helpers.set(
      configs,
      helpers.removeExt(config.replace(configPath, ''))
        .replace(sepRegex, '.'),
      require(config)
    )
  })

module.exports = {
  all () {
    return configs
  },
  get (config) {
    return helpers.get(configs, config)
  }
}
