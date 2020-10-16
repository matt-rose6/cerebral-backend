import * as express from 'express';
import { userRouter } from './users';
import { entryRouter } from './entries';
import { emotionRouter } from './emotions';
import { authRouter } from './auth';
var router = express.Router();

router.use('/users', userRouter);
router.use('/entries', entryRouter);
router.use('/emotions', emotionRouter);
router.use('/auth', authRouter);

export { router as routes };
