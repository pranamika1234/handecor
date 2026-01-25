import React from 'react'
import { Link, useOutletContext } from 'react-router-dom'


export default function ProductCard({ product }) {
	const { addToCart } = useOutletContext() || {};

	const imgSrc = product?.image
		? `${import.meta.env.BASE_URL}${product.image.replace(/^\/+/g, '')}`
		: `${import.meta.env.BASE_URL}placeholder.jpg`;
	return (
		<div className="border rounded-lg overflow-hidden shadow-sm bg-white hover:shadow-md transition-shadow">
			<Link to={`/product/${product._id}`}>
				<img src={imgSrc} alt={product.name} className="w-full h-56 object-cover" />
			</Link>
			<div className="p-4">
				<h3 className="font-semibold text-gray-900">{product.name}</h3>
				{product.seller && (
					<p className="text-xs text-gray-500 mt-1">by {product.seller}</p>
				)}
				<p className="text-sm text-gray-600 mt-1">{product.shortDescription}</p>
				<div className="mt-3 flex items-center justify-between">
					<div>
						<div className="text-lg font-bold text-gray-900">₹{product.price}</div>
						{product.stock !== undefined && (
							<div className={`text-xs ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
								{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
							</div>
						)}
					</div>
					<div className="flex gap-2">
						<Link to={`/product/${product._id}`} className="text-sm text-brand font-medium underline hover:text-brand/80">
							View
						</Link>
						<button
							className="text-sm bg-brand text-white px-3 py-1 rounded hover:bg-brand/80"
							disabled={product.stock === 0}
							onClick={() => addToCart && addToCart(product)}
						>
							Add to Cart
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}