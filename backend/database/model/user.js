const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, minLength: 2 },
  email: String,
  password: { type: String, required: true, minLength: 12 }
})

UserSchema.plugin(passportLocalMongoose, {
  userField: 'email',
  hashField: 'password'
})
module.exports = mongoose.model('User', UserSchema)
