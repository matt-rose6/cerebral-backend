//import * as language from '@google-cloud/language';
const language = require('@google-cloud/language');

const sentimentAnalysis = async (entry) => {
  // Instantiates a client
  const client = new language.LanguageServiceClient();

  // The text to analyze
  const text = entry;

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the text
  const [result] = await client.analyzeSentiment({ document: document });
  const sentiment = result.documentSentiment;
  return {text: text, score: sentiment.score, magnitude: sentiment.magnitude}
};

//export { sentimentAnalysis }
module.exports = { sentimentAnalysis };
