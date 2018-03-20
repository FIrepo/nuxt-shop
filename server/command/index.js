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

const crawler = require('../app/utils/crawler')
crawler.tiki.product()