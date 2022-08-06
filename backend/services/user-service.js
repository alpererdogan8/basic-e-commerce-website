const BaseService = require('./base-service')
const User = require('../database/model/user.js')
const bcrypt = require('bcrypt')

class UserService extends BaseService {
  async findUser(name) {
    return this.findBy('username', name)
  }
  async registerUser(username, email, password) {
    const isUser = await this.findBy('username', username)
    if (isUser) return 'Account Already Exists'
    if (!isUser) {
      return this.model.register(new this.model({ username, email }), password)
    }
  }
}

module.exports = new UserService(User)
