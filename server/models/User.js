'use strict'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const hashLibs = require('../app/utils/hash')
const authLibs = require('../app/utils/auth')
const ignoreAttributes = ['password']
const helpers = require('core-helper')

const Schema = mongoose.Schema
const collection = 'User'

const UserSchema = new Schema({
  email: String,
  password: String,
  name: String,
  avatar: String,
  about: String,
  accessToken: String,
  createdAt: Date,
  updatedAt: Date
}, {
  versionKey: false,
  collection: collection
})

UserSchema.methods.comparePassword = function (password) {
  return hashLibs.compare(password, this.password)
}

UserSchema.methods.generateTokenUser = function () {
  let data = helpers.getAttributes(this, ['_id'])
  data.createdAt = helpers.timeNow()
  return authLibs.generateToken(data)
}

UserSchema.methods.resUserData = function () {
  let result = this.toJSON()
  ignoreAttributes.forEach(attr => delete result[attr])
  return result
}

UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = this.updatedAt = new Date()
  } else {
    this.updatedAt = new Date()
  }
  if (!this.isModified('password')) return next()
  return hashLibs.hash(this.password)
    .then(hashed => {
      this.password = hashed
      next()
    })
})
module.exports = mongoose.model(collection, UserSchema)
