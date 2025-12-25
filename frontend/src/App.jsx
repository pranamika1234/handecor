import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Cart from './components/Cart'
import PaymentUI from './components/PaymentUI'


export default function App() {
	const [cartItems, setCartItems] = useState([]);
	const [cartOpen, setCartOpen] = useState(false);
	const [paymentOpen, setPaymentOpen] = useState(false);

	// Add product to cart
	const addToCart = (product) => {
		setCartItems(prev => {
			const existing = prev.find(item => item._id === product._id);
			if (existing) {
				return prev.map(item =>
					item._id === product._id
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			}
			return [...prev, { ...product, quantity: 1 }];
		});
		setCartOpen(true);
	};

	// Remove product from cart
	const removeFromCart = (id) => {
		setCartItems(prev => prev.filter(item => item._id !== id));
	};

	// Checkout handler
	const handleCheckout = () => {
		setPaymentOpen(true);
	};

	// Payment submit handler (placeholder)
	const handlePaymentSubmit = (paymentData) => {
		setPaymentOpen(false);
		setCartOpen(false);
		setCartItems([]);
		alert('Payment successful!');
		// You can send paymentData to backend here
	};

	// Update quantity in cart
	const updateCartQty = (id, qty) => {
		setCartItems(prev => prev.map(item =>
			item._id === id ? { ...item, quantity: qty } : item
		));
	};

	return (
		<div className="min-h-screen bg-white text-gray-800">
			<Header onCartClick={() => setCartOpen(true)} />
			<main className="container mx-auto px-4 py-8">
				{/* Pass addToCart to children via context or props */}
				<Outlet context={{ addToCart }} />
			</main>
			<footer className="bg-gray-100 py-6 mt-12">
				<div className="container mx-auto px-4 text-center text-sm text-gray-600">© {new Date().getFullYear()} Handmade Studio</div>
			</footer>
			{cartOpen && (
				<Cart
					cartItems={cartItems}
					onRemove={removeFromCart}
					onCheckout={handleCheckout}
					onClose={() => setCartOpen(false)}
					onUpdateQty={updateCartQty}
				/>
			)}
			{paymentOpen && (
				<PaymentUI
					amount={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
					onSubmit={handlePaymentSubmit}
					onClose={() => setPaymentOpen(false)}
				/>
			)}
			{/* Overlay to close cart */}
			{cartOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-30 z-40"
					onClick={() => setCartOpen(false)}
				/>
			)}
		</div>
	);
}