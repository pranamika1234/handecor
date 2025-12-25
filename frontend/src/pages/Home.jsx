import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../api'
import ProductCard from '../components/Productcard'


export default function Home() {
const [products, setProducts] = useState([])
const [loading, setLoading] = useState(true)


useEffect(() => {
fetchProducts()
.then(res => setProducts(res.data))
.catch(err => console.error(err))
.finally(() => setLoading(false))
}, [])

const featuredProducts = products.filter(p => p.featured)
const regularProducts = products.filter(p => !p.featured)
const limitedProducts = regularProducts.slice(0, 6)


return (
<div>
{/* Hero Section */}
<section 
className="relative -mx-4 -mt-8 mb-12 h-[500px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
style={{ backgroundImage: "url('/authentic-handmade-products.jpg')" }}
>
<div className="absolute inset-0 bg-black/40"></div>
<div className="relative z-10 text-center text-white px-4 max-w-4xl">
<h1 className="h1-handmade text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
Handmade Goods, Made With Care
</h1>
<p className="text-xl md:text-2xl mb-8 drop-shadow-md">
Discover unique, small-batch items crafted by talented artisans
</p>
<Link 
to="/shop" 
className="inline-block px-10 py-4 bg-brand text-white rounded-lg font-semibold text-lg hover:bg-brand/90 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
>
Shop Now
</Link>
</div>
</section>

{loading ? (
<div>Loading…</div>
) : (
<>
{featuredProducts.length > 0 && (
<section className="mb-12">
<h2 className="text-2xl font-bold mb-6 h1-handmade">Featured Products</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
{featuredProducts.map(p => (
<ProductCard key={p._id} product={p} />
))}
</div>
</section>
)}

<section>
<div className="flex items-center justify-between mb-6">
<h2 className="text-2xl font-bold h1-handmade">All Products</h2>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
{limitedProducts.map(p => (
<ProductCard key={p._id} product={p} />
))}
</div>
{regularProducts.length > 6 && (
<div className="text-center">
<Link 
to="/shop" 
className="inline-block px-8 py-3 bg-brand text-white rounded-lg font-semibold hover:bg-brand/90 transition-all shadow-md hover:shadow-lg"
>
See More Products ({regularProducts.length - 6}+ More)
</Link>
</div>
)}
</section>
</>
)}
</div>
)
}