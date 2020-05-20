import * as express from 'express';
import {
  getEmotionList,
  getEmotionById,
  addEmotion,
  updateEmotion,
  deleteEmotion,
} from '../controllers/emotionController';
import { authenticateHeader } from '../services/authService';
var router = express.Router();

router.get('/getEmotion', authenticateHeader, getEmotionList);
router.get('/getEmotion/:id', authenticateHeader, getEmotionById);
router.post('/addEmotion', authenticateHeader, addEmotion);
router.put('/updateEmotion/:id', authenticateHeader, updateEmotion);
router.delete('/deleteEmotion/:id', authenticateHeader, deleteEmotion);

export { router as emotionRouter };
