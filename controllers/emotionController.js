
const emotionServices = require("../services/emotionServices.js")

module.exports = {
	
	getEmotionList(req, res) {
		return emotionServices.getEmotions(req, res);
	},

	getEmotionById(req, res) {
		return emtionServices.getEmotionById(req, res);
	},

	addEmotion(req, res) {
		return emotionServices.createEmotion(req, res);
	},

	updateEmotion(req, res) {
		return emotionServices.updateEmotion(req, res);
	},

	deleteEmotion(req, res) {
		return emotionServices.deleteEmotion(req, res);
	}

}