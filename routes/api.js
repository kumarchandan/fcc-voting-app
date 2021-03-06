// api.js - database queries api

var express = require('express')
var router = express.Router()
//
var query = require('../manager/query')
var update = require('../manager/update')
var check = require('../manager/check')

// GET
router.get('/polls', query.getPolls)
router.get('/mypolls', query.getMyPolls)
router.get('/poll', query.getPoll)

// POST
router.post('/create', update.createPoll)
router.post('/vote', update.vote)
router.post('/customvote', update.customVote)
router.post('/remove', update.removePoll)

// CHECK
router.get('/auth', check.isAuthenticated)

module.exports = router
