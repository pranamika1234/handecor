import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../api'
import ProductCard from '../components/Productcard'


export default function Shop() {
const [products, setProducts] = useState([])
const [loading, setLoading] = useState(true)
const [selectedCategory, setSelectedCategory] = useState('All')


useEffect(() => {
fetchProducts()
.then(res => setProducts(res.data))
.catch(err => console.error(err))
.finally(() => setLoading(false))
}, [])

const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))]
const filteredProducts = selectedCategory === 'All' 
? products 
: products.filter(p => p.category === selectedCategory)


return (
<div>
<section className="mb-8">
<h1 className="h1-handmade text-4xl font-bold mb-3">Shop All Products</h1>
<p className="text-gray-600">Discover our complete collection of handmade treasures</p>
</section>

<div className="flex flex-col md:flex-row gap-8">
{/* Sidebar Filters */}
<aside className="w-full md:w-64 flex-shrink-0">
<div className="bg-white border rounded-lg p-6 sticky top-4">
<h3 className="font-bold text-lg mb-4">Categories</h3>
<div className="space-y-2">
{categories.map(cat => (
<button
key={cat}
onClick={() => setSelectedCategory(cat)}
className={`w-full text-left px-4 py-2 rounded transition ${
selectedCategory === cat 
? 'bg-brand text-white' 
: 'hover:bg-gray-100 text-gray-700'
}`}
>
{cat}
</button>
))}
</div>
<div className="mt-6 pt-6 border-t">
<p className="text-sm text-gray-600">
Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
</p>
</div>
</div>
</aside>

{/* Products Grid */}
<main className="flex-1">
{loading ? (
<div className="text-center py-12">Loading products...</div>
) : filteredProducts.length === 0 ? (
<div className="text-center py-12 text-gray-500">
No products found in this category
</div>
) : (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
{filteredProducts.map(p => (
<ProductCard key={p._id} product={p} />
))}
</div>
)}
</main>
</div>
</div>
)
}
