const Pool = require('pg').Pool
const pool = new Pool({
  user: 'test',
  host: 'localhost',
  database: 'cerebral',
  password: 'test',
  port: 5432,
})

const getEmotions = (request, response) => {
  pool.query('SELECT * FROM emotions', (error, result) => {
    if (error) {
      throw error
    }
    response.status(200).json(result.rows)
  })
}

const getEmotionById = (request, response) => {
  const uid = parseInt(request.params.id)
  const {dates} = request.body

  pool.query('SELECT * FROM emotions WHERE uid = $1 AND dates = $2', [uid, dates], (error, result) => {
    if (error) {
      throw error
    }
    response.status(200).json(result.rows)
  })
}

const createEmotion = (request, response) => {
  const { uid, dates, rating } = request.body

  pool.query('INSERT INTO emotions (uid, dates, rating) VALUES ($1, $2, $3)', [uid, dates, rating], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Emotion added with date: ${dates}`)
  })
}

const updateEmotion = (request, response) => {
  const uid = parseInt(request.params.id)
  const { dates, rating } = request.body

  pool.query(
    'UPDATE emotions SET rating = $1 WHERE uid = $3 AND dates = $4',
    [rating, uid, dates],
    (error, result) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Emotion modified with date: ${dates}`)
    }
  )
}

const deleteEmotion = (request, response) => {
  const uid = parseInt(request.params.id)
  const {dates} = request.body

  pool.query('DELETE FROM emotions WHERE uid = $1 AND dates = $2', [uid, dates], (error, result) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Emotion deleted with date: ${dates}`)
  })
}

module.exports = {
  getEmotions,
  getEmotionById,
  createEmotion,
  updateEmotion,
  deleteEmotion,
}