
var express = require('express')
var router = express.Router()
const users = require("./users.js")
const entries = require("./entries.js")
const emotions = require("./emotions.js")

router.use('/users', users)
router.use('/entries', entries)
router.use('/emotions', emotions)

module.exports = router;

