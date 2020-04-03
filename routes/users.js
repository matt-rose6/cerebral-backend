var express = require('express')
var router = express.Router()

const userController = require("../controllers/userController.js")

router.get('/getUsers', userController.getUserList);
router.get('/getUser/:id', userController.getUserById);
router.post('/addUser', userController.addUser);  
router.put('/updateUser/:id', userController.updateUser);
router.delete('/deleteUser/:id', userController.deleteUser);

module.exports = router;