import * as express from 'express';
import { login, verifyToken } from '../services/authService';
var router = express.Router();

router.post('/login', login);
router.post('/authenticate', verifyToken);

export { router as authRouter };
