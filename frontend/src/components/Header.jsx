import React from 'react'
import { Link } from 'react-router-dom'


export default function Header() {
return (
<header className="bg-white border-b">
<div className="container mx-auto px-4 py-4 flex items-center justify-between">
<Link to="/" className="flex items-center gap-3">
<img src="/placeholder.jpg" alt="logo" className="w-10 h-10 rounded-md object-cover" />
<div>
<div className="font-bold text-lg">Handmade Studio</div>
<div className="text-xs text-gray-500">Crafts & Gifts</div>
</div>
</Link>


<nav>
<ul className="flex gap-6 items-center text-sm">
<li><Link to="/" className="hover:text-brand transition">Home</Link></li>
<li><Link to="/shop" className="hover:text-brand transition">Shop</Link></li>
<li><Link to="/about" className="hover:text-brand transition">About</Link></li>
<li><Link to="/contact" className="hover:text-brand transition">Contact</Link></li>
</ul>
</nav>
</div>
</header>
)
}