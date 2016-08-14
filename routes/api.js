// db_api.js

var express = require('express')
var router = express.Router()
var query = require('../manager/query')

// api to get data from db
router.get('/polls', query.getPolls)

module.exports = router
