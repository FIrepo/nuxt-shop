const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY

module.exports = {
  generateToken (data) {
    return jwt.sign(data, secretKey, { expiresIn: '15d' })
  },
  verifyToken (token) {
    return new Promise((resolve, reject) => {
      if (!token.length) {
        return reject('Authorization')
      }
      const userData = jwt.verify(token.replace('Bearer ', ''), secretKey)
      if (!userData) {
        return reject()
      }
      return resolve(userData)
    })
  }
}
