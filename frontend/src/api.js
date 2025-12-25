import axios from 'axios'


const API = axios.create({
baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:4000/api',
headers: { 'Content-Type': 'application/json' }
})


export const fetchProducts = () => API.get('/products')
export const fetchProduct = (id) => API.get(`/products/${id}`)


export default API