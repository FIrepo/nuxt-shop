// const crawler = require('../app/utils/crawler')
// const program = require('commander')
// const validTime = ['day', 'week', 'month', 'year', 'all']
//
// program
//   .version('0.0.1')
//   .description('Reddit Crawler')
//
// program
//   .command('Jokes <time>')
//   .alias('j')
//   .description('Crawl jokes from reddit')
//   .action(async time => {
//     if (validTime.includes(time)) {
//       // await crawler.getRedditData('', time)
//       await crawler.crawl()
//     } else {
//       console.log('Invalid time. The valid times is ' + validTime.toString())
//     }
//     process.exit()
//   })
//
// program.parse(process.argv)

const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

// nightmare
//   .goto('https://duckduckgo.com')
//   .insert('#search_form_input_homepage', 'github nightmare')
//   .click('#search_button_homepage')
//   .wait('#r1-0 a.result__a')
//   .evaluate(() => document.querySelector('#r1-0 a.result__a').href)
//   .end()
//   .then(console.log)
//   .catch(error => {
//     console.error('Search failed:', error)
//   })

// let link = ['https://tiki.vn/dung-bao-gio-di-an-mot-minh-tai-ban-2015-p461653.html?src=bestseller-page',
//   'https://tiki.vn/doc-vi-bat-ky-ai-de-khong-bi-lua-doi-va-loi-dung-p335501.html?src=bestseller-page']

nightmare
  .goto('https://pub.accesstrade.vn/accounts/login')
  .insert('#login_name', 'sontungpytn')
  .insert('#password', '12345678')
  .click('#form-login button')
  .wait('#js-bootstrap-offcanvas')
  .goto('https://pub.accesstrade.vn/tools/product_links?campaign_id=4348614231480407268')
  .wait('#js-bootstrap-offcanvas')
  .insert('#url', 'https://tiki.vn/dung-bao-gio-di-an-mot-minh-tai-ban-2015-p461653.html?src=bestseller-page')
  .click('.btn-complete')
  .wait('.success_block')
  .evaluate(() => document.querySelector('.success_block input').value)
  .end()
  .then(name => {
    console.log(name)
  })
  .catch(error => {
    console.error('Search failed:', error)
  })

