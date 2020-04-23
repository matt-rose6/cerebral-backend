import { Database } from "./dbService"


const getEntries = (_request, response) => {
  Database.query('SELECT * FROM entries', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getEntryById = (request, response) => {
  const uid = parseInt(request.params.id)
  const {dates} = request.body

  Database.query('SELECT * FROM entries WHERE uid = $1 AND dates = $2', [uid, dates], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createEntry = (request, response) => {
  const { uid, dates, entry } = request.body

  Database.query('INSERT INTO entries (uid, dates, entry) VALUES ($1, $2, $3)', [uid, dates, entry], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Entry added with date: ${dates}`)
  })
}

const updateEntry = (request, response) => {
  const uid = parseInt(request.params.id)
  const { dates, entry } = request.body

  Database.query(
    'UPDATE entries SET entry = $1 WHERE uid = $2 AND dates = $3',
    [entry, uid, dates],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Entry modified with date: ${dates}`)
    }
  )
}

const deleteEntry = (request, response) => {
  const uid = parseInt(request.params.id)
  const {dates} = request.body

  Database.query('DELETE FROM entries WHERE uid = $1 AND dates = $2', [uid, dates], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Entry deleted with date: ${dates}`)
  })
}

export {
  getEntries as getEntriesService,
  getEntryById as getEntryByIdService,
  createEntry as createEntryService,
  updateEntry as updateEntryService,
  deleteEntry as deleteEntryService,
}