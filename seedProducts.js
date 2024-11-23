const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('mongodb+srv://risheshcertificates:3DlJoFz2UMY6Z26o@cluster0.mshwd.mongodb.net/ecommerceDB?retryWrites=true&w=majority&appName=Cluster0e', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const products = [
  { name: 'Casual Shoes', price: 49.99, description: 'Comfortable casual shoes.', imageUrl: 'URL_TO_IMAGE', category: 'shoes' },
  { name: 'Running Shoes', price: 79.99, description: 'High-performance running shoes.', imageUrl: 'URL_TO_IMAGE', category: 'shoes' },
  { name: 'Leather Belt', price: 24.99, description: 'Stylish leather belt.', imageUrl: 'URL_TO_IMAGE', category: 'accessories' },
  { name: 'Wool Scarf', price: 15.99, description: 'Cozy wool scarf.', imageUrl: 'URL_TO_IMAGE', category: 'accessories' },
  { name: 'Blue Jeans', price: 39.99, description: 'Classic blue jeans.', imageUrl: 'URL_TO_IMAGE', category: 'jeans' },
  { name: 'Black Jeans', price: 49.99, description: 'Trendy black jeans.', imageUrl: 'URL_TO_IMAGE', category: 'jeans' },
  { name: 'White T-Shirt', price: 19.99, description: 'Comfortable white T-shirt.', imageUrl: 'URL_TO_IMAGE', category: 'tops' },
  { name: 'Black Tank Top', price: 14.99, description: 'Casual black tank top.', imageUrl: 'URL_TO_IMAGE', category: 'tops' },
  { name: 'Leather Jacket', price: 89.99, description: 'Stylish leather jacket.', imageUrl: 'URL_TO_IMAGE', category: 'jackets' },
  { name: 'Denim Jacket', price: 69.99, description: 'Classic denim jacket.', imageUrl: 'URL_TO_IMAGE', category: 'jackets' },
];

const seedDB = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Database seeded with products');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
