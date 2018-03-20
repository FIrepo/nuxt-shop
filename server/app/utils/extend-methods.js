const helpers = require('core-helper')
const validate = require('validate.js')
const slug = require('./slug')

Array.prototype.findAndRemove = function (callback) {
  const index = this.findIndex(callback)
  if (index === -1) {
    return undefined
  }
  return this.splice(index, 1)[0]
}
Array.prototype.inArray = function (callback) {
  if (typeof callback === 'function') {
    return this.findIndex(callback) !== -1
  }
  return this.indexOf(callback) !== -1
}
validate.validators.isString = (value) => {
  if (helpers.isUndefined(value)) {
    return
  }
  if (!helpers.isString(value)) {
    return 'must be a string'
  }
}

validate.validators.isUnsignedInt = (value, options, key, attributes) => {
  if (helpers.isUndefined(value)) {
    return
  }
  if (helpers.get(options, 'cast')) {
    attributes[key] = helpers.toUnsignedInt(value)
    return
  }
  if (!helpers.isInteger(value)) {
    return 'must be a unsigned integer'
  }
}
validate.validators.isInteger = (value, options, key, attributes) => {
  if (helpers.isUndefined(value)) {
    return
  }
  if (helpers.get(options, 'cast')) {
    attributes[key] = helpers.toInteger(value)
    return
  }
  if (!helpers.isInteger(value)) {
    return 'must be a integer'
  }
}
validate.validators.stripTags = (value, options, key, attributes) => {
  if (helpers.isUndefined(value)) {
    return
  }
  if (helpers.isBoolean(options)) {
    attributes[key] = helpers.stripTags(value)
  } else {
    attributes[key] = helpers.stripTags(value, options)
  }
}
validate.validators.trim = (value, options, key, attributes) => {
  if (helpers.isUndefined(value)) {
    return
  }
  attributes[key] = helpers.trim(value)
}

validate.validators.inArray = (value, options, key) => {
  if (helpers.isUndefined(value)) return
  if (options.indexOf(value) === -1) {
    return `^${key}: ${value} not valid (accept value: ${options.join(',')}).`
  }
}
validate.validators.isArray = function (value, options, key, attributes) {
  if (!value) return
  if (helpers.isBoolean(options) && !helpers.isArray(value)) {
    return validate.format(`^${key} not an array.`)
  }
  for (let option in options) {
    value = [].concat(value)
    // noinspection JSUnfilteredForInLoop
    value = value.map(tmpVal => helpers[option](tmpVal))
  }
  attributes[key] = value
}

function getData (data, key) {
  let defVal = '{{' + key + '}}'
  let result = defVal
  key.split('.')
    .forEach(objKey => {
      if (data[objKey]) {
        result = data[objKey]
        data = result
      } else {
        result = defVal
      }
    })
  return result
}
String.prototype.template = function (data) {
  let str = this + ''
  if (!str || !data) {
    return str
  }
  (this.match(/\{\{([a-zA-Z_\.]+)\}\}/g) || [])
    .forEach(variable => {
      str = str.replace(variable, getData(data, variable.replace(/([^a-zA-Z_\.]+)/g, '')))
    })
  return str
}
String.prototype.ucfirst = function () {
  return this.charAt(0).toUpperCase() + this.substr(1)
}

String.prototype.slug = function (separator = '-') {
  return slug(this + '', separator)
}
