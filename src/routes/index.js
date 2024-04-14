const siteRouter = require('./site');
const cartRouter = require('./cartdetail');
const signUpRouter = require('./signup');
const loginRouter = require('./login');
const adminRouter = require('./admin');

function route(app) {
    app.use('/admin', adminRouter);
    app.use('/cart', cartRouter);
    app.use('/home', siteRouter);
    app.use('/signup', signUpRouter);
    app.use('/login', loginRouter);
}

module.exports = route;
