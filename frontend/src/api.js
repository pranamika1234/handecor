import axios from 'axios'


const API = axios.create({
baseURL: 'https://handecor.onrender.com/api',
headers: { 'Content-Type': 'application/json' }
})


export const fetchProducts = () => API.get('/products')
export const fetchProduct = (id) => API.get(`/products/${id}`)


export default API