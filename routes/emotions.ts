import * as express from 'express';
import {
  getEmotionList,
  getEmotionById,
  addEmotion,
  updateEmotion,
  deleteEmotion,
} from '../controllers/emotionController';
var router = express.Router();

router.get('/getEmotion', getEmotionList);
router.get('/getEmotion/:id', getEmotionById);
router.post('/addEmotion', addEmotion);
router.put('/updateEmotion/:id', updateEmotion);
router.delete('/deleteEmotion/:id', deleteEmotion);

export { router as emotionRouter };
