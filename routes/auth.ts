import * as express from 'express';
import {login} from '../controllers/authController';
var router = express.Router();

router.post('/login', login)

export {router as authRouter};