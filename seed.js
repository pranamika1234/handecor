import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from './models/Product.js'

dotenv.config()

const sampleProducts = [
  {
    name: 'Handcrafted Bamboo Products',
    shortDescription: 'Eco-friendly bamboo home essentials',
    description: 'Beautiful handcrafted bamboo products including bowls, trays, and utensils. Made from sustainable bamboo, perfect for eco-conscious homes. Each piece is carefully crafted by skilled artisans.',
    price: 1299,
    image: '/bamboo.webp',
    featured: true,
    seller: 'EcoArt Crafts',
    stock: 25,
    category: 'Home & Kitchen'
  },
  {
    name: 'Artisan Collection Bags',
    shortDescription: 'Handwoven designer bags',
    description: 'Exquisite handwoven bags crafted by local artisans. Perfect blend of traditional craftsmanship and modern design. Available in various colors and patterns.',
    price: 2499,
    image: '/collection_bags.jfif',
    featured: true,
    seller: 'Weave & Wonder',
    stock: 15,
    category: 'Fashion & Accessories'
  },
  {
    name: 'Natural Jute Products',
    shortDescription: 'Sustainable jute home decor',
    description: 'Handmade jute products including bags, baskets, and decorative items. Environmentally friendly and durable. Perfect for storage or as unique home decor pieces.',
    price: 899,
    image: '/jute.jpg',
    featured: true,
    seller: 'Green Fiber Co.',
    stock: 40,
    category: 'Home & Decor'
  },
  {
    name: 'Marble Handicrafts',
    shortDescription: 'Luxury marble art pieces',
    description: 'Stunning handcrafted marble decorative items and sculptures. Each piece is meticulously carved by master craftsmen. Perfect for adding elegance to any space.',
    price: 4999,
    image: '/marble-handicrafts.webp',
    featured: true,
    seller: 'Marble Masters',
    stock: 8,
    category: 'Art & Sculptures'
  },
  {
    name: 'Handmade Clay Pots',
    shortDescription: 'Traditional clay pottery',
    description: 'Authentic handmade clay pots perfect for plants, storage, or decorative purposes. Made using traditional pottery techniques passed down through generations.',
    price: 699,
    image: '/pots.webp',
    featured: true,
    seller: 'Clay Craft Studio',
    stock: 30,
    category: 'Home & Garden'
  },
  {
    name: 'Handwoven Basket',
    shortDescription: 'Natural fiber storage basket',
    description: 'Beautiful handwoven basket made from natural fibers. Perfect for storage or as a decorative piece. Each basket is unique with its own character.',
    price: 749,
    image: '/handwoven-basket.jpg',
    seller: 'Fiber Arts Collective',
    stock: 20,
    category: 'Home & Storage'
  },
  {
    name: 'Macrame Wall Hanging',
    shortDescription: 'Boho macrame art piece',
    description: 'Stunning macrame wall hanging that adds a bohemian touch to any room. Handcrafted with premium cotton rope by skilled artists.',
    price: 1499,
    image: '/macrame-wallhanging.webp',
    seller: 'Knot & Thread',
    stock: 12,
    category: 'Wall Art'
  },
  {
    name: 'Leather Journal',
    shortDescription: 'Handbound leather journal',
    description: 'Premium handbound journal with genuine leather cover. Perfect for writing, sketching, or daily notes. Features handmade paper and traditional binding.',
    price: 1099,
    image: '/leather-journal.webp',
    seller: 'Leather & Lore',
    stock: 18,
    category: 'Stationery'
  },
  {
    name: 'Handmade Candles Set',
    shortDescription: 'Aromatic soy wax candles',
    description: 'Set of 3 handmade candles crafted from natural soy wax with essential oils. Long-lasting burn time and soothing fragrances.',
    price: 899,
    image: '/handmade-candleset.webp',
    seller: 'Scented Dreams',
    stock: 35,
    category: 'Home Fragrance'
  },
  {
    name: 'Terracotta Plant Pots',
    shortDescription: 'Handpainted terracotta pots',
    description: 'Beautiful handpainted terracotta pots perfect for indoor plants. Each pot features unique hand-drawn designs.',
    price: 549,
    image: '/terracota-plantpots.jpg',
    seller: 'Clay Craft Studio',
    stock: 42,
    category: 'Home & Garden'
  },
  {
    name: 'Wooden Coasters Set',
    shortDescription: 'Rustic wooden drink coasters',
    description: 'Set of 6 handcrafted wooden coasters with natural finish. Protects surfaces while adding rustic charm to your home.',
    price: 399,
    image: '/wooden-coasters.jfif',
    seller: 'Wood & Wonder',
    stock: 50,
    category: 'Home & Kitchen'
  },
  {
    name: 'Handwoven Table Runner',
    shortDescription: 'Cotton table runner',
    description: 'Elegant handwoven table runner made from premium cotton. Perfect for dining tables, adding warmth and style.',
    price: 1299,
    image: '/handwoven-table-runner.webp',
    seller: 'Weave & Wonder',
    stock: 22,
    category: 'Home Textiles'
  },
  {
    name: 'Ceramic Tea Set',
    shortDescription: 'Handcrafted ceramic tea set',
    description: 'Complete tea set including teapot and 4 cups. Each piece is hand-thrown and glazed with unique patterns.',
    price: 2499,
    image: '/ceramic-tea-set.webp',
    seller: 'Pottery Paradise',
    stock: 12,
    category: 'Home & Kitchen'
  },
  {
    name: 'Embroidered Cushion Covers',
    shortDescription: 'Hand-embroidered cushion covers',
    description: 'Set of 2 beautifully embroidered cushion covers with traditional patterns. Made from soft cotton fabric.',
    price: 799,
    image: '/embroidered-cushion-covers.jpg',
    seller: 'Stitch & Style',
    stock: 28,
    category: 'Home Decor'
  },
  {
    name: 'Brass Handicrafts',
    shortDescription: 'Traditional brass decorative items',
    description: 'Handcrafted brass decorative items featuring intricate designs. Perfect for adding traditional elegance to your space.',
    price: 1899,
    image: '/brass-handicrafts.jpg',
    seller: 'Metal Artistry',
    stock: 15,
    category: 'Art & Sculptures'
  },
  {
    name: 'Handmade Soap Collection',
    shortDescription: 'Natural handmade soaps',
    description: 'Set of 5 handmade soaps with natural ingredients. Free from chemicals, gentle on skin with various fragrances.',
    price: 599,
    image: '/handmade-soap-collection.webp',
    seller: 'Pure & Natural',
    stock: 60,
    category: 'Bath & Body'
  },
  {
    name: 'Wooden Jewelry Box',
    shortDescription: 'Carved wooden jewelry organizer',
    description: 'Beautifully carved wooden jewelry box with multiple compartments. Features intricate hand-carved designs.',
    price: 1599,
    image: '/wooden-jewellery-box.webp',
    seller: 'Wood & Wonder',
    stock: 18,
    category: 'Storage & Organization'
  },
  {
    name: 'Handwoven Rugs',
    shortDescription: 'Traditional handwoven floor rug',
    description: 'Authentic handwoven rug made using traditional techniques. Durable and adds warmth to any room.',
    price: 3499,
    image: '/handwoven-rugs.webp',
    seller: 'Weave & Wonder',
    stock: 10,
    category: 'Home Textiles'
  },
  {
    name: 'Clay Diyas Set',
    shortDescription: 'Traditional handmade oil lamps',
    description: 'Set of 12 handmade clay diyas (oil lamps). Perfect for festivals and creating ambient lighting.',
    price: 299,
    image: '/clay-diyas-set.webp',
    seller: 'Clay Craft Studio',
    stock: 80,
    category: 'Home & Decor'
  },
  {
    name: 'Crochet Throw Blanket',
    shortDescription: 'Handmade crochet blanket',
    description: 'Cozy handmade crochet throw blanket perfect for snuggling. Made with soft acrylic yarn in beautiful patterns.',
    price: 2299,
    image: '/crochet-throw-blanket.jpeg',
    seller: 'Knot & Thread',
    stock: 14,
    category: 'Home Textiles'
  },
  {
    name: 'Handpainted Ceramic Vase',
    shortDescription: 'Decorative ceramic flower vase',
    description: 'Unique handpainted ceramic vase with artistic designs. Perfect for displaying fresh or dried flowers.',
    price: 1299,
    image: '/handprinted-ceramic-vase.jpg',
    seller: 'Pottery Paradise',
    stock: 20,
    category: 'Home Decor'
  },
  {
    name: 'Leather Wallet',
    shortDescription: 'Handcrafted genuine leather wallet',
    description: 'Premium handcrafted wallet made from genuine leather. Multiple card slots and bill compartments.',
    price: 899,
    image: '/leather-wallet.webp',
    seller: 'Leather & Lore',
    stock: 32,
    category: 'Fashion & Accessories'
  },
  {
    name: 'Beaded Jewelry Set',
    shortDescription: 'Handmade beaded necklace and earrings',
    description: 'Beautiful handmade beaded jewelry set including necklace and matching earrings. Unique designs with colorful beads.',
    price: 699,
    image: '/beaded-jewellery-set.avif',
    seller: 'Bead Boutique',
    stock: 25,
    category: 'Fashion & Accessories'
  },
  {
    name: 'Handmade Dream Catcher',
    shortDescription: 'Traditional dream catcher',
    description: 'Authentic handmade dream catcher with feathers and beads. Beautiful wall decoration with cultural significance.',
    price: 849,
    image: '/handmade-dreamcatcher.jpg',
    seller: 'Craft Corner',
    stock: 22,
    category: 'Wall Art'
  }
]

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    
    console.log('Connected to MongoDB')
    
    // Clear existing products
    await Product.deleteMany({})
    console.log('Cleared existing products')
    
    // Insert sample products
    await Product.insertMany(sampleProducts)
    console.log('Sample products added successfully!')
    
    mongoose.connection.close()
    console.log('Database connection closed')
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
