const headers = [];
['X-Requested-With', 'Authorization', 'Content-Type', 'User-Agent']
  .forEach(header => {
    headers.push(header)
    headers.push(header.toLowerCase())
  })
module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', headers)
  res.header('Access-Control-Allow-Methods', ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'])
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  return next()
}
