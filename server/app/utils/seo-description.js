const striptags = require('striptags')
const delimiter = ').?!'

module.exports = (str) => {
  let description = striptags(str)
  description = description.substring(0, 160)
  let index = -1
  for (let i = 0; i < delimiter.length; i++) {
    let lastIndex = description.lastIndexOf(delimiter.charAt(i))
    index = (lastIndex > index) ? lastIndex : index
  }
  return description.substring(0, index)
}
