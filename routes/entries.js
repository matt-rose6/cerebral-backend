var express = require('express')
var router = express.Router()

const entryController = require("../controllers/entryController")

router.get('/getEntries', entryController.getEntryList);
router.get('/getEntry/:id', entryController.getEntryById);
router.post('/addEntry', entryController.addEntry);
router.put('/updateEntry/:id', entryController.updateEntry);
router.delete('/deleteEntry/:id', entryController.deleteEntry);

module.exports = router;