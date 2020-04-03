var express = require('express')
var router = express.Router()

const emotionController = require("../controllers/emotionController")

router.get('/getEmotion', emotionController.getEmotionList);
router.get('/getEmotion/:id', emotionController.getEmotionById);
router.post('/addEmotion', emotionController.addEmotion);
router.put('/updateEmotion/:id', emotionController.updateEmotion);
router.delete('/deleteEmotion/:id', emotionController.deleteEmotion);

module.exports = router;