const router = require('express').Router()
const { UserService } = require('../services')

const passportConfig = require('../config/passportConfig')

router.use(passportConfig.initialize())
router.use(passportConfig.session())

const isAuth = (req, res, next) => {
  if (!req.isAuthenticated()) return res.redirect('/api/v1/auth/')
  return next()
}

router.get('/', (req, res) => {
  res.send({ status: 'OK', isLogin: false, path: 'Auth' })
})

router.get('/user', isAuth, async (req, res) => {
  res.cookie('user', 1, { httpOnly: true })
  res.json({ isLogin: true, userdata: req.user })
})

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body
  const userFeedback = await UserService.registerUser(username, email, password)
  res.send(userFeedback)
})

router.post(
  '/login',
  passportConfig.authenticate('local', { successRedirect: 'user', failureRedirect: 'error' }),

  (req, res) => {
    res.redirect('/user')
  }
)

router.get('/error', (req, res) => {
  res.send({ status: 'OK', isLogin: false })
})

router.post('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/api/v1/auth/')
  })
})

module.exports = router
