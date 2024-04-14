const Cart = require('../modals/Cart');
const {mongooseToOject} = require('../../util/mongoose')

class AdminCartController {

    // [GET] /login
    show(req, res) {
        Cart.find({})
            .then(function(carts) {
                carts = carts.map(function(cart) {
                    return cart.toObject();
                })
                res.render('admin', {
                    listCarts: carts
                });
            })
            .catch(function(error) {
                return next(error);
            })
    }

    create(req, res) {
        res.render('create');
    }

    store(req, res) {
        const createCart = new Cart(req.body);
        createCart.save()
            .then(() => {
                res.redirect('/admin');
            })
            .catch((error) => {
                console.error('Lỗi khi lưu trữ vào cơ sở dữ liệu:', error);
                res.status(500).send('Lỗi khi lưu trữ vào cơ sở dữ liệu');
            });
    }
    
    edit(req, res) {
        Cart.findById(req.params.id)
            .then(function(carts) {
                res.render('update', {    
                    listCarts: mongooseToOject(carts)
                })
            })
            .catch(function(error) {
                return next(error);
            })
    }

    update(req, res) {
        Cart.updateOne({ _id: req.params.id }, req.body)
            .then(function () {
                res.redirect('/admin');
            })
            .catch(function (error) {
                return next(error);
            });
    }

    // [DELETE] /admin/:id
    destroy(req, res, next) {
        Cart.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

}

module.exports = new AdminCartController;