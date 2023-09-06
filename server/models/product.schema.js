//Here all the product schema will be there 
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    imageUrl: String
});

module.exports = mongoose.model('Product', productSchema);