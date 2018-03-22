const BaseController = require('core-controller')
const crawler = require('../../../utils/crawler')
const helper = require('core-helper')

module.exports = class PostCreateSellerController extends BaseController {
  getResponse () {
    console.log('run crawler')
    crawler.total = 0
    crawler.currentPage = 0
    let data = this.getBody(['url', 'seller', 'category', 'maxPage'])
    data.category = helper.toObjectId(data.category)
    data.seller = helper.toObjectId(data.seller)
    crawler.tiki.product(data.url, data.category, data.seller, data.maxPage)
      .then(total => {
        return this.resJSON({total: crawler.total})
      })
      .catch(error => this.responseError(error))
  }
}
