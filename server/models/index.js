require('../app/utils/load-env')
require('../app/utils/extend-methods')
const path = require('path')
const helper = require('core-helper')
const mongoose = require('mongoose')

let db = {}
let dbURI = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME

mongoose.connect(dbURI)

mongoose.connection.on('error', (error) => {
  console.log(error)
})

mongoose.connection.on('connected', () => {
  console.log(`Connected to ${dbURI}`)
})

helper.readDirRecursive({
  path: path.join(process.cwd(), '/server/models'),
  excludes: ['.', '..', path.basename(module.filename)]
})
  .forEach(file => {
    let model = (require(file).default)
      ? require(file).default : require(file)
    if (typeof model.modelName !== 'undefined') {
      db[model.modelName] = model
      db[model.modelName + 'Model'] = model
    }
  })

module.exports = db
