const { Router } = require('express');
const newsController = require('../controllers/newsController');
const { checkToken } = require('../middleware/middleware');

const router = Router();

router.get('/news',checkToken, newsController.getNews);


module.exports = router;
