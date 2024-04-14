const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');

const adminCartController = require('../app/controllers/AdminController');

router.post('/store', adminCartController.store)
router.get('/create', adminCartController.create)
router.get('/:id/edit', adminCartController.edit)
router.put('/:id', adminCartController.update)
router.delete('/:id', adminCartController.destroy)
router.get('/', adminCartController.show)

module.exports= router;