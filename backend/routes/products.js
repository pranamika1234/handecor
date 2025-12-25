import express from 'express'
import Product from '../models/Product.js'


const router = express.Router()


// GET /api/products
router.get('/', async (req, res) => {
try {
const products = await Product.find().limit(50)
res.json(products)
} catch (error) {
res.status(500).json({ message: error.message })
}
})

// GET /api/products/:id
router.get('/:id', async (req, res) => {
try {
const product = await Product.findById(req.params.id)
if (!product) {
return res.status(404).json({ message: 'Product not found' })
}
res.json(product)
} catch (error) {
res.status(500).json({ message: error.message })
}
})

export default router