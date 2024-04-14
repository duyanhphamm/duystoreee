const Cart = require('../modals/Cart');
const { mongooseToOject } = require('../../util/mongoose');

class CartController {
    // [GET] /cart/:_id
    show(req, res, next) {
        Cart.findOne({ _id: req.params._id })
            .then(function (carts) {
                const totalCartItems = calculateTotalCartItems(req.session.cart);
                const totalCartValue = calculateTotalCartValue(req.session.cart);
                res.render('cart/show', {
                    listCarts: mongooseToOject(carts),
                    totalCartItems: totalCartItems,
                    totalCartValue: totalCartValue,
                });
            })
            .catch(function (error) {
                return next(error);
            });
    }

    // [GET] /cart/add-to-cart/:_id
    addToCart(req, res, next) {
        console.log("Add to cart route called");
        const productId = req.params._id;

        // Lấy giỏ hàng từ session hoặc khởi tạo nếu chưa có
        let cart = req.session.cart || [];

        // Lấy thông tin sản phẩm từ CSDL
        Cart.findById(productId)
            .then(product => {
                const existingItem = cart.find(item => item.productId === productId);

                if (existingItem) {
                    // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
                    existingItem.quantity += 1;
                } else {
                    // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
                    cart.push({
                        productId,
                        quantity: 1,
                        productName: product.name,
                        price: product.price || 0, // Sử dụng giá mặc định nếu giá không có giá trị
                    });
                }

                // Lưu giỏ hàng vào session
                req.session.cart = cart;

                // Cập nhật lại số lượng sản phẩm và tổng giá trị giỏ hàng cho mỗi request
                res.locals.totalCartItems = calculateTotalCartItems(cart);
                res.locals.totalCartValue = calculateTotalCartValue(cart);

                // Chuyển hướng hoặc render lại trang cartdetail
                res.redirect(`/cart/${productId}`);
            })
            .catch(error => {
                console.error('Lỗi khi lấy thông tin sản phẩm:', error);
                // Xử lý lỗi nếu cần thiết
                return next(error);
            });
    }
}

// Hàm hỗ trợ để tính tổng số lượng đơn hàng
function calculateTotalCartItems(cart) {
    if (!cart) return 0;
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// Hàm hỗ trợ để tính tổng giá trị giỏ hàng
function calculateTotalCartValue(cart) {
    if (!cart) return 0;
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
}

module.exports = new CartController();
