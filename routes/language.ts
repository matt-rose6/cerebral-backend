import * as express from 'express';
import { sentimentAnalysis } from '../services/languageServices.js';
var router = express.Router();

router.post('/getSentiment', sentimentAnalysis);

export { router as languageRouter };
