// signupRouter.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const user = require('../app/modals/User');


router.post('/', async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      res.send(`
        <script>
          var isConfirmed = confirm('Mật khẩu và mật khẩu nhập lại không khớp 😟. Nhấn "OK" để thử lại.');
          if (isConfirmed) {
            window.location.href = '/signup';
          } else {
            window.location.href = '/signup';
          }
        </script>
      `);
      return;
    }

    const existingUser = await user.findOne({ username });
    if (existingUser) {
      res.send(`
        <script>
          var isConfirmed = confirm('Tài khoản đã tồn tại :(( Nhấn "OK" để thử lại 😔');
          if (isConfirmed) {
            window.location.href = '/signup';
          } else {
            window.location.href = '/signup';
          }
        </script>
      `);
      return
    }

    // Hash 
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save user new DB
    const newUser = new user({ username, password: hashedPassword });
    await newUser.save();

    res.send(`
      <script>
        var isConfirmed = confirm('Đăng ký thành công <3  Nhấn "OK" để tiếp tục 😘.');
        if (isConfirmed) {
          window.location.href = '/';
        } else {
          window.location.href = '/signup';
        }
      </script>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
