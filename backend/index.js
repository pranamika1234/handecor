import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import productsRouter from './routes/products.js'
import messagesRouter from './routes/messages.js'


dotenv.config()
const app = express()
app.use(cors({
	origin: 'https://pranamika1234.github.io'
}))
app.use(express.json())


const PORT = process.env.PORT || 5000


app.use('/api/products', productsRouter)
app.use('/api/messages', messagesRouter)


// Root route for health check or friendly message
app.get('/', (req, res) => {
	res.send('API is running!');
});
// Connect to MongoDB with better error handling
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cartzio-handmade'

mongoose.connect(MONGO_URI)
.then(() => {
console.log('✓ Connected to MongoDB successfully')
console.log(`✓ Database: ${MONGO_URI}`)
app.listen(PORT, () => {
console.log(`✓ Server running on http://localhost:${PORT}`)
console.log(`✓ API endpoint: http://localhost:${PORT}/api/products`)
})
})
.catch(err => {
console.error('✗ MongoDB connection error:', err.message)
console.error('\nTo fix this:')
console.error('1. Make sure MongoDB is installed and running')
console.error('2. Start MongoDB with: mongod')
console.error('3. Or install MongoDB from: https://www.mongodb.com/try/download/community')
console.error('\nStarting server anyway (API will not work until MongoDB is connected)...')
app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT} (MongoDB not connected)`)
})
})