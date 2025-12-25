import mongoose from 'mongoose'


const ProductSchema = new mongoose.Schema({
name: { type: String, required: true },
shortDescription: { type: String },
description: { type: String },
price: { type: Number, required: true },
image: { type: String },
featured: { type: Boolean, default: false },
seller: { type: String },
stock: { type: Number, default: 0 },
category: { type: String },
createdAt: { type: Date, default: Date.now }
})


export default mongoose.model('Product', ProductSchema)