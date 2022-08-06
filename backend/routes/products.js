const { resolveSoa } = require('dns')
const { ProductService } = require('../services')

const router = require('express').Router()


router.get('/products', async (req, res) => {
  const data = await ProductService.load()
  res.json(data)
})
router.get('/products/:id', async (req, res) => {
  const data = await ProductService.find(req.params.id)
  res.json(data)
})

router.post('/products', async (req, res, next) => {
  try {
    const product = await ProductService.insert(req.body)
    res.send(product)
  } catch (error) {
    next(error)
  }
})
router.patch('/products/:id', async (req, res) => {
  res.send(await ProductService.update(req.params.id, req.body))
})


module.exports = router