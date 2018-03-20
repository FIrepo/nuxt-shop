const helpers = require('core-helper')
const maxLimit = helpers.toUnsignedInt(process.env.MAX_LIMIT) || 1000

module.exports = (req, res, next) => {
  req.pagination = (limit = 20) => {
    let page = (helpers.toUnsignedInt(req.query.page) || 1) - 1
    let size = helpers.toUnsignedInt(req.query.size) || limit
    if (size > maxLimit) {
      size = limit
    }
    return {
      skip: size * page,
      limit: size,
      currentPage: page,
      nextPage: page + 1,
      size
    }
  }
  return next()
}
