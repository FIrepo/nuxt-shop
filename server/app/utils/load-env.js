const path = require('path')
const dotEnv = require('dotenv')
const helpers = require('core-helper')

dotEnv.config({
  path: path.join(process.cwd(), '.env.' + helpers.get(process.env, 'NODE_ENV', 'development'))
})

module.exports = dotEnv
