const BaseController = require('core-controller')
// const helper = require('core-helper')
const formidable = require('formidable')
const fs = require('fs')

module.exports = class PostReadXmlFileController extends BaseController {
  getResponse () {
    let form = new formidable.IncomingForm()
    console.log(123)
    form.parse(this.req, function(err, fields, files) {
      if (err) {
        return this.responseError(err)
      }
      // fs.readFile(files.upload.path, function (err, data) {
      //   if (err) {
      //     return this.responseError(err)
      //   }
      //   console.log(parser.toJson(data))
      // })
    })
  }
}
