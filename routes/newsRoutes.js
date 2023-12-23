const { Router } = require('express');
const newsController = require('../controllers/newsController');
const { checkToken } = require('../middleware/middleware');

const router = Router();

router.get('/news',checkToken, newsController.getNews);
router.post('/news-data',checkToken, newsController.getNewsData);
router.post('/upload-news', checkToken, newsController.addNewsData);


module.exports = router;
