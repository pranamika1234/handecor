# Cartzio Handmade - E-commerce Platform

An e-commerce platform for handmade products built with React, Node.js, Express, and MongoDB.

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running

### Backend Setup
1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Make sure MongoDB is running on `mongodb://localhost:27017`

4. Seed the database with sample products:
   ```bash
   npm run seed
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```
   Backend will run on http://localhost:4000

### Frontend Setup
1. Navigate to frontend folder (in a new terminal):
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend dev server:
   ```bash
   npm run dev
   ```
   Frontend will run on http://localhost:5173

## Features
- Featured products showcase
- Product browsing with images
- Product details with seller information
- Stock management
- Quantity selector
- Add to cart and Buy now buttons
- Responsive design with Tailwind CSS

## Product Images
Place product images in `frontend/public/` folder. Current images:
- bamboo.webp
- collection_bags.jfif
- jute.jpg
- marble-handicrafts.webp
- pots.webp
- placeholder.jpg
