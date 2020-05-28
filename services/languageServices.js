//import * as language from '@google-cloud/language';
const language = require('@google-cloud/language')

const sentimentAnalysis = async (req, res) => {
  // Instantiates a client
  const client = new language.LanguageServiceClient();

  // The text to analyze
  const text = req.body.text;
  //const text = "Hello, I am feeling good today!"

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the text
  const [result] = await client.analyzeSentiment({document: document});
  const sentiment = result.documentSentiment;

  // console.log(`Text: ${text}`)
  // console.log(`Sentiment score: ${sentiment.score}`);
  // console.log(`Sentiment magnitude: ${sentiment.magnitude}`);

  res.json({text: text, score: sentiment.score, magnitude: sentiment.magnitude});
}

//export { sentimentAnalysis }
module.exports = { sentimentAnalysis }