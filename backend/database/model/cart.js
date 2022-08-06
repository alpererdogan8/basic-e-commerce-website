const mongoose = require('mongoose')

const cart = new mongoose.Schema({
  item: {
    productItems: [],
    totalPrice: Number
  }
})

module.exports = mongoose.model('Cart', cart)
