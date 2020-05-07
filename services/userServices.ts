import { Database } from "./dbService"

const getUsers = (_request, response) => {
  Database.query('SELECT * FROM users ORDER BY uid ASC', (error, result) => {
    if (error) {
      throw error
    }
    response.status(200).json(result.rows)
  })
}

const getUserById = (request, response) => {
  const uid = parseInt(request.params.id)

  Database.query('SELECT * FROM users WHERE uid = $1', [uid], (error, result) => {
    if (error) {
      throw error
    }
    response.status(200).json(result.rows)
  })
}

const createUser = (request, response) => {
  const { firstname, lastname, email, pass, outreach } = request.body

  Database.query('INSERT INTO users (firstname, lastname, email, pass, outreach) VALUES ($1, $2, $3, $4, $5)', [firstname, lastname, email, pass, outreach], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send(result)
  })
}

const updateUser = (request, response) => {
  const uid = parseInt(request.params.id)
  const { firstname, lastname, email, pass, outreach} = request.body

  Database.query(
    'UPDATE users SET firstname = $1, lastname = $2, email = $3, pass = $4, outreach = $5 WHERE uid = $6',
    [firstname, lastname, email, pass, outreach, uid],
    (error, _result) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${uid}`)
    }
  )
}

const deleteUser = (request, response) => {
  const uid = parseInt(request.params.id)

  Database.query('DELETE FROM users WHERE uid = $1', [uid], (error, _result) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${uid}`)
  })
}

export {
  getUsers as getUsersService,
  getUserById as getUserByIdService,
  createUser as createUserService,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
}