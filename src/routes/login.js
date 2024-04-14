// signupRouter.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const user = require('../app/modals/User');

router.post('/', async (req, res) => {
  try {
    const check = await user.findOne({ username: req.body.username });
    if (!check) {
        res.send(`
            <script>
            var isConfirmed = confirm('Tài khoản không đúng :((.');
            if (isConfirmed) {
                window.location.href = '/';
            } else {
                window.location.href = '/';
            }
            </script>
        `);
        return; // Kết thúc hàm xử lý ở đây
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
    if(check.username === 'admin') {
        res.send(`
            <script>
            var isConfirmed = confirm('Chào mừng trở lại ADMIN 👨‍💻.');
            if (isConfirmed) {
                window.location.href = '/admin';
            } else {
                window.location.href = '/';
            }
            </script>
        `);
    } else if (isPasswordMatch) {
        res.send(`
            <script>
            var isConfirmed = confirm('Đăng nhập thành công <3  Nhấn "OK" để tiếp tục 😘.');
            if (isConfirmed) {
                window.location.href = '/home';
            } else {
                window.location.href = '/';
            }
            </script>
        `);
    } else {
        res.send(`
            <script>
            var isConfirmed = confirm('Tài khoản hoặc Mật khẩu không chính xác 😥  Nhấn "OK" để đăng nhập lại :((.');
            if (isConfirmed) {
                window.location.href = '/';
            } else {
                window.location.href = '/';
            }
            </script>
        `);
    }

    console.log('Username:', req.body.username);
console.log('Password:', req.body.password);
console.log('User found:', check);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
