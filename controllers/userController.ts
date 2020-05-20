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
  return createUserService(req, res);
};

const updateUser = (req, res) => {
  return updateUserService(req, res);
};

const deleteUser = (req, res) => {
  return deleteUserService(req, res);
};

export { getUserList, getUserById, addUser, updateUser, deleteUser };
