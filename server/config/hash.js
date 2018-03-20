const helpers = require('core-helper')
module.exports = {
  saltLength: helpers.toUnsignedInt(process.env.SALT_LENGTH) || 10
}
