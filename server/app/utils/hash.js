const bscript = require('bcryptjs')
const config = require('core-config')

module.exports = {
  hash (password) {
    return bscript.hash(password, config.get('hash.saltLength'))
  },
  compare (rawString, hashedString) {
    return bscript.compare(rawString, hashedString)
  }
}
