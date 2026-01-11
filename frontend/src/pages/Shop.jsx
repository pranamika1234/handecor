import React, { useEffect, useState, useRef } from 'react'
import { fetchProducts } from '../api'
import ProductCard from '../components/Productcard'
import { FixedSizeGrid as Grid } from 'react-window'


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

			{/* Products Grid with virtualization */}
			<main className="flex-1">
				{loading ? (
					<div className="text-center py-12">Loading products...</div>
				) : filteredProducts.length === 0 ? (
					<div className="text-center py-12 text-gray-500">
						No products found in this category
					</div>
				) : (
					<VirtualizedProductGrid products={filteredProducts} />
				)}
			</main>
		</div>
	</div>
)

// Virtualized grid component
function VirtualizedProductGrid({ products }) {
	// Responsive columns: 1 (xs), 2 (sm), 3 (lg), 4 (xl)
	const gridRef = useRef(null);
	const [columns, setColumns] = useState(1);
	const [width, setWidth] = useState(400);

	useEffect(() => {
		function handleResize() {
			if (!gridRef.current) return;
			const w = gridRef.current.offsetWidth;
			setWidth(w);
			if (w >= 1280) setColumns(4);
			else if (w >= 1024) setColumns(3);
			else if (w >= 640) setColumns(2);
			else setColumns(1);
		}
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const rowCount = Math.ceil(products.length / columns);
	const CARD_HEIGHT = 370; // px, adjust as needed
	const CARD_WIDTH = width / columns;

	return (
		<div ref={gridRef} style={{ width: '100%', height: `${Math.min(rowCount * CARD_HEIGHT, 1200)}px` }}>
			<Grid
				columnCount={columns}
				columnWidth={CARD_WIDTH}
				height={Math.min(rowCount * CARD_HEIGHT, 1200)}
				rowCount={rowCount}
				rowHeight={CARD_HEIGHT}
				width={width}
				itemData={{ products, columns }}
			>
				{ProductCell}
			</Grid>
		</div>
	);
}

function ProductCell({ columnIndex, rowIndex, style, data }) {
	const { products, columns } = data;
	const index = rowIndex * columns + columnIndex;
	if (index >= products.length) return null;
	return (
		<div style={{ ...style, padding: 12 }}>
			<ProductCard product={products[index]} />
		</div>
	);
}
}
