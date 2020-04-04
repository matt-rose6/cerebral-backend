import * as express from 'express';
import {getUserList, getUserById, addUser, updateUser, deleteUser} from "../controllers/userController";

var router = express.Router();

router.get('/getUsers', getUserList);
router.get('/getUser/:id', getUserById);
router.post('/addUser', addUser);  
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);

export { router as userRouter};