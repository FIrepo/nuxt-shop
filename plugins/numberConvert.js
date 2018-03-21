export default {
  format(n, currency) {
    return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' ' + currency
  },

  vndFormat(n) {
    return this.format(n, '₫')
  }
}
