import * as express from 'express';
import { login, verifyToken } from '../services/authService';
var router = express.Router();

router.post('/login', login);
router.post('/validateToken', verifyToken);

export { router as authRouter };
