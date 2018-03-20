'use strict'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const Schema = mongoose.Schema
const collection = 'Category'

const CategorySchema = new Schema({
  name: String
}, {
  versionKey: false,
  collection: collection
})

module.exports = mongoose.model(collection, CategorySchema)
