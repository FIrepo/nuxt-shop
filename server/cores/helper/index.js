const lodash = require('lodash')
const path = require('path')
const fs = require('fs')
const {Types} = require('mongoose')

const helpers = {
  /**
   * @example
   * let data = {key: 'value1', key2: 2, key3: {subKey: 'subValue'}, key5: 'value_key_5'};
   *
   * getAttributes(data, ['key', 'key3']);
   * @return  result {key: 'value1', key3: {subKey: 'subValue'}};
   *
   * getAttributes(data, ['key', {key3: {key9: ''}}]);
   * @return  result {key: 'value1', key9: {subKey: 'subValue'}};
   *
   * getAttributes(data, ['key', {key4: {defaultKey: 'defaultValue'}}]);
   * @return  result {key: 'value1', key4: {defaultKey: 'defaultValue'}};
   *
   * getAttributes(data, ['key', {key4: {defaultKey: 'defaultValue'}}]);
   * @return  result {key: 'value1', key4: {defaultKey: 'defaultValue'}};
   *
   * getAttributes(data, ['key', {key5: lodash.camelCase}]);
   * @return  result {key: 'value1', key5: 'valueKey5'};
   *
   */
  getAttributes (data, keys) {
    let res = {}
    keys.forEach(key => {
      if (typeof key === 'string' && typeof data[key] !== 'undefined'
      ) {
        return res[key] = data[key]
      }
      if (lodash.isObject(key)) {
        let objKey = Object.keys(key)[0]
        if (lodash.isFunction(key[objKey])) {
          return res[key[objKey](objKey)] = lodash.get(data, objKey)
        }
        if (lodash.isObject(key[objKey])) {
          let keys = Object.keys(key[objKey])
          if (keys.length) {
            return res[keys[0]] = lodash.get(data, objKey, key[objKey][keys[0]])
          }
        }
        return res[objKey] = lodash.get(data, objKey, key[objKey])
      }
    })

    return res
  },
  /**
   * @param options Object|String
   * @param options.path String
   * @param options.extensions Array
   * @param options.excludes Array
   *
   * @return Array
   */
  readDirRecursive (options) {
    if (typeof options === 'string') {
      options = {path: options}
    }
    if (!options.path) {
      throw new Error('Path option is required.')
    }
    options = Object.assign({}, {
      extensions: ['.js'],
      excludes: ['.', '..']
    }, options)
    let results = []
    fs.readdirSync(options.path)
      .forEach(file => {
        const fullFilePath = path.join(options.path, file)
        if (fs.statSync(fullFilePath).isDirectory()) {
          results = results.concat(this.readDirRecursive(Object.assign({}, options, {path: fullFilePath})))
          return
        }
        if ((!options.extensions.length || options.extensions.inArray(path.extname(file))) && (!options.excludes.length || !options.excludes.inArray(file))) {
          results.push(fullFilePath)
        }
      })

    return results
  },
  /**
   * @example removeExt('cores/helper/index.js') => 'cores/helper/index'
   * @param fileName String
   *
   * @return String
   */
  removeExt (fileName) {
    return (fileName + '').replace(path.extname(fileName), '')
  },
  /**
   * @example toUnsignedInt('abc') => 0
   * @example toUnsignedInt('0') => 0
   * @example toUnsignedInt('1') => 1
   * @example toUnsignedInt('-1') => 0
   * @example toUnsignedInt('-1', 2) => 2
   *
   * @param value Mixed
   * @param defaultValue=0 Mixed
   *
   * @return String
   */
  toUnsignedInt (value, defaultValue = 0) {
    value = lodash.toInteger(value)
    return value < 0 ? defaultValue : value
  },
  stripTags (input, allowed) {
    // eslint-disable-line camelcase
    //   example 1: strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>')
    //   returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'
    //   example 2: strip_tags('<p>Kevin <img src="someimage.png" onmouseover="someFunction()">van <i>Zonneveld</i></p>', '<p>')
    //   returns 2: '<p>Kevin van Zonneveld</p>'
    //   example 3: strip_tags("<a href='http://kvz.io'>Kevin van Zonneveld</a>", "<a>")
    //   returns 3: "<a href='http://kvz.io'>Kevin van Zonneveld</a>"
    //   example 4: strip_tags('1 < 5 5 > 1')
    //   returns 4: '1 < 5 5 > 1'
    //   example 5: strip_tags('1 <br/> 1')
    //   returns 5: '1  1'
    //   example 6: strip_tags('1 <br/> 1', '<br>')
    //   returns 6: '1 <br/> 1'
    //   example 7: strip_tags('1 <br/> 1', '<br><br/>')
    //   returns 7: '1 <br/> 1'
    // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    allowed = (lodash.toString(allowed).toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('')
    const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi
    const commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi
    return lodash.toString(input).replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
      return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : ''
    })
  },
  timeNow () {
    return new Date().toISOString()
  },
  timeNowObj () {
    return new Date()
  },
  pregQuote (str, delimiter) {
    //   example 1: preg_quote("$40")
    //   returns 1: '\\$40'
    //   example 2: preg_quote("*RRRING* Hello?")
    //   returns 2: '\\*RRRING\\* Hello\\?'
    //   example 3: preg_quote("\\.+*?[^]$(){}=!<>|:")
    //   returns 3: '\\\\\\.\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:'
    return (str + '')
      .replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&')
  },
  toObjectId (stringId) {
    try {
      return Types.ObjectId(stringId)
    } catch (error) {
      return null
    }
  },

  randomString (length = 15) {
    let text = ''
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)) }
    return text
  }
}

module.exports = Object.assign({}, lodash, helpers)
