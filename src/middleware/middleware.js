// middleware.js

const calculateTotalCartItems = (cart) => {
    if (!cart) return 0;
    return cart.reduce((total, item) => total + item.quantity, 0);
};

const calculateTotalCartValue = (cart) => {
    if (!cart) return 0;
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
};

const cartMiddleware = (req, res, next) => {
    const cart = req.session.cart || [];
    res.locals.totalCartItems = calculateTotalCartItems(cart);
    res.locals.totalCartValue = calculateTotalCartValue(cart);
    next();
};

module.exports = { cartMiddleware };
