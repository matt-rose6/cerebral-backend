
const userServices = require("../services/userServices.js")

module.exports = {
	
	getUserList(req, res) {
		return userServices.getUsers(req, res);
	},

	getUserById(req, res) {
		return userServices.getUserById(req, res);
	},

	addUser(req, res) {
		return userServices.createUser(req, res);
	},

	updateUser(req, res) {
		return userServices.updateUser(req, res);
	},

	deleteUser(req, res) {
		return userServices.deleteUser(req, res);
	}

}