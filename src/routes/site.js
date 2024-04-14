const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
const SearchController = require('../app/controllers/SearchController');

router.get('/search', SearchController.search);

router.use('/', siteController.index)

module.exports= router;
