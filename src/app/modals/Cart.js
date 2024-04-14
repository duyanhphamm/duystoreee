const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    img: String,
    name: String,
    origin: String,
    sale: String,
    country: String,
    mimgf: String,
    mimgs: String,
    mimgt: String,
    price: Number,
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);
