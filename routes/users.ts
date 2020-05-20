import * as express from 'express';
import {
  getUserList,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} from '../controllers/userController';
import { authenticateHeader } from '../services/authService';
var router = express.Router();

router.get('/getUsers', authenticateHeader, getUserList);
router.get('/getUser/:id', authenticateHeader, getUserById);
router.post('/addUser', addUser);
router.put('/updateUser/:id', authenticateHeader, updateUser);
router.delete('/deleteUser/:id', authenticateHeader, deleteUser);

export { router as userRouter };
