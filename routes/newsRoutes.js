const { Router } = require('express');
const newsController = require('../controllers/newsController');

const router = Router();

router.get('/news', newsController.getNews);


module.exports = router;
