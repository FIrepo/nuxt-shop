'use strict'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const Schema = mongoose.Schema
const collection = 'Product'

const ProductSchema = new Schema({
  name: String,
  category: {
    type: Schema.ObjectId,
    ref: 'Category'
  },
  seller: {
    type: Schema.ObjectId,
    ref: 'Seller'
  },
  originId: String,
  price: Number,
  sale_price: Number,
  imageUrl: String,
  url: String
}, {
  versionKey: false,
  collection: collection
})

module.exports = mongoose.model(collection, ProductSchema)
