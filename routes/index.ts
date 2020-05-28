import * as express from 'express';
import { userRouter } from './users';
import { entryRouter } from './entries';
import { emotionRouter } from './emotions';
import { authRouter } from './auth';
import { languageRouter } from './language';
var router = express.Router();

router.use('/users', userRouter);
router.use('/entries', entryRouter);
router.use('/emotions', emotionRouter);
router.use('/auth', authRouter);
router.use('/language', languageRouter)

export { router as routes };
