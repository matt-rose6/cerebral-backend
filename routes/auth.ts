import * as express from 'express';
import { login } from '../services/authService';
var router = express.Router();

router.post('/login', login)

export {router as authRouter};