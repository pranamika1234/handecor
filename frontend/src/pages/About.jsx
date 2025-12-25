import React from 'react'
import { Link } from 'react-router-dom'


export default function About() {
return (
<div>
{/* Hero Section */}
<section className="relative -mx-4 -mt-8 mb-16 h-[400px] bg-gradient-to-r from-brand/90 to-brand/70 flex items-center justify-center">
<div className="relative z-10 text-center text-white px-4 max-w-4xl">
<h1 className="h1-handmade text-5xl md:text-6xl font-bold mb-4">
Our Story
</h1>
<p className="text-xl md:text-2xl">
Where craftsmanship meets passion
</p>
</div>
</section>

{/* Mission Section */}
<section className="mb-16">
<div className="max-w-4xl mx-auto text-center">
<h2 className="h1-handmade text-4xl font-bold mb-6">Handcrafted with Love</h2>
<p className="text-lg text-gray-700 leading-relaxed mb-4">
At Cartzio Handmade, we believe that every product tells a story. Our mission is to connect talented artisans 
with people who appreciate the beauty of handmade craftsmanship. Each item in our collection is carefully 
crafted by skilled makers who pour their heart and soul into every piece.
</p>
<p className="text-lg text-gray-700 leading-relaxed">
We're more than just an online marketplace – we're a community that celebrates creativity, sustainability, 
and the human touch in a mass-produced world.
</p>
</div>
</section>

{/* Values Grid */}
<section className="mb-16 bg-gray-50 -mx-4 px-4 py-12">
<div className="max-w-6xl mx-auto">
<h2 className="h1-handmade text-3xl font-bold text-center mb-12">What We Stand For</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
<div className="bg-white p-8 rounded-lg shadow-md text-center">
<div className="text-5xl mb-4">🎨</div>
<h3 className="text-xl font-bold mb-3">Authentic Craftsmanship</h3>
<p className="text-gray-600">
Every product is handmade by skilled artisans using traditional techniques passed down through generations.
</p>
</div>
<div className="bg-white p-8 rounded-lg shadow-md text-center">
<div className="text-5xl mb-4">🌱</div>
<h3 className="text-xl font-bold mb-3">Sustainable & Eco-Friendly</h3>
<p className="text-gray-600">
We prioritize natural materials and sustainable practices to protect our planet for future generations.
</p>
</div>
<div className="bg-white p-8 rounded-lg shadow-md text-center">
<div className="text-5xl mb-4">❤️</div>
<h3 className="text-xl font-bold mb-3">Supporting Artisans</h3>
<p className="text-gray-600">
We empower local craftspeople by providing them a platform to showcase and sell their unique creations.
</p>
</div>
</div>
</div>
</section>

{/* Story Section */}
<section className="mb-16">
<div className="max-w-4xl mx-auto">
<h2 className="h1-handmade text-3xl font-bold mb-8 text-center">How We Started</h2>
<div className="space-y-6 text-gray-700 leading-relaxed">
<p className="text-lg">
Our journey began with a simple idea: to preserve the art of handmade craftsmanship in an increasingly 
digital world. Founded in 2024, Cartzio Handmade started as a small initiative to connect local artisans 
with customers who value quality over quantity.
</p>
<p className="text-lg">
What started as a weekend marketplace has grown into a thriving online platform featuring handcrafted 
products from talented makers across the country. From intricate pottery to woven textiles, from hand-carved 
wood to delicate jewelry – each piece represents hours of dedication and years of refined skill.
</p>
<p className="text-lg">
Today, we're proud to partner with over 50 artisans, offering hundreds of unique handmade products. 
Every purchase you make supports these talented individuals and helps keep traditional crafts alive.
</p>
</div>
</div>
</section>

{/* Stats Section */}
<section className="mb-16 bg-brand/5 -mx-4 px-4 py-12">
<div className="max-w-6xl mx-auto">
<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
<div>
<div className="text-4xl font-bold text-brand mb-2">50+</div>
<div className="text-gray-600 font-medium">Talented Artisans</div>
</div>
<div>
<div className="text-4xl font-bold text-brand mb-2">500+</div>
<div className="text-gray-600 font-medium">Unique Products</div>
</div>
<div>
<div className="text-4xl font-bold text-brand mb-2">1000+</div>
<div className="text-gray-600 font-medium">Happy Customers</div>
</div>
<div>
<div className="text-4xl font-bold text-brand mb-2">100%</div>
<div className="text-gray-600 font-medium">Handmade Quality</div>
</div>
</div>
</div>
</section>

{/* CTA Section */}
<section className="mb-16">
<div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-brand to-brand/80 text-white p-12 rounded-2xl shadow-xl">
<h2 className="h1-handmade text-3xl md:text-4xl font-bold mb-4">
Join Our Handmade Community
</h2>
<p className="text-lg mb-8 opacity-90">
Discover unique pieces that tell a story and support artisans who keep traditional crafts alive.
</p>
<Link 
to="/shop" 
className="inline-block px-10 py-4 bg-white text-brand rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
>
Start Shopping
</Link>
</div>
</section>
</div>
)
}
