import { Database } from './dbService';
import * as bcrypt from 'bcrypt';
const saltRounds = 10;

const getUsers = async (_request, response) => {
  try {
    const result = await Database.query('SELECT * FROM users ORDER BY uid ASC');
    response.status(200).send(result.rows);
  } catch(err){
    response.send({error: '[userServices.ts] getUser error'})
  }
};

const getUserById = async (request, response) => {
  try {
    const uid = parseInt(request.params.id);
    const result = await Database.query('SELECT * FROM users WHERE uid = $1', [uid]);
    response.status(200).send(result.rows);
  } catch(err){
    response.send({error: '[userServices.ts] getUserById error'})
  }
};

const createUser = (request, response) => {
  const { firstname, lastname, email, pass, outreach } = request.body;
  doesEmailAlreadyExist(email).then(otherUsers => {
    //other users exist in database with this email
    if (otherUsers.rows.length>0) {
      response.send({error:'User with this email already exists'}); //response 400 ?
    } else {
      bcrypt.hash(pass, saltRounds, (err, hash) => {
        Database.query(
          'INSERT INTO users (firstname, lastname, email, pass, outreach) VALUES ($1, $2, $3, $4, $5)',
          [firstname, lastname, email, hash, outreach],
          (error, result) => {
            if (error) {
              throw error;
            }
            response.status(201).send(result);
          }
        );
      })
    }
  })
};

const updateUser = (request, response) => {
  const uid = parseInt(request.params.id);
  const { firstname, lastname, email, pass, outreach } = request.body;
  differentUserHasEmail(email, uid).then(otherUsers => {
    //other users exist in database with this email
    if(otherUsers.rows.length>0) {
      response.send({error:'Another user with this email already exists'}); //response 400 ?
    } else {
      //user can't update password now but should be able to in the future
      //use bcryt here when that happnes
      Database.query(
        'UPDATE users SET firstname = $1, lastname = $2, email = $3, pass = $4, outreach = $5 WHERE uid = $6',
        [firstname, lastname, email, pass, outreach, uid],
        (error, _result) => {
          if (error) {
            throw error;
          }
          response.status(200).send(`User modified with ID: ${uid}`);
        }
      );
    }
  })
};

const deleteUser = async (request, response) => {
  try {
    const uid = parseInt(request.params.id);
    await Database.query('DELETE FROM users WHERE uid = $1', [uid])
    response.status(200).send(`User deleted with ID: ${uid}`);
  } catch(err) {
    response.send({error: '[userServices.ts] deleteUser error'});
  }
};

const doesEmailAlreadyExist = async (email) => {
  const result = await Database.query('SELECT * FROM users WHERE email = $1', [email]);
  return result;
};

const differentUserHasEmail = async (email, uid) => {
  const result = await Database.query('SELECT * FROM users WHERE email = $1 AND uid != $2', [email, uid]);
  return result;
};

export {
  getUsers as getUsersService,
  getUserById as getUserByIdService,
  createUser as createUserService,
  updateUser as updateUserService,
  deleteUser as deleteUserService
};
