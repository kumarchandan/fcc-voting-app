// api.js - database queries api

var express = require('express')
var router = express.Router()
var query = require('../manager/query')
var checkAuth = require('../manager/checkAuth')

// GET
router.get('/polls', query.getPolls)
router.get('/mypolls', query.getMyPolls)

// POST
router.post('/create', query.createPoll)
router.post('/vote', query.vote)

// CHECK
router.get('/auth', checkAuth.isAuthenticated)

module.exports = router
