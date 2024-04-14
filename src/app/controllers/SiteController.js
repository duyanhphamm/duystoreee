const Cart = require('../modals/Cart');
const {mutipleMongooseToObject} = require('../../util/mongoose')

class SiteController {

    // [GET] /news
    index(req, res) {

        Cart.find({})
            .then(function(carts) {
                carts = carts.map(function(cart) {
                    return cart.toObject();
                })
                res.render('home', {
                    listCarts: carts
                });
            })
            .catch(function(error) {
                return next(error);
            })

    }

}

module.exports = new SiteController;