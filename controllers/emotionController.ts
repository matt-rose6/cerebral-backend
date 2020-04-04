
import {getEmotionsService, getEmotionByIdService, createEmotionService, updateEmotionService, deleteEmotionService} from "../services/emotionServices";

const getEmotionList = (req, res) => {
	return getEmotionsService(req, res);
};

const getEmotionById = (req, res) => {
	return getEmotionByIdService(req, res);
};

const addEmotion = (req, res) => {
	return createEmotionService(req, res);
};

const updateEmotion = (req, res) => {
	return updateEmotionService(req, res);
};

const deleteEmotion = (req, res) => {
	return deleteEmotionService(req, res);
};

export {
	getEmotionList,
	getEmotionById,
	addEmotion,
	updateEmotion,
	deleteEmotion
}