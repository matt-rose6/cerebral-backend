import {
  getUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
} from '../services/userServices';

const getUserList = (req, res) => {
  return getUsersService(req, res);
};

const getUserById = (req, res) => {
  return getUserByIdService(req, res);
};

const addUser = (req, res) => {
  //const { firstname, lastname, email, pass, outreach } = req.body;
  //console.log(pass);
  // if(pass.length < 5){
  // 	const error = new Error('Password must be 5 characters or longer.');
  // 	throw error;
  // }
  return createUserService(req, res);
};

const updateUser = (req, res) => {
  return updateUserService(req, res);
};

const deleteUser = (req, res) => {
  return deleteUserService(req, res);
};

export { getUserList, getUserById, addUser, updateUser, deleteUser };
