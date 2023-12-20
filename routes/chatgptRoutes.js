const {Router} = require('express');
const chatgptController = require('../controllers/chatgptController');


const router = Router();

router.post('/rhyme', chatgptController.getRhyme);
router.post('/bias', chatgptController.getBias);


module.exports = router;