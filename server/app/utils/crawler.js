const axios = require('axios')
const {PostModel, UserModel} = require('core-model')
const makeDesciption = require('../utils/seo-description')

const DEFAULT_URL = 'https://www.reddit.com/r/Jokes/top/.json'
const DEFAULT_TIME = 'day'

const Nightmare = require('nightmare')
const nightmare = Nightmare()

const crawler = {
  totalPost: 0,
  getRedditData: async function (url = DEFAULT_URL, time = DEFAULT_TIME, after = '') {
    if (!after) this.totalPost = 0
    url = url || DEFAULT_URL
    let crawlUrl = `${url}?t=${time}&after=${after}`
    console.log('start crawl url = ' + crawlUrl)
    let user = await UserModel.findOne().sort('createdAt')
    let response = await axios.get(crawlUrl)
    let listPosts = response.data.data.children
    after = response.data.data.after
    for (let i = 0, length = listPosts.length; i < length; i++) {
      let post = listPosts[i].data
      let slug = post.title.slug()
      if (slug.length > 60) {
        slug = slug.substring(0, 61)
        slug = slug.substring(0, slug.lastIndexOf('-'))
      }
      let newPost = {
        title: post.title,
        content: post.selftext_html,
        redditId: post.id,
        slug: slug,
        description: makeDesciption(post.selftext),
        tag: ['funny'],
        userId: user._id
      }

      let findPost = await PostModel.findOne({slug: newPost.slug})
      if (!findPost) {
        let createdPost = await PostModel.create(newPost)
        console.log(`Saved post with id = ${createdPost.redditId}.`)
        this.totalPost++
      }
    }
    if (after) {
      await this.getRedditData(url, time, after)
    } else {
      console.log(this.totalPost + ' new posts has been created.')
    }
  },

  crawl: async function () {
    // nightmare
    //   .goto('https://pub.accesstrade.vn/accounts/login')
    //   .type('#login_name', 'sontungpytn')
    //   .type('#password', '12345678')
    //   .click('#form-login button')
    //   .wait('#js-bootstrap-offcanvas')
    //   .evaluate(() => document.querySelector('div.header-user div.hidden-xs span').innerHTML)
    //   .end()
    //   .then(name => {
    //     console.log(name)
    //   })
    //   .catch(error => {
    //     console.error('Search failed:', error)
    //   })

    nightmare
      .goto('https://duckduckgo.com')
      .type('#search_form_input_homepage', 'github nightmare')
      .click('#search_button_homepage')
      .wait('#r1-0 a.result__a')
      .evaluate(() => document.querySelector('#r1-0 a.result__a').href)
      .end()
      .then(console.log)
      .catch(error => {
        console.error('Search failed:', error)
      })
  }
}

module.exports = crawler
