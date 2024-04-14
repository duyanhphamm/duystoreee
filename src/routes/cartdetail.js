const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartController');

// Thêm vào giỏ hàng
router.get('/add-to-cart/:_id', cartController.addToCart);

// Hiển thị giỏ hàng
router.get('/:_id', cartController.show);

module.exports = router;