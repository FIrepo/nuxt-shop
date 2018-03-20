const helper = require('core-helper')

const request = require('request-promise')
const cheerio = require('cheerio')
const {ProductModel} = require('core-model')
let totalPost = 0
let currentPage = 0

const crawler = {
  tiki: {
    category: async function () {
    },
    product: async function (url = 'https://tiki.vn/laptop-may-vi-tinh/c1846?src=mega-menu&order=newest', category, seller, maxPage = 10) {
      if (++currentPage <= maxPage) {
        if (url.indexOf('https://tiki.vn') < 0) {
          url = 'https://tiki.vn' + url
        }
        category = helper.toObjectId('5ab09312c1cbf629f482bc20')
        seller = helper.toObjectId('5ab0c8724088242f1892b4eb')
        let options = {
          uri: url,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36'
          },
          transform: function (body) {
            return cheerio.load(body)
          }
        }

        let $ = await request(options)
        let listProducts = $('.product-box-list .product-item')

        await listProducts.each(async function (index) {
          let item = $(this)
          if (item.attr('class').indexOf('flash-sale') < 0) {
            let product = new ProductModel()
            product.originId = item.attr('data-id')
            product.name = item.attr('data-title')
            product.category = category
            product.seller = seller
            product.url = item.find('a').attr('href')
            product.imageUrl = item.find('img').attr('src')
            product.price = item.find('.price-regular').text()
            product.discount = item.find('.sale-tag').text()
            product.sale_price = item.find('.price-sale').children().remove().end().text().trim()
            await product.save()
            console.log(++totalPost)
          }
        })
        let current = $('.list-pager .current')
        let nextLink = current.parent().next().children().attr('href')
        await this.tikiCrawler(nextLink)
      } else {
        console.log(totalPost + ' has been saved')
      }
    }
  }
}

module.exports = crawler
