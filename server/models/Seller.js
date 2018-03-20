'use strict'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const Schema = mongoose.Schema
const collection = 'Seller'

const Seller = new Schema({
  name: String,
  categories: [
    {
      category: {
        type: Schema.ObjectId,
        ref: 'Category'
      },
      url: String
    }
  ]
}, {
  versionKey: false,
  collection: collection
})

module.exports = mongoose.model(collection, Seller)
