
import {getEntriesService, getEntryByIdService, createEntryService, updateEntryService, deleteEntryService} from "../services/entryServices";

const getEntryList = (req, res) => {
	return getEntriesService(req, res);
};

const getEntryById = (req, res) => {
	return getEntryByIdService(req, res);
};

const addEntry = (req, res) => {
	return createEntryService(req, res);
};

const updateEntry = (req, res) => {
	return updateEntryService(req, res);
};

const deleteEntry = (req, res) => {
	return deleteEntryService(req, res);
};

export {
	getEntryList,
	getEntryById,
	addEntry,
	updateEntry,
	deleteEntry
}