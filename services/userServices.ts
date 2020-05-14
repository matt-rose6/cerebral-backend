import { Database } from './dbService';

const getUsers = (_request, response) => {
  Database.query('SELECT * FROM users ORDER BY uid ASC', (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).json(result.rows);
  });
};

const getUserById = (request, response) => {
  const uid = parseInt(request.params.id);

  Database.query( 
    'SELECT * FROM users WHERE uid = $1',
    [uid],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).json(result.rows);
    }
  );
};

const createUser = (request, response) => {
  const { firstname, lastname, email, pass, outreach } = request.body;
  doesEmailAlreadyExist(email).then(otherUsers => {
    //other users exist in database with this email
    if (otherUsers.rows.length>0) {
      response.send({error:'User with this email already exists'}); //response 400 ?
    } else {
      Database.query(
        'INSERT INTO users (firstname, lastname, email, pass, outreach) VALUES ($1, $2, $3, $4, $5)',
        [firstname, lastname, email, pass, outreach],
        (error, result) => {
          if (error) {
            throw error;
          }
          response.status(201).send(result);
        }
      );
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

const deleteUser = (request, response) => {
  const uid = parseInt(request.params.id);
  Database.query(
    'DELETE FROM users WHERE uid = $1',
    [uid],
    (error, _result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${uid}`);
    }
  );
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
