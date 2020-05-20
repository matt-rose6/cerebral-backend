import { Database } from './dbService';

const getEntries = async (_request, response) => {
  try {
    const result = Database.query('SELECT * FROM entries')
    return response.status(200).json(result.rows);
  } catch(err){
    return response.send({error: '[entryServices.ts] getEntries error'})
  }
};

const getEntryById = async (request, response) => {
  try {
    const uid = parseInt(request.params.id);
    const result = await Database.query('SELECT * FROM entries WHERE uid = $1', [uid])
    return response.status(200).json(result.rows);
  } catch {
    return response.send({error: '[entryServices.ts] getEntryById error'})
  }
};

const createEntry = async (request, response) => {
  try {
    const { uid, dates, entry } = request.body;
    Database.query('INSERT INTO entries (uid, dates, entry) VALUES ($1, $2, $3)',[uid, dates, entry])
    response.status(201).send(`Entry added with date: ${dates}`);
  } catch (err) {
    response.send({error: '[entryServices.ts] createEntry error'})
  }
};

const updateEntry = async (request, response) => {
  try {
    const uid = parseInt(request.params.id);
    const { dates, entry } = request.body;
    await Database.query('UPDATE entries SET entry = $1 WHERE uid = $2 AND dates = $3',[entry, uid, dates])
    response.status(200).send(`Entry modified with date: ${dates}`);
  } catch (err) {
    response.send({error: '[entryServices.ts] updateEntry error'})
  }
};

const deleteEntry = async (request, response) => {
  try {
    const uid = parseInt(request.params.id);
    const { dates } = request.body;
    await Database.query('DELETE FROM entries WHERE uid = $1 AND dates = $2',[uid, dates])
    response.status(200).send(`Entry deleted with date: ${dates}`);
  } catch(err) {
    response.send({error: '[entryServices.ts] updateEntry error'})
  }
};

export {
  getEntries as getEntriesService,
  getEntryById as getEntryByIdService,
  createEntry as createEntryService,
  updateEntry as updateEntryService,
  deleteEntry as deleteEntryService,
};
