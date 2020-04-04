
import * as express from 'express';
import {userRouter} from "./users";
import {entryRouter} from "./entries";
import {emotionRouter} from "./emotions";
var router = express.Router()

router.use('/users', userRouter)
router.use('/entries', entryRouter)
router.use('/emotions', emotionRouter)

export { router as routes };

