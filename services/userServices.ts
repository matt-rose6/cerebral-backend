import { Database } from './dbService';
import * as bcrypt from 'bcrypt';
const saltRounds = 10;

const getUsers = async (_request, response) => {
  try {
    const result = await Database.collection("user").get();
    var res = []
    result.forEach(doc => {
      res.push(doc.data());
    })
    response.status(200).send(res);
  } catch(err){
    response.send({error: '[userServices.ts] getUser error'})
  }
};

const getUserById = async (request, response) => {
  try {
    const uid = request.params.id;
    const result = await Database.collection("user").doc(uid);
    result.get().then(doc => {
      response.status(200).send(doc.data())
    })
  } catch(err){
    response.send({error: '[userServices.ts] getUserById error'})
  }
};

const createUser = (request, response) => {
  const { firstname, lastname, email, pass, outreach } = request.body;
  doesEmailAlreadyExist(email).then(result => {
    if (result>0) {
      response.send({error:'User with this email already exists'}); //response 400 ?
    } else {
        bcrypt.hash(pass, saltRounds, async (_err, hash) => {
          const result = await Database.collection("user").add({
          firstname: firstname,
          lastname: lastname,
          email: email,
          pass: hash,
          outreach: outreach,
        })
        result.update({ uid: result.id })
        const res = (await result.get()).data();
        response.status(201).send(res);
      });
    }
  })
};

const updateUser = (request, response) => { 
  const uid = request.params.id;
  const { firstname, lastname, email, outreach } = request.body;
  differentUserHasEmail(email, uid).then(otherUsers => {
    if(otherUsers.size>0) {
      response.status(400).send({error:'Another user with this email already exists'}); //response 400 ?
    } else {
      //user can't update password now but should be able to in the future
      //use bcryt here when that happnes
      Database.collection("user").doc(uid).update({
        firstname: firstname,
        lastname: lastname,
        email: email,
        outreach: outreach,
      }).then(
        response.status(200).send(`User modified with ID: ${uid}`)
      )
    }
  })
};

const deleteUser = async (request, response) => {
  try {
    const uid = request.params.id;
    await Database.collection("user").doc(uid).delete()
    response.status(200).send(`User deleted with ID: ${uid}`);
  } catch(err) {
    response.send({error: '[userServices.ts] deleteUser error'});
  }
};

const doesEmailAlreadyExist = async (email) => {
  const result = await (await Database.collection("user").where("email", "==", email).get()).size;
  return result;
};

const differentUserHasEmail = async (email, uid) => {
  const result = await Database.collection("user").where("email", "==", email).where("uid", "==", uid).get(); 
  return result;
};

export {
  getUsers as getUsersService,
  getUserById as getUserByIdService,
  createUser as createUserService,
  updateUser as updateUserService,
  deleteUser as deleteUserService
};
