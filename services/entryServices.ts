import { Database } from './dbService';
import { sentimentAnalysis } from './languageServices';

const getEntries = async (_request, response) => {
  try {
    const result = await Database.collection('journal').get();
    var res = [];
    result.forEach((doc) => {
      res.push(doc.data());
    });
    response.status(200).send(res);
  } catch (err) {
    response.send({ error: '[entryService.ts] getEntries error' });
  }
};

const getEntryById = async (request, response) => {
  try {
    const uid = request.params.id;
    const result = await Database.collection('journal')
      .where('uid', '==', uid)
      .get();
    let res = [];
    result.forEach((doc) => {
      res.push(doc.data());
    });
    response.status(200).send(res);
  } catch (err) {
    response.send({ error: '[entryService.ts] getEntryById error' });
  }
};

const createEntry = async (request, response) => {
  try {
    const { uid, dates, entry } = request.body;
    const sentiment = sentimentAnalysis(entry);
    Database.collection('journal').add({
      uid: uid,
      dates: dates,
      entry: entry,
      score: (await sentiment).score,
      magnitude: (await sentiment).magnitude,
    });
    response.status(201).send(`Entry added with date: ${dates}`);
  } catch (err) {
    response.send({ error: '[entryServices.ts] createEntry error' });
  }
};

const updateEntry = async (request, response) => {
  try {
    const uid = request.params.id;
    const { dates, entry } = request.body;
    const sentiment = sentimentAnalysis(entry);
    const docToUpdate = await Database.collection('journal')
      .where('uid', '==', uid)
      .where('dates', '==', dates);
    docToUpdate.get().then((querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
        doc.ref.update({
          entry: entry,
          dates: dates,
          score: (await sentiment).score,
          magnitude: (await sentiment).magnitude,
        });
      });
    });
    response.status(200).send(`Entry modified with date: ${dates}`);
  } catch (err) {
    response.send({ error: '[entryServices.ts] updateEntry error' });
  }
};

const deleteEntry = async (request, response) => {
  try {
    const uid = request.params.id;
    const { dates } = request.body;
    const docToDelete = await Database.collection('journal')
      .where('uid', '==', uid)
      .where('dates', '==', dates);
    docToDelete.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
    response.status(200).send(`Entry deleted with date: ${dates}`);
  } catch (err) {
    response.send({ error: '[entryServices.ts] updateEntry error' });
  }
};

export {
  getEntries as getEntriesService,
  getEntryById as getEntryByIdService,
  createEntry as createEntryService,
  updateEntry as updateEntryService,
  deleteEntry as deleteEntryService,
};
