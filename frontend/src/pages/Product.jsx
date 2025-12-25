import React, { useEffect, useState } from 'react'
import { useParams, useOutletContext } from 'react-router-dom'
import { fetchProduct } from '../api'


export default function Product() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const { addToCart } = useOutletContext() || {};


useEffect(() => {
fetchProduct(id)
.then(res => setProduct(res.data))
.catch(err => console.error(err))
}, [id])


if (!product) return <div className="text-center py-12">Loading…</div>


return (
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
<div>
<img src={product.image || '/placeholder.jpg'} alt={product.name} className="w-full h-[480px] object-cover rounded-lg border" />
</div>
<div>
<h1 className="text-3xl font-bold mb-2 text-gray-900">{product.name}</h1>
{product.seller && (
<p className="text-gray-600 mb-4">Sold by <span className="font-semibold">{product.seller}</span></p>
)}
{product.category && (
<p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>
)}
<div className="text-brand text-3xl font-bold mb-4">₹{product.price.toLocaleString('en-IN')}</div>
{product.stock !== undefined && (
<div className={`text-sm font-semibold mb-4 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
{product.stock > 0 ? `${product.stock} items available` : 'Currently out of stock'}
</div>
)}
<p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
{product.stock > 0 && (
<div className="space-y-4">
<div className="flex items-center gap-4">
<label className="text-gray-700 font-medium">Quantity:</label>
<div className="flex items-center border rounded">
<button 
onClick={() => setQuantity(Math.max(1, quantity - 1))}
className="px-3 py-1 hover:bg-gray-100"
>
-
</button>
<span className="px-4 py-1 border-x">{quantity}</span>
<button 
onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
className="px-3 py-1 hover:bg-gray-100"
>
+
</button>
</div>
</div>
<div className="flex gap-3">
	<button
		className="flex-1 px-6 py-3 bg-brand text-white rounded-lg font-semibold hover:bg-brand/90 transition"
		onClick={() => addToCart && addToCart({ ...product, quantity })}
	>
		Add to Cart
	</button>
	<button
		className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition"
		onClick={() => {
			if (addToCart) {
				addToCart({ ...product, quantity });
			}
			// Optionally, redirect to cart or checkout page here
		}}
	>
		Buy Now
	</button>
</div>
</div>
)}
{product.stock === 0 && (
<button className="w-full px-6 py-3 bg-gray-300 text-gray-500 rounded-lg font-semibold cursor-not-allowed" disabled>
Out of Stock
</button>
)}
</div>
</div>
)
}