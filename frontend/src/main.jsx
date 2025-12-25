import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Shop from './pages/Shop'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import './styles/index.css'


createRoot(document.getElementById('root')).render(
<React.StrictMode>
<HashRouter>
	<Routes>
		<Route path="/" element={<App />}>
			<Route index element={<Home />} />
			<Route path="shop" element={<Shop />} />
			<Route path="about" element={<About />} />
			<Route path="contact" element={<Contact />} />
			<Route path="product/:id" element={<Product />} />
		</Route>
	</Routes>
</HashRouter>
</React.StrictMode>
)