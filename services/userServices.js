const Pool = require('pg').Pool
const pool = new Pool({
  user: 'test',
  host: 'localhost',
  database: 'cerebral',
  password: 'test',
  port: 5432,
}) 

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY uid ASC', (error, result) => {
    if (error) {
      throw error
    }
    response.status(200).json(result.rows)
  })
}

const getUserById = (request, response) => {
  const uid = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE uid = $1', [uid], (error, result) => {
    if (error) {
      throw error
    }
    response.status(200).json(result.rows)
  })
}

const createUser = (request, response) => {
  const { firstname, lastname, email, pass, outreach } = request.body

  pool.query('INSERT INTO users (firstname, lastname, email, pass, outreach) VALUES ($1, $2, $3, $4, $5)', [firstname, lastname, email, pass, outreach], (error, result) => {
    if (error) {
      throw error
    }
    //response.header('Access-Control-Allow-Origin', ['*'])
    response.status(201).send(`User added with name: ${firstname}`)
  })
}

const updateUser = (request, response) => {
  const uid = parseInt(request.params.id)
  const { firstname, lastname, email, pass, outreach} = request.body

  pool.query(
    'UPDATE users SET firstname = $1, lastname = $2, email = $3, pass = $4, outreach = $5 WHERE uid = $6',
    [firstname, lastname, email, pass, outreach, uid],
    (error, result) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${uid}`)
    }
  )
}

const deleteUser = (request, response) => {
  const uid = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE uid = $1', [uid], (error, result) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${uid}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}