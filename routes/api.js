// api.js - database queries api

var express = require('express')
var router = express.Router()
var query = require('../manager/query')

// db query api
router.get('/polls', query.getPolls)

module.exports = router
