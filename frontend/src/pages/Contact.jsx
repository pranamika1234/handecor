import React, { useState } from 'react'


export default function Contact() {
const [formData, setFormData] = useState({
name: '',
email: '',
subject: '',
message: ''
})

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value
})
}


const handleSubmit = async (e) => {
	e.preventDefault();
	try {
		// Send message to backend
		const res = await fetch('http://localhost:4000/api/messages', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: formData.name,
				email: formData.email,
				content: `Subject: ${formData.subject}\nMessage: ${formData.message}`
			})
		});
		if (res.ok) {
			alert('Thank you for your message! We will get back to you soon.');
			setFormData({ name: '', email: '', subject: '', message: '' });
		} else {
			alert('Failed to send message. Please try again later.');
		}
	} catch (err) {
		alert('Error sending message. Please check your connection.');
	}
}

return (
<div>
{/* Hero Section */}
<section className="relative -mx-4 -mt-8 mb-16 h-[300px] bg-gradient-to-r from-brand to-brand/70 flex items-center justify-center">
<div className="relative z-10 text-center text-white px-4 max-w-4xl">
<h1 className="h1-handmade text-5xl md:text-6xl font-bold mb-4">
Get In Touch
</h1>
<p className="text-xl md:text-2xl">
We'd love to hear from you
</p>
</div>
</section>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
{/* Contact Form */}
<section>
<h2 className="text-3xl font-bold mb-6 h1-handmade">Send Us a Message</h2>
<form onSubmit={handleSubmit} className="space-y-6">
<div>
<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
Your Name *
</label>
<input
type="text"
id="name"
name="name"
value={formData.name}
onChange={handleChange}
required
className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition"
placeholder="John Doe"
/>
</div>

<div>
<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
Email Address *
</label>
<input
type="email"
id="email"
name="email"
value={formData.email}
onChange={handleChange}
required
className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition"
placeholder="john@example.com"
/>
</div>

<div>
<label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
Subject *
</label>
<input
type="text"
id="subject"
name="subject"
value={formData.subject}
onChange={handleChange}
required
className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition"
placeholder="How can we help?"
/>
</div>

<div>
<label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
Message *
</label>
<textarea
id="message"
name="message"
value={formData.message}
onChange={handleChange}
required
rows="6"
className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition resize-none"
placeholder="Tell us more about your inquiry..."
></textarea>
</div>

<button
type="submit"
className="w-full px-8 py-4 bg-brand text-white rounded-lg font-semibold text-lg hover:bg-brand/90 transition-all shadow-md hover:shadow-lg"
>
Send Message
</button>
</form>
</section>

{/* Contact Information */}
<section>
<h2 className="text-3xl font-bold mb-6 h1-handmade">Contact Information</h2>

<div className="space-y-6">
{/* Email */}
<div className="flex items-start gap-4">
<div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center flex-shrink-0">
<span className="text-2xl">📧</span>
</div>
<div>
<h3 className="font-semibold text-lg mb-1">Email</h3>
<p className="text-gray-600">support@cartziohandmade.com</p>
<p className="text-gray-600">info@cartziohandmade.com</p>
</div>
</div>

{/* Phone */}
<div className="flex items-start gap-4">
<div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center flex-shrink-0">
<span className="text-2xl">📞</span>
</div>
<div>
<h3 className="font-semibold text-lg mb-1">Phone</h3>
<p className="text-gray-600">+91 98765 43210</p>
<p className="text-gray-600">+91 98765 43211</p>
</div>
</div>

{/* Address */}
<div className="flex items-start gap-4">
<div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center flex-shrink-0">
<span className="text-2xl">📍</span>
</div>
<div>
<h3 className="font-semibold text-lg mb-1">Address</h3>
<p className="text-gray-600">
123 Artisan Lane,<br />
Craft District, Mumbai,<br />
Maharashtra 400001, India
</p>
</div>
</div>

{/* Business Hours */}
<div className="flex items-start gap-4">
<div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center flex-shrink-0">
<span className="text-2xl">🕒</span>
</div>
<div>
<h3 className="font-semibold text-lg mb-1">Business Hours</h3>
<p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
<p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
<p className="text-gray-600">Sunday: Closed</p>
</div>
</div>

{/* Social Media */}
<div className="pt-6 border-t">
<h3 className="font-semibold text-lg mb-4">Follow Us</h3>
<div className="flex gap-4">
<a href="#" className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center hover:bg-brand hover:text-white transition">
<span className="text-xl">📘</span>
</a>
<a href="#" className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center hover:bg-brand hover:text-white transition">
<span className="text-xl">📷</span>
</a>
<a href="#" className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center hover:bg-brand hover:text-white transition">
<span className="text-xl">🐦</span>
</a>
<a href="#" className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center hover:bg-brand hover:text-white transition">
<span className="text-xl">📌</span>
</a>
</div>
</div>
</div>
</section>
</div>

{/* FAQ Section */}
<section className="mb-16 bg-gray-50 -mx-4 px-4 py-12">
<div className="max-w-4xl mx-auto">
<h2 className="text-3xl font-bold text-center mb-10 h1-handmade">Frequently Asked Questions</h2>
<div className="space-y-6">
<div className="bg-white p-6 rounded-lg shadow-sm">
<h3 className="font-semibold text-lg mb-2">What are your shipping options?</h3>
<p className="text-gray-600">
We offer standard shipping (5-7 business days) and express shipping (2-3 business days) across India. 
International shipping is also available for select products.
</p>
</div>
<div className="bg-white p-6 rounded-lg shadow-sm">
<h3 className="font-semibold text-lg mb-2">Can I return or exchange a product?</h3>
<p className="text-gray-600">
Yes! We offer a 7-day return policy for most items. Products must be unused and in original packaging. 
Please contact us for return authorization.
</p>
</div>
<div className="bg-white p-6 rounded-lg shadow-sm">
<h3 className="font-semibold text-lg mb-2">Do you offer bulk orders or wholesale?</h3>
<p className="text-gray-600">
Absolutely! We work with businesses, event planners, and gift shops. Contact us at 
wholesale@cartziohandmade.com for special pricing on bulk orders.
</p>
</div>
<div className="bg-white p-6 rounded-lg shadow-sm">
<h3 className="font-semibold text-lg mb-2">How can I become an artisan partner?</h3>
<p className="text-gray-600">
We're always looking for talented artisans! Send us your portfolio and product samples at 
artisans@cartziohandmade.com, and our team will review your application.
</p>
</div>
</div>
</div>
</section>
</div>
)
}
