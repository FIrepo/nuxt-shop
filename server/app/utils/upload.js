const Formidable = require('formidable')
const UPLOAD_PATH = process.env.UPLOAD_PATH || './server/public/uploads'
const fs = require('fs')
const path = require('path')

function getMaxFileSize (mbSize) {
  return mbSize * 1024 * 1024
}

function getExtenti (fileName) {
  return path.extname(fileName + '').toLowerCase()
}

function getUploadPath (fileName) {
  return path.join(UPLOAD_PATH, fileName)
}

function endStreamAndRemove (writeStream) {
  if (!(writeStream instanceof fs.WriteStream)) {
    return
  }
  if (writeStream.closed) {
    return removeFile(writeStream.path)
  }

  return writeStream.end(() => removeFile(writeStream.path))
}

function removeFile (file) {
  fs.access(file, fs.constants.R_OK | fs.constants.W_OK, err => {
    if (err) {
      return
    }
    return fs.unlink(file)
  })
}

exports.uploadFile = (req) => {
  return new Promise((resolve, reject) => {
    let form = new Formidable.IncomingForm()
    form.uploadDir = UPLOAD_PATH
    form.keepExtensions = true
    form.maxFieldsSize = getMaxFileSize(parseFloat(process.env.MAX_FILE_SIZE) || 10)
    form.parse(req, (error, fields, files) => {
      if (error) {
        reject(error)
      }
      resolve(files[''].path.split('\\')[3])
    })
  })
}

exports.getUploadFile = (imageUrl) => {
  return new Promise((resolve, reject) => {
    fs.readFile(imageUrl, (error, imageData) => {
      if (error) {
        reject(error)
      }
      resolve(imageData)
    })
  })
}
