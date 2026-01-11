import axios from 'axios'


const API = axios.create({
baseURL: 'https://handecor.onrender.com/api',
headers: { 'Content-Type': 'application/json' }
})


export const fetchProducts = (config = {}) => API.get('/products', config)
export const fetchProduct = (id, config = {}) => API.get(`/products/${id}`, config)


export default API