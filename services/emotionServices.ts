import { Database } from "./dbService"
const DB_NAME = "cesdrSurvey" //cesdrSurvey or phq9Survey

const getEmotions = (_request, response) => {
  Database.query('SELECT * FROM ' + DB_NAME, (error, result) => {
    if (error) {
      throw error
    }
    response.status(200).json(result.rows)
  })
}

const getEmotionById = (request, response) => {
  const uid = parseInt(request.params.id)
  const {dates} = request.body

  Database.query('SELECT * FROM ' + DB_NAME + ' WHERE uid = $1 AND dates = $2', [uid, dates], (error, result) => {
    if (error) {
      throw error
    }
    response.status(200).json(result.rows)
  })
}

const createEmotion = (request, response) => {
  const { uid, dates, survey } = request.body
  //console.log(survey)

  Database.query('INSERT INTO ' + DB_NAME + ' (uid, dates, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)', 
    [uid, dates, survey[0], survey[1], survey[2], survey[3],survey[4], survey[5], survey[6], survey[7],survey[8], survey[9], survey[10], survey[11],survey[12], survey[13], survey[14], survey[15],survey[16], survey[17], survey[18], survey[19]], (error, _result) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Emotion added with date: ${dates}`)
    })
}

const updateEmotion = (request, response) => {
  const uid = parseInt(request.params.id)
  const { dates, rating } = request.body

  Database.query(
    'UPDATE ' + DB_NAME + ' SET rating = $1 WHERE uid = $3 AND dates = $4',
    [rating, uid, dates],
    (error, _result) => {
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

  Database.query('DELETE FROM ' + DB_NAME + ' WHERE uid = $1 AND dates = $2', [uid, dates], (error, result) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Emotion deleted with date: ${dates}`)
  })
}

export {
  getEmotions as getEmotionsService,
  getEmotionById as getEmotionByIdService,
  createEmotion as createEmotionService,
  updateEmotion as updateEmotionService,
  deleteEmotion as deleteEmotionService,
}