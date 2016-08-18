// api.js - database queries api

var express = require('express')
var router = express.Router()
var query = require('../manager/query')
var checkAuth = require('../manager/checkAuth')

// db query api
router.get('/polls', query.getPolls)

// check auth
router.get('/auth', checkAuth.isAuthenticated)

module.exports = router
