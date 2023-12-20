const { Router } = require("express");
const chatgptController = require("../controllers/chatgptController");
const { checkToken } = require("../middleware/middleware");

const router = Router();

router.post("/rhyme", checkToken, chatgptController.getRhyme);
router.post("/bias", checkToken, chatgptController.getBias);

module.exports = router;
