const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    brand: String,
    price: String

})
module.exports = mongoose.model('products', productSchema);