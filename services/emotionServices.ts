import { Database } from './dbService';

const getEmotions = async (_request, response) => {
  try {
    const result = await Database.collection('bdiSurvey').get();
    var res = [];
    result.forEach((doc) => {
      res.push(doc.data());
    });
    response.status(200).send({ data: res });
  } catch (err) {
    response.send({ error: '[emotionServices.ts] getEmotions error' });
  }
};

const getEmotionById = async (request, response) => {
  try {
    const uid = request.params.id;
    const result = await Database.collection('bdiSurvey')
      .where('uid', '==', uid)
      .get();
    let res = [];
    result.forEach((doc) => {
      res.push(doc.data());
    });
    response.status(200).send(res);
  } catch (err) {
    response.send({ error: '[emotionServices.ts] getEmotionsById error' });
  }
};

const createEmotion = async (request, response) => {
  const { uid, dates, survey } = request.body;

  await Database.collection('bdiSurvey').add({
    uid: uid,
    dates: dates,
    sad: survey[0],
    hopeless: survey[1],
    failure: survey[2],
    dissatisfied: survey[3],
    guilt: survey[4],
    punishment: survey[5],
    dissappointment: survey[6],
    blame: survey[7],
    suicidal: survey[8],
    crying: survey[9],
    irritation: survey[10],
    antisocial: survey[11],
    indecision: survey[12],
    ugliness: survey[13],
    motivation: survey[14],
    restless: survey[15],
    tiredness: survey[16],
    appetite: survey[17],
    weight: survey[18],
    physical: survey[19],
    libido: survey[20],
  });
  response.status(201).send(`Emotion added with date: ${dates}`);
};

const updateEmotion = async (request, response) => {
  try {
    const uid = request.params.id;
    const { dates, rating } = request.body;
    const docToUpdate = await Database.collection('bdiSurvey')
      .where('uid', '==', uid)
      .where('dates', '==', dates);
    docToUpdate.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.update({
          rating: rating,
          dates: dates,
        });
      });
    });
    response.status(200).send(`Entry modified with date: ${dates}`);
  } catch (err) {
    response.send({ error: '[emotionServices.ts] updateEmotion error' });
  }
};

const deleteEmotion = async (request, response) => {
  try {
    const uid = request.params.id;
    const { dates } = request.body;
    const docToDelete = await Database.collection('bdiSurvey')
      .where('uid', '==', uid)
      .where('dates', '==', dates);
    docToDelete.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
    response.status(200).send(`Entry deleted with date: ${dates}`);
  } catch (err) {
    response.send({ error: '[emotionServices.ts] deleteEmotion error' });
  }
};

export {
  getEmotions as getEmotionsService,
  getEmotionById as getEmotionByIdService,
  createEmotion as createEmotionService,
  updateEmotion as updateEmotionService,
  deleteEmotion as deleteEmotionService,
};
