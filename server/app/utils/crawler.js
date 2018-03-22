const helper = require('core-helper')

const request = require('request-promise')
const cheerio = require('cheerio')
const {ProductModel, CategoryModel, SellerModel} = require('core-model')

const crawler = {
  total: 0,
  currentPage: 0,
  tiki: {
    category: async function () {
      let url = 'https://tiki.vn'
      let options = {
        uri: url,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36'
        },
        transform: function (body) {
          return cheerio.load(body)
        }
      }
      let tikiSeller = await SellerModel.findOne({_id: '5ab0c8724088242f1892b4eb'})
      console.log(tikiSeller)
      let $ = await request(options)
      let listCategories = $('.main-nav-wrap>ul>li')
      listCategories.each(async function (index) {
        let item = $(this)
        let category = new CategoryModel()
        let categoryUrl = await item.find('a').first().attr('href')
        category.name = await item.find('a>span').last().text()
        await category.save()
        console.log('---------------')
        console.log(categoryUrl)
        console.log(category._id)
        // let cateItem = {
        //   category: category._id,
        //   url: categoryUrl
        // }
        // tikiSeller.categories.push(cateItem)
        // await tikiSeller.save()
      })
    },
    sproduct: async function (url = 'https://tiki.vn/laptop-may-vi-tinh/c1846?src=mega-menu&order=newest', category, seller, maxPage = 10) {
      if (++crawler.currentPage <= maxPage) {
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
            let salePrice = item.find('.price-sale').children().remove().end().text().trim()
            product.sale_price = +(salePrice.replace(/\D/g, ''))
            let searchProduct = await ProductModel.findOne({originId: product.originId})
            if (!searchProduct) {
              await product.save()
              console.log(++crawler.total)
            }
          }
        })
        let current = $('.list-pager .current')
        let nextLink = current.parent().next().children().attr('href')
        await crawler.tiki.sproduct(nextLink)
      } else {
        console.log(crawler.total + ' has been saved')
      }
    },
    product: async function (url, category, seller, maxPage = 10) {
      if (++crawler.currentPage <= maxPage) {
        if (url.indexOf('https://tiki.vn') < 0) {
          url = 'https://tiki.vn' + url
        }
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
            let salePrice = item.find('.price-sale').children().remove().end().text().trim()
            product.sale_price = +(salePrice.replace(/\D/g, ''))
            let searchProduct = await ProductModel.findOne({originId: product.originId})
            if (!searchProduct) {
              await product.save()
              console.log(++crawler.total)
            }
          }
        })
        let current = $('.list-pager .current')
        let nextLink = current.parent().next().children().attr('href')
        await crawler.tiki.product(nextLink, category, seller, maxPage)
      } else {
        console.log(crawler.total + ' has been saved')
      }
    }
  }
}

module.exports = crawler
