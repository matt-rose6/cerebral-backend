
const entryServices = require("../services/entryServices.js")

module.exports = {
	
	getEntryList(req, res) {
		return entryServices.getEntries(req, res);
	},

	getEntryById(req, res) {
		return entryServices.getEntryById(req, res);
	},

	addEntry(req, res) {
		return entryServices.createEntry(req, res);
	},

	updateEntry(req, res) {
		return entryServices.updateEntry(req, res);
	},

	deleteEntry(req, res) {
		return entryServices.deleteEntry(req, res);
	}

}