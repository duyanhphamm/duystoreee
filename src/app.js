const express = require('express');
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const methodOverride = require('method-override');
const port = 3000;
const bcrypt = require('bcrypt')
const user = require('./app/modals/User');
const session = require('express-session');
const { cartMiddleware } = require('./middleware/middleware');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'phamanhduy',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

const hbs = handlebars.create({
  // ... Các cài đặt khác
  helpers: {
      totalCartItems: function (cart) {
          if (!cart) return 0;
          return cart.reduce((total, item) => total + item.quantity, 0);
      }
  }
});


const route = require('./routes');

// connect db
const db = require('./config/db');
const { log } = require('console');
db.connect();

app.use((req, res, next) => {
  // Lấy giỏ hàng từ session hoặc khởi tạo nếu chưa có
  const cart = req.session.cart || [];

  // Tính toán tổng số lượng sản phẩm trong giỏ hàng
  const totalCartItems = calculateTotalCartItems(cart);

  // Truyền biến totalCartItems và giỏ hàng cho tất cả các template
  res.locals.totalCartItems = totalCartItems;
  res.locals.cart = cart;

  // Tiếp tục xử lý các middleware và route tiếp theo
  next();
});

// Hàm hỗ trợ để tính tổng số lượng đơn hàng
function calculateTotalCartItems(cart) {
    if (!cart) return 0;
    return cart.reduce((total, item) => total + item.quantity, 0);
}


app.use(cartMiddleware);

// SET file assets
app.use(express.static(path.join(__dirname, 'public')));

// MORGAN
app.use(morgan('combined'));

app.use(methodOverride('_method'))

// Set folder view
app.set('views', path.join(__dirname, 'resources/views'));

// Template engine
app.engine('hbs', handlebars({
  extname: ".hbs"
}));
app.set('view engine', 'hbs');

// Route init
route(app);

app.get('/', (req, res) => {
  res.render('login');
})

app.get('/signup', (req, res) => {
  res.render('signup');
})

app.get('/admin', (req, res) => {
  res.render('admin');
})


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
})
