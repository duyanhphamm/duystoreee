// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Thay 'User' bằng tên model của người dùng
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Thay 'Product' bằng tên model của sản phẩm
    quantity: { type: Number, default: 1 }, // Số lượng đơn hàng, có thể điều chỉnh tùy vào yêu cầu của bạn
    // Thêm các trường khác tùy ý
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
