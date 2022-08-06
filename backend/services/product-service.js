const BaseService = require('./base-service')
const Products = require('../database/model/products')

class ProductService extends BaseService {}
module.exports = new ProductService(Products)
