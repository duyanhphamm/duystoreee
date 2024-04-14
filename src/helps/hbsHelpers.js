// src/helpers/hbsHelpers.js
const Handlebars = require('handlebars');

Handlebars.registerHelper('calculateTotalPrice', function(item) {
    return item.productPrice * item.quantity;
});

Handlebars.registerHelper('calculateOverallTotalPrice', function(cart) {
    let overallTotalPrice = 0;
    if (cart) {
        cart.forEach(item => {
            overallTotalPrice += item.productPrice * item.quantity;
        });
    }
    return overallTotalPrice;
});

module.exports = Handlebars;